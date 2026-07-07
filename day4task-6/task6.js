


function createREpoCard(name, description, language, starCount){
    let repoCard = document.createElement("div");
    let nameElement = document.createElement("span");
    let descriptionElement = document.createElement("span");
    let bottomElement = document.createElement("div");
    let languageElement = document.createElement("span");
    let startCountElement = document.createElement("span");
    nameElement.textContent = name;
    descriptionElement.textContent = description;
    languageElement.textContent = language;
    startCountElement.textContent = starCount;
    bottomElement.appendChild(languageElement);
    bottomElement.appendChild(starCountElement);
    bottomElement.classList.add("bottom");
    repoCard.appendChild(nameElement);
    repoCard.appendChild(descriptionElement);
    repoCard.appendChild(bottomElement);
    repoCard.classList.add("repoCard");

  return repoCard;
}

let currentController = null;

async function  fetchData(url) {
    try {
    const response = await fetch(url, { signal: currentController.signal });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("user not found");
      }
      if (response.status === 403 || response.status === 429) {
        throw new Error("rate limit exceeded");
      }
      throw new Error("failed to fetch");
    }
    const responseJson = response.json();

    return responseJson;
  } catch (error) {
    return Promise.reject(error);
  }
}

const avatarImg = document.querySelector(".avathar img");
const nameElement = document.querySelector(".name");
const bioElement = document.querySelector(".bio");
const locationElement = document.querySelector("location")
const followersElement = document.querySelector(".follower");
const followingElement = document.querySelector(".following");
const searchButton = document.querySelector(".search-bar button");
const repoContainer = document.querySelector(".repoContainer")

function removeRepos(){
    const repos = repoContainer.querySelectorAll(".repoCard");
    if(repos === null) return;
    repos.forEach((repo) => {
        repo.remove();
    });
}

searchButton.addEventListener("click",(event) => {
    try{
        if(currentController){
            currentController.abort();
            console.log("aborted", url);
        }
        currentController = new AbortController();
    }catch(error){
        console.log(error);
    }
    let searchText = event.target.previousElementSibling.value;
    const url = `https://api.github.com/users/${searchText}`;
    fetchData(url).then(
        (response) => {
            avatarImg.src = response.avatar_url;
            nameElement.textContent = response.name;
            if(response.bio === null){
                bioElement.textContent = "Bio:Empty";
            }else bioElement.textContent = response.bio;
            if(response.location === null){
                locationElement.textContent = "location:Empty";
            }else locationElement.textContent = response.location;
            followersElement.textContent = response.followers + " followers";
            followingElement.textContent = response.following + " following";
        },
        (error) => {
            alert(error);
        },
    );
    const repoUrl = `https://api.github.com/users/${searchText}/repos`;
    fetchData(repoUrl).then(
        (response) => {
            const sortedRepos = response.sort(
                (a,b) => b.stargazers_count - a.stargazers_count,
            );
            removeRepos();
            for(let i = 0; i< 6; i++){
                if(sortedRepos[i] === undefined)break;
                let element = createRepositoryCard(
                    sortedRepos[i].name,
                    sortedRepos[i].description,
                    sortedRepos[i].language,
                    sortedRepos[i].stargazers_count,
                );
                repoContainer.appendChild(element);
            }
        },
        (error) => {
            alert(error);
        },
    );
    currentController = null;
});
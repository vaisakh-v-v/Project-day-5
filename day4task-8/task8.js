
// Make the services page live search URL-state aware: update query string with
// history.pushState
// 421. On page load, read URL params, pre-fill controls, and apply filters to content
// 422. Listen to popstate - back/forward restore previous search state
const servicesContainer = document.getElementById("cardcontainer");
const serviceCard = servicesContainer.querySelectorAll(".card");
const searchInput = document.getElementById("searchInput");

const urlParams = new URLSearchParams(window.location.search);
const initialQuery = urlParams.get('q') || '';
searchInput.value = initialQuery;


function performHighlight(searchText){
    const regex = new RegExp(`(${searchText})`, "gi");
    serviceCard.forEach(card => {
        const originalText = card.textContent;
        card.innerHTML =
        originalText.replace(regex,
        `<mark class="highlight">$1</mark>`);
    });

}


function filterServices(querry){
    serviceCard.forEach(card =>{
        const text = card.textContent.toLowerCase();
        if(text.includes(querry)){
            card.style.display = "block";
            performHighlight(querry);
        }
        else{
            card.style.display = "none";
            const error = document.createElement("p")
            error.textContent = "Error: Results not found";
            searchInput.appendChild(error);
        }
    });
}


let debounceTimer;

searchInput.addEventListener("keyup" , (event) =>{
    clearTimeout(debounceTimer);
    debounceTimer= setTimeout(() =>{
        const searchQuerry = event.target.value.toLowerCase()
        const newUrl = new URL(window.location)
        if(searchQuerry){
            newUrl.searchParams.set('q',searchQuerry);
        }else{
            newUrl.searchParams.delete('q');
        }
        window.history.pushState({}, '',newUrl);
        filterServices(searchQuerry)
    },300)
})

window.addEventListener("popstate",() => {
    const poppedParams = new URLSearchParams(window.location.search);
    const poppedQuery = poppedParams.get('q') || '';
    filterServices(poppedQuery);
    searchInput.value = poppedQuery

});





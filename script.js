// Search input above the services grid. Debounce keyup handler by 300ms using
// setTimeout/clearTimeout.
// 346. Filter visible service cards so only those matching the search term show - hide others with
// display: none
// 347. Highlight matching text inside each card with a span.highlight
// 348. Show 'No results found' when nothing matches. Show a clear (×) button when input has
// content. 

const servicesContainer = document.getElementById("cardcontainer");
const serviceCard = servicesContainer.querySelectorAll(".card");
const searchInput = document.getElementById("searchInput");


function filterServices(querry){
    serviceCard.forEach(card =>{
        const text = card.textContent.toLowerCase();
        if(text.includes(querry)){
            card.style.display = "block";


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
        filterServices(searchQuerry)
    },300)
})


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


const API_URL = 'https://jsonplaceholder.typicode.com/posts';
        const grid = document.getElementById('services-grid');
        const searchInput2 = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const noResultsMsg = document.getElementById('no-results');
        
        let allServices = [];
        
        const categories = ['development', 'design', 'marketing', 'consulting'];

        async function fetchServices() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                
                allServices = data.slice(0, 20).map((post, index) => ({
                    ...post,
                    category: categories[index % categories.length]
                }));
                
                displayServices(allServices);
            } catch (error) {
                console.error('Error fetching services:', error);
                grid.innerHTML = '<p>Failed to load services. Please try again later.</p>';
            }
        }

        function displayServices(services) {
            grid.innerHTML = '';
            
            if (services.length === 0) {
                grid.appendChild(noResultsMsg);
                noResultsMsg.style.display = 'block';
                return;
            }

            services.forEach(service => {
                const card = document.createElement('div');
                card.className = 'service-card';
                card.innerHTML = `
                    <span class="category">${service.category}</span>
                    <h3>${service.title.split(' ').slice(0, 3).join(' ')}</h3>
                    <p>${service.body}</p>
                `;
                grid.appendChild(card);
            });
        }

        function filterServices() {
            const query = searchInput2.value.toLowerCase();
            const category = categoryFilter.value;

            const filtered = allServices.filter(service => {
                const matchesSearch = service.title.toLowerCase().includes(query) || service.body.toLowerCase().includes(query);
                const matchesCategory = category === 'all' || service.category === category;
                return matchesSearch && matchesCategory;
            });

            displayServices(filtered);
        }

        searchInput2.addEventListener('input', filterServices);
        categoryFilter.addEventListener('change', filterServices);

        fetchServices();
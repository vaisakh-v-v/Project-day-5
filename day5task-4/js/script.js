const API_URL = 'https://jsonplaceholder.typicode.com/users'; 
let teamMembers = [];

const teamGrid = document.getElementById('team-grid');
const filterContainer = document.getElementById('filter-container');

async function fetchTeam() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        teamMembers = data.map((user, index) => ({
            ...user,
            department: ['Engineering', 'Marketing', 'Design'][index % 3] 
        }));

        initTeamPage();
    } catch (error) {
        teamGrid.innerHTML = `<p class="error">Error loading team members: ${error.message}</p>`;
    }
}


function initTeamPage() {
    renderFilters();
    renderCards(teamMembers); 
    setupFilterListeners();
}

function renderFilters() {
    const departments = ['all', ...new Set(teamMembers.map(member => member.department))];
    
    filterContainer.innerHTML = departments.map(dept => `
        <button class="filter-btn ${dept === 'all' ? 'active' : ''}" data-dept="${dept}">
            ${dept.charAt(0).toUpperCase() + dept.slice(1)}
        </button>
    `).join('');
}

function renderCards(members) {
    if (members.length === 0) {
        teamGrid.innerHTML = '<p class="no-results">No team members found in this department.</p>';
        return;
    }

    teamGrid.innerHTML = members.map(member => `
        <div class="card" data-department="${member.department}">
            <div class="avatar">${member.name.charAt(0)}</div>
            <h3>${member.name}</h3>
            <p class="role">${member.company?.bs || 'Team Member'}</p>
            <span class="badge">${member.department}</span>
            <p class="email">${member.email}</p>
        </div>
    `).join('');
}

function setupFilterListeners() {
    filterContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const selectedDept = e.target.getAttribute('data-dept');
        if (selectedDept === 'all') {
            renderCards(teamMembers);
        } else {
            const filtered = teamMembers.filter(member => member.department === selectedDept);
            renderCards(filtered);
        }
    });
}

fetchTeam();
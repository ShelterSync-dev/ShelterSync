/* ============================================
   SHELTERS PAGE - SHELTER FILTERING & DISPLAY
   ============================================ */

import { getSheltersByCityFromFirebase } from './firebase-config.js';

let currentShelterCity = null;
let currentShelters = [];

document.addEventListener('DOMContentLoaded', function() {
    initSheltersPage();
    checkShelterURLParams();
});

function initSheltersPage() {
    const citySelect = document.getElementById('shelterCitySelect');
    const resetBtn = document.getElementById('resetShelterFilters');

    if (citySelect) {
        citySelect.addEventListener('change', function() {
            handleShelterCitySelection(this.value);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            citySelect.value = '';
            handleShelterCitySelection('');
        });
    }

    initializeShelterModal();
}

function checkShelterURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');
    
    if (city) {
        const citySelect = document.getElementById('shelterCitySelect');
        if (citySelect) {
            citySelect.value = city;
            handleShelterCitySelection(city);
        }
    }
}

function handleShelterCitySelection(city) {
    if (!city) {
        document.getElementById('sheltersContainer').style.display = 'none';
        document.getElementById('shelterCityNotSelected').style.display = 'block';
        document.getElementById('noSheltersMessage').style.display = 'none';
        document.getElementById('resetShelterFilters').style.display = 'none';
        currentShelters = [];
        currentShelterCity = null;
        return;
    }

    currentShelterCity = city;
    window.history.replaceState({}, '', `shelters.html?city=${city}`);

    document.getElementById('resetShelterFilters').style.display = 'inline-block';

    // Listen for live updates from Firebase for shelters in this city
    getSheltersByCityFromFirebase(city, (shelters) => {
        console.log("🔥 Shelters received from Firebase:", shelters);
        currentShelters = shelters;
        displayShelters();
    });
}

function displayShelters() {
    const shelters = currentShelters;
    const container = document.getElementById('sheltersContainer');
    const noSheltersMessage = document.getElementById('noSheltersMessage');
    const cityPrompt = document.getElementById('shelterCityNotSelected');

    if (!currentShelterCity) {
        container.style.display = 'none';
        noSheltersMessage.style.display = 'none';
        cityPrompt.style.display = 'block';
        return;
    }

    if (shelters.length === 0) {
        container.style.display = 'none';
        noSheltersMessage.style.display = 'block';
        cityPrompt.style.display = 'none';
        return;
    }

    cityPrompt.style.display = 'none';
    noSheltersMessage.style.display = 'none';
    container.style.display = 'grid';

    container.innerHTML = shelters.map(shelter => `
        <div class="shelter-card">
            <div class="card-image">
                ${shelter.image ? `<img src="${shelter.image}" alt="${shelter.name}">` : '🏢'}
            </div>
            <div class="card-content">
                <h3>${shelter.name}</h3>
                <p class="card-meta">${shelter.city}</p>
                <div class="card-meta">
                    <span class="card-meta-item">🐕 ${shelter.dogsAvailable} Dogs</span>
                </div>
                <p class="card-description">${shelter.description}</p>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button class="card-button" onclick="viewShelterDetailsModal('${shelter.firebaseId}')" style="flex: 1;">View Details</button>
                    <a href="shelter-profile.html?id=${shelter.firebaseId}" class="card-button" style="flex: 1; text-align: center; display: flex; align-items: center; justify-content: center;">Full Profile</a>
                </div>
            </div>
        </div>
    `).join('');
}

function viewShelterDetailsModal(firebaseId) {
    const shelter = currentShelters.find(s => s.firebaseId === firebaseId);
    if (!shelter) {
        console.error('Shelter not found:', firebaseId);
        return;
    }

    const modal = document.getElementById('shelterModal');
    const modalBody = document.getElementById('shelterModalBody');

    modalBody.innerHTML = `
        <div style="text-align: center;">
            <div style="margin-bottom: 1rem;">
                ${shelter.image ? `<img src="${shelter.image}" alt="${shelter.name}" style="max-width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">` : '<div style="font-size: 5rem;">🏢</div>'}
            </div>
            <h2>${shelter.name}</h2>
            <p style="color: #666; font-size: 1.1rem; margin-bottom: 1.5rem;">📍 ${shelter.city}</p>
            
            <div style="text-align: left; background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 1rem; color: #333;">About</h4>
                <p style="color: #555; line-height: 1.6; margin-bottom: 1rem;">${shelter.fullDescription || shelter.description}</p>
                
                <h4 style="margin-bottom: 1rem; color: #333; margin-top: 1.5rem;">Contact Information</h4>
                <p style="color: #555; margin-bottom: 0.5rem;">📧 <strong>Email:</strong> ${shelter.email || 'N/A'}</p>
                <p style="color: #555; margin-bottom: 0.5rem;">📱 <strong>Phone:</strong> ${shelter.phone || 'N/A'}</p>
                <p style="color: #555; margin-bottom: 0.5rem;">📍 <strong>Address:</strong> ${shelter.address || 'N/A'}</p>
                <p style="color: #555; margin-bottom: 0.5rem;">🌐 <strong>Website:</strong> ${shelter.website ? `<a href="https://${shelter.website}" target="_blank">${shelter.website}</a>` : 'N/A'}</p>
                
                <h4 style="margin-bottom: 1rem; color: #333; margin-top: 1.5rem;">Available Dogs</h4>
                <p style="color: #FF914D; font-size: 1.5rem; font-weight: bold;">${shelter.dogsAvailable || 0} Dogs Available for Adoption</p>
            </div>
            
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="visitShelter('${shelter.name}')" style="flex: 1;">Visit Shelter</button>
                <a href="shelter-profile.html?id=${shelter.firebaseId}" class="btn btn-secondary" style="flex: 1; text-align: center; display: flex; align-items: center; justify-content: center;">Full Profile</a>
                <button class="btn btn-secondary" onclick="viewShelterDogsModal('${shelter.city}')" style="flex: 1;">Browse Dogs</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function visitShelter(shelterName) {
    alert(`Thank you for your interest in ${shelterName}! In a real application, this would provide contact methods or directions.`);
}

function viewShelterDogsModal(city) {
    // Close current modal and redirect to adopt page
    const modal = document.getElementById('shelterModal');
    modal.classList.remove('active');
    window.location.href = `adopt.html?city=${city}`;
}

function initializeShelterModal() {
    const modal = document.getElementById('shelterModal');
    const closeBtn = modal?.querySelector('.modal-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

// Make functions global
window.viewShelterDetailsModal = viewShelterDetailsModal;
window.visitShelter = visitShelter;
window.viewShelterDogsModal = viewShelterDogsModal;
/* ============================================
   ADOPT PAGE - DOG FILTERING & DISPLAY (Firebase + Forms)
   ============================================ */

import { 
    getDogsByCityFromFirebase,
    submitAdoptionFormToFirebase
} from './firebase-config.js';

let currentCity = null;
let currentFilters = {
    breed: '',
    gender: '',
    age: ''
};

let allCityDogs = [];
let selectedDogForAdoption = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Adopt page loaded');
    initAdoptPage();
    checkURLParams();
});

function initAdoptPage() {
    const citySelect = document.getElementById('citySelect');
    const breedSelect = document.getElementById('breedSelect');
    const genderSelect = document.getElementById('genderSelect');
    const ageSelect = document.getElementById('ageSelect');
    const resetBtn = document.getElementById('resetFilters');

    if (citySelect) {
        citySelect.addEventListener('change', function() {
            console.log('🏙️ City changed to:', this.value);
            handleCitySelection(this.value);
        });
    }

    if (breedSelect) {
        breedSelect.addEventListener('change', function() {
            currentFilters.breed = this.value;
            displayDogs();
        });
    }

    if (genderSelect) {
        genderSelect.addEventListener('change', function() {
            currentFilters.gender = this.value;
            displayDogs();
        });
    }

    if (ageSelect) {
        ageSelect.addEventListener('change', function() {
            currentFilters.age = this.value;
            displayDogs();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetAllFilters();
        });
    }

    initializeModals();
}

function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');
    
    if (city) {
        const citySelect = document.getElementById('citySelect');
        if (citySelect) {
            citySelect.value = city;
            handleCitySelection(city);
        }
    }
}

function handleCitySelection(city) {
    console.log('📍 handleCitySelection called with city:', city);
    
    if (!city) {
        console.log('❌ No city selected');
        document.getElementById('dogsContainer').style.display = 'none';
        document.getElementById('cityNotSelected').style.display = 'block';
        document.getElementById('noDogsMessage').style.display = 'none';
        document.getElementById('breedFilterGroup').style.display = 'none';
        document.getElementById('genderFilterGroup').style.display = 'none';
        document.getElementById('ageFilterGroup').style.display = 'none';
        document.getElementById('resetFilters').style.display = 'none';
        return;
    }

    currentCity = city;
    currentFilters = { breed: '', gender: '', age: '' };

    document.getElementById('breedSelect').value = '';
    document.getElementById('genderSelect').value = '';
    document.getElementById('ageSelect').value = '';

    window.history.replaceState({}, '', `adopt.html?city=${city}`);

    document.getElementById('breedFilterGroup').style.display = 'block';
    document.getElementById('genderFilterGroup').style.display = 'block';
    document.getElementById('ageFilterGroup').style.display = 'block';
    document.getElementById('resetFilters').style.display = 'block';

    // Load dogs from Firebase
    console.log('🔄 Fetching dogs for city:', city);
    getDogsByCityFromFirebase(city, (dogs) => {
        console.log('✅ Dogs fetched:', dogs);
        console.log('🐕 Total dogs found:', dogs.length);
        allCityDogs = dogs;
        populateBreeds(dogs);
        displayDogs();
    });
}

function populateBreeds(dogs) {
    const breeds = [...new Set(dogs.map(dog => dog.breed))];
    const breedSelect = document.getElementById('breedSelect');
    
    const options = ['<option value="">-- All Breeds --</option>'];
    
    breeds.forEach(breed => {
        options.push(`<option value="${breed}">${breed}</option>`);
    });

    breedSelect.innerHTML = options.join('');
}

function displayDogs() {
    console.log('📊 displayDogs called');
    console.log('🐕 All City Dogs:', allCityDogs);
    console.log('🔍 Current Filters:', currentFilters);
    
    if (!currentCity || allCityDogs.length === 0) {
        console.log('❌ No city selected or no dogs available');
        return;
    }

    let dogs = [...allCityDogs];

    if (currentFilters.breed) {
        dogs = dogs.filter(dog => dog.breed === currentFilters.breed);
        console.log('🔹 After breed filter:', dogs.length);
    }

    if (currentFilters.gender) {
        dogs = dogs.filter(dog => dog.gender === currentFilters.gender);
        console.log('🔹 After gender filter:', dogs.length);
    }

    if (currentFilters.age) {
        dogs = dogs.filter(dog => matchesAgeGroup(dog.age, currentFilters.age));
        console.log('🔹 After age filter:', dogs.length);
    }

    const container = document.getElementById('dogsContainer');
    const noDogsMessage = document.getElementById('noDogsMessage');
    const cityPrompt = document.getElementById('cityNotSelected');

    if (dogs.length === 0) {
        console.log('⚠️ No dogs match filters');
        container.style.display = 'none';
        noDogsMessage.style.display = 'block';
        cityPrompt.style.display = 'none';
        return;
    }

    console.log('✅ Displaying', dogs.length, 'dogs');
    
    cityPrompt.style.display = 'none';
    noDogsMessage.style.display = 'none';
    container.style.display = 'grid';

    container.innerHTML = dogs.map(dog => `
        <div class="dog-card">
            <div class="card-image">
                ${dog.image ? `<img src="${dog.image}" alt="${dog.name}">` : '🐕'}
            </div>
            <div class="card-content">
                <h3>${dog.name}</h3>
                <div class="card-meta">
                    <span class="card-meta-item">${dog.age}</span>
                    <span class="card-meta-item">${dog.gender}</span>
                </div>
                <p class="card-meta">${dog.breed}</p>
                <p class="card-description">${dog.description}</p>
                <button class="card-button" onclick="viewDogDetailsModal('${dog.firebaseId}')">View Profile</button>
            </div>
        </div>
    `).join('');
}

function matchesAgeGroup(age, ageGroup) {
    if (ageGroup === 'Puppy') {
        return age.includes('1 year') || (parseInt(age) < 1);
    } else if (ageGroup === 'Young') {
        return age.includes('1') || age.includes('2') || age.includes('3');
    } else if (ageGroup === 'Adult') {
        return parseInt(age) >= 3;
    }
    return true;
}

function viewDogDetailsModal(dogId) {
    console.log('🔍 Viewing dog details for ID:', dogId);
    
    const dog = allCityDogs.find(d => d.firebaseId === dogId);
    if (!dog) {
        console.error('❌ Dog not found with ID:', dogId);
        return;
    }

    const modal = document.getElementById('dogModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div style="text-align: center;">
            <div style="margin-bottom: 1.5rem;">
                ${dog.image ? `<img src="${dog.image}" alt="${dog.name}" style="max-width: 100%; height: 300px; object-fit: cover; border-radius: 12px;">` : '<div style="font-size: 5rem;">🐕</div>'}
            </div>
            <h2>${dog.name}</h2>
            <div class="card-meta" style="margin-bottom: 1rem; justify-content: center;">
                <span class="card-meta-item">${dog.age}</span>
                <span class="card-meta-item">${dog.gender}</span>
                <span class="card-meta-item">${dog.breed}</span>
            </div>
            <p style="color: #666; font-size: 1.1rem; margin-bottom: 1rem;">📍 ${dog.city}</p>
            <p style="color: #555; line-height: 1.6; margin-bottom: 1.5rem;">${dog.fullDescription || dog.description}</p>
            
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: left;">
                <h4 style="margin-bottom: 0.5rem;">Health Status:</h4>
                <p style="margin: 0.3rem 0; color: #555;">
                    ${dog.vaccinated ? '✅ Vaccinated' : '❌ Not Vaccinated'}
                </p>
                <p style="margin: 0.3rem 0; color: #555;">
                    ${dog.neutered ? '✅ Neutered/Spayed' : '❌ Not Neutered/Spayed'}
                </p>
                <p style="margin: 0.3rem 0; color: #555;">
                    ${dog.microchipped ? '✅ Microchipped' : '❌ Not Microchipped'}
                </p>
            </div>
            
            <div>
                <button class="btn btn-primary" onclick="openAdoptionForm('${dog.firebaseId}', '${dog.name}', '${dog.shelterName}')" style="margin-right: 0.5rem; margin-bottom: 0.5rem;">
                    Start Adoption Process
                </button>
                <a href="dog-profile.html?id=${dog.firebaseId}" class="btn btn-secondary">View Full Profile</a>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

// ============================================
// ADOPTION FORM FUNCTIONS
// ============================================

function openAdoptionForm(dogId, dogName, shelterName) {
    console.log('📋 Opening adoption form for:', dogName);
    
    selectedDogForAdoption = { id: dogId, name: dogName, shelter: shelterName };
    
    // Pre-fill hidden fields
    document.getElementById('selectedDogId').value = dogId;
    document.getElementById('selectedDogName').value = dogName;
    document.getElementById('selectedShelter').value = shelterName;

    // Close dog details modal
    const dogModal = document.getElementById('dogModal');
    if (dogModal) dogModal.classList.remove('active');

    // Open adoption form modal
    const formModal = document.getElementById('adoptionFormModal');
    if (formModal) formModal.classList.add('active');
}

async function handleAdoptionFormSubmit(e) {
    e.preventDefault();

    const formData = {
        adopterName: document.getElementById('adopterName').value,
        adopterEmail: document.getElementById('adopterEmail').value,
        adopterPhone: document.getElementById('adopterPhone').value,
        adopterAddress: document.getElementById('adopterAddress').value,
        adoptionReason: document.getElementById('adoptionReason').value,
        familyMembers: parseInt(document.getElementById('familyMembers').value),
        otherPets: document.getElementById('otherPets').value,
        experience: document.getElementById('experience').value,
        dogId: document.getElementById('selectedDogId').value,
        dogName: document.getElementById('selectedDogName').value,
        shelterName: document.getElementById('selectedShelter').value
    };

    try {
        console.log('📤 Submitting adoption form:', formData);
        await submitAdoptionFormToFirebase(formData);
        alert('✅ Your adoption application has been submitted! The shelter will contact you soon.');
        
        // Reset form
        document.getElementById('adoptionForm').reset();
        
        // Close modal
        const modal = document.getElementById('adoptionFormModal');
        if (modal) modal.classList.remove('active');
    } catch (error) {
        alert('❌ Error submitting form: ' + error.message);
        console.error('Form submission error:', error);
    }
}

function resetAllFilters() {
    document.getElementById('breedSelect').value = '';
    document.getElementById('genderSelect').value = '';
    document.getElementById('ageSelect').value = '';
    currentFilters = { breed: '', gender: '', age: '' };
    displayDogs();
}

function initializeModals() {
    // Dog details modal
    const dogModal = document.getElementById('dogModal');
    const dogCloseBtn = dogModal?.querySelector('.modal-close');

    if (dogCloseBtn) {
        dogCloseBtn.addEventListener('click', function() {
            dogModal.classList.remove('active');
        });
    }

    if (dogModal) {
        dogModal.addEventListener('click', function(e) {
            if (e.target === dogModal) {
                dogModal.classList.remove('active');
            }
        });
    }

    // Adoption form modal
    const formModal = document.getElementById('adoptionFormModal');
    const formCloseBtn = formModal?.querySelector('.modal-close');

    if (formCloseBtn) {
        formCloseBtn.addEventListener('click', function() {
            formModal.classList.remove('active');
        });
    }

    if (formModal) {
        formModal.addEventListener('click', function(e) {
            if (e.target === formModal) {
                formModal.classList.remove('active');
            }
        });
    }
}

// ============================================
// GLOBAL FUNCTIONS
// ============================================

window.viewDogDetailsModal = viewDogDetailsModal;
window.openAdoptionForm = openAdoptionForm;
window.handleAdoptionFormSubmit = handleAdoptionFormSubmit;
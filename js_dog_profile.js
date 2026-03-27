import { 
    getDogFromFirebase,
    submitAdoptionFormToFirebase
} from './firebase-config.js';

let currentDog = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Dog profile page loaded');
    const urlParams = new URLSearchParams(window.location.search);
    const dogId = urlParams.get('id');
    
    if (dogId) {
        loadDogProfile(dogId);
    } else {
        showError();
    }
    
    initializeModal();
});

function loadDogProfile(dogId) {
    console.log('🔍 Loading dog profile for ID:', dogId);
    
    getDogFromFirebase(dogId, (dog) => {
        if (dog && dog.name) {
            console.log('✅ Dog loaded:', dog);
            currentDog = dog;
            displayDogProfile(dog);
        } else {
            console.error('❌ Dog not found');
            showError();
        }
    });
}

function displayDogProfile(dog) {
    // Hide loading, show content
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('profileContent').style.display = 'block';

    // Profile Image
    const imageEl = document.getElementById('dogImage');
    if (dog.image) {
        imageEl.src = dog.image;
    } else {
        imageEl.style.fontSize = '5rem';
        imageEl.textContent = '🐕';
    }

    // Basic Info
    document.getElementById('dogName').textContent = dog.name;
    document.getElementById('dogAge').textContent = `📅 ${dog.age || 'Unknown Age'}`;
    document.getElementById('dogGender').textContent = `⚧️ ${dog.gender || 'Unknown Gender'}`;
    document.getElementById('dogBreed').textContent = `🏷️ ${dog.breed || 'Unknown Breed'}`;
    document.getElementById('dogCity').textContent = dog.city || 'Unknown City';
    document.getElementById('dogShelter').textContent = dog.shelterName || 'Unknown Shelter';

    // Description
    document.getElementById('dogDescription').textContent = dog.fullDescription || dog.description || 'No description available';

    // Health Status
    document.getElementById('vaccinationStatus').innerHTML = dog.vaccinated 
        ? '✅ <strong>Vaccinated</strong>' 
        : '❌ <strong>Not Vaccinated</strong>';
    
    document.getElementById('neuteredStatus').innerHTML = dog.neutered 
        ? '✅ <strong>Neutered/Spayed</strong>' 
        : '❌ <strong>Not Neutered/Spayed</strong>';
    
    document.getElementById('microchipStatus').innerHTML = dog.microchipped 
        ? '✅ <strong>Microchipped</strong>' 
        : '❌ <strong>Not Microchipped</strong>';

    // Additional Info
    document.getElementById('dogSize').textContent = dog.size || 'Not specified';
    document.getElementById('dogColor').textContent = dog.color || 'Not specified';
    document.getElementById('dogWeight').textContent = dog.weight ? `${dog.weight} kg` : 'Not specified';
    document.getElementById('adoptionFee').textContent = dog.adoptionFee ? `₹${dog.adoptionFee}` : 'Contact shelter';

    // Personality Traits (You can customize these based on your data)
    document.getElementById('trait1').textContent = dog.trait1 || 'Playful';
    document.getElementById('trait2').textContent = dog.trait2 || 'Family Friendly';
    document.getElementById('trait3').textContent = dog.trait3 || 'Good with Dogs';
    document.getElementById('trait4').textContent = dog.trait4 || 'Good with Cats';

    console.log('✅ Dog profile displayed');
}

function openAdoptionForm() {
    if (!currentDog) return;
    
    document.getElementById('selectedDogId').value = currentDog.firebaseId;
    document.getElementById('selectedDogName').value = currentDog.name;
    document.getElementById('selectedShelter').value = currentDog.shelterName;

    const modal = document.getElementById('adoptionFormModal');
    modal.classList.add('active');
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
        
        document.getElementById('adoptionForm').reset();
        const modal = document.getElementById('adoptionFormModal');
        modal.classList.remove('active');
    } catch (error) {
        alert('❌ Error submitting form: ' + error.message);
        console.error('Form submission error:', error);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showError() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('profileContent').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
}

function initializeModal() {
    const modal = document.getElementById('adoptionFormModal');
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
window.openAdoptionForm = openAdoptionForm;
window.handleAdoptionFormSubmit = handleAdoptionFormSubmit;
window.scrollToSection = scrollToSection;
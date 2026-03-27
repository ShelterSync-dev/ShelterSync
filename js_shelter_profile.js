import { 
    ref,
    getDatabase,
    onValue,
    query,
    orderByChild,
    equalTo
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';

// Firebase Config (same as your firebase-config.js)
const firebaseConfig = {
    apiKey: "AIzaSyAcQ2B4SWOGlU_Mi08cS4Q7JaqjL5Ny-pw",
    authDomain: "sheltersync-94d6b.firebaseapp.com",
    projectId: "sheltersync-94d6b",
    storageBucket: "sheltersync-94d6b.firebasestorage.app",
    messagingSenderId: "305700975416",
    appId: "1:305700975416:web:f0082f3ac7d0eaeb05c7cd",
    measurementId: "G-8X66S1XGWR",
    databaseURL:"https://sheltersync-94d6b-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let currentShelter = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Shelter profile page loaded');
    const urlParams = new URLSearchParams(window.location.search);
    const shelterId = urlParams.get('id');
    
    if (shelterId) {
        loadShelterProfile(shelterId);
    } else {
        showError();
    }
});

function loadShelterProfile(shelterId) {
    console.log('🔍 Loading shelter profile for ID:', shelterId);
    
    const shelterRef = ref(database, `shelters/${shelterId}`);
    onValue(shelterRef, (snapshot) => {
        const shelter = snapshot.val();
        if (shelter && shelter.name) {
            console.log('✅ Shelter loaded:', shelter);
            currentShelter = {
                firebaseId: shelterId,
                ...shelter
            };
            displayShelterProfile(currentShelter);
            loadShelterDogs(shelter.name);
        } else {
            console.error('❌ Shelter not found');
            showError();
        }
    }, (error) => {
        console.error('Error loading shelter:', error);
        showError();
    });
}

function displayShelterProfile(shelter) {
    // Hide loading, show content
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('profileContent').style.display = 'block';

    // Profile Image
    const imageEl = document.getElementById('shelterImage');
    if (shelter.image) {
        imageEl.src = shelter.image;
        imageEl.alt = shelter.name;
    } else {
        imageEl.style.fontSize = '5rem';
        imageEl.textContent = '🏢';
    }

    // Basic Info
    document.getElementById('shelterName').textContent = shelter.name;
    document.getElementById('shelterCity').textContent = shelter.city || 'Unknown City';
    document.getElementById('dogsAvailable').textContent = `🐕 ${shelter.dogsAvailable || 0}`;

    // Description
    document.getElementById('shelterDescription').textContent = 
        shelter.fullDescription || shelter.description || 'No description available';

    // Contact Information
    const emailEl = document.getElementById('shelterEmail');
    emailEl.href = `mailto:${shelter.email}`;
    emailEl.textContent = shelter.email || 'Not available';

    const phoneEl = document.getElementById('shelterPhone');
    phoneEl.href = `tel:${shelter.phone}`;
    phoneEl.textContent = shelter.phone || 'Not available';

    const websiteEl = document.getElementById('shelterWebsite');
    if (shelter.website) {
        websiteEl.href = `https://${shelter.website}`;
        websiteEl.textContent = shelter.website;
    } else {
        websiteEl.textContent = 'Not available';
        websiteEl.style.pointerEvents = 'none';
    }

    document.getElementById('shelterAddress').textContent = shelter.address || 'Not available';

    // Dogs Count
    document.getElementById('dogsCount').textContent = shelter.dogsAvailable || 0;

    console.log('✅ Shelter profile displayed');
}

function loadShelterDogs(shelterName) {
    console.log('🐕 Loading dogs for shelter:', shelterName);
    
    const dogsRef = ref(database, 'dogs');
    const q = query(dogsRef, orderByChild('shelterName'), equalTo(shelterName));
    
    onValue(q, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const dogsCount = Object.keys(data).length;
            console.log(`✅ Found ${dogsCount} dogs for this shelter`);
            document.getElementById('dogsCount').textContent = dogsCount;
        } else {
            document.getElementById('dogsCount').textContent = '0';
        }
    });
}

function showError() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('profileContent').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
}
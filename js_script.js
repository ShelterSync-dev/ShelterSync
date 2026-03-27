/* ============================================
   PAWADOPT - MAIN JAVASCRIPT
   Common functionality for all pages
   ============================================ */

// ============================================
// NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initFormHandlers();
    loadHomepageContent();
});

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ============================================
// HOMEPAGE - LOAD FEATURED CONTENT
// ============================================

function loadHomepageContent() {
    loadFeaturedDogs();
    loadCities();
}

function loadFeaturedDogs() {
    const container = document.getElementById('featuredDogsContainer');
    if (!container) return;

    const featuredDogs = getFeaturedDogs();
    
    container.innerHTML = featuredDogs.map(dog => `
        <div class="dog-card">
            <div class="card-image">${dog.image}</div>
            <div class="card-content">
                <h3>${dog.name}</h3>
                <div class="card-meta">
                    <span class="card-meta-item">${dog.age}</span>
                    <span class="card-meta-item">${dog.breed}</span>
                </div>
                <p class="card-description">${dog.city}</p>
                <button class="card-button" onclick="viewDogDetails(${dog.id})">View Profile</button>
            </div>
        </div>
    `).join('');
}

function loadCities() {
    const container = document.getElementById('citiesContainer');
    if (!container) return;

    const cities = getCitiesList();
    
    container.innerHTML = cities.map(city => `
        <div class="city-card" onclick="goToAdoptWithCity('${city}')">
            <h3>${city}</h3>
            <p>📍 Explore Dogs</p>
        </div>
    `).join('');
}

function goToAdoptWithCity(city) {
    window.location.href = `adopt.html?city=${city}`;
}

function viewDogDetails(id) {
    const dog = dogsData.find(d => d.id === id);
    if (!dog) return;

    const modal = document.getElementById('dogModal');
    if (!modal) {
        window.location.href = `adopt.html?city=${dog.city}`;
        return;
    }

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 5rem; margin-bottom: 1rem;">${dog.image}</div>
            <h2>${dog.name}</h2>
            <div class="card-meta" style="margin-bottom: 1rem;">
                <span class="card-meta-item">${dog.age}</span>
                <span class="card-meta-item">${dog.gender}</span>
                <span class="card-meta-item">${dog.breed}</span>
            </div>
            <p style="color: #666; font-size: 1.1rem; margin-bottom: 1.5rem;">${dog.city}</p>
            <p style="color: #555; line-height: 1.6; margin-bottom: 1.5rem;">${dog.fullDescription}</p>
            <button class="btn btn-primary" onclick="goToAdoptWithCity('${dog.city}')">View More Dogs</button>
        </div>
    `;

    modal.classList.add('active');

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
}

// ============================================
// DONATION PAGE
// ============================================

function handleDonation(method) {
    alert(`Thank you for choosing ${method}! In a real application, this would redirect to the payment gateway.`);
}

function showBankDetails() {
    const details = document.getElementById('bankDetails');
    if (details.style.display === 'none') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

function handleNewsletterSignup(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing with ${email}! Check your inbox for confirmation.`);
    e.target.reset();
}

// ============================================
// CONTACT FORM
// ============================================

function handleContactForm(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };
    
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon at ' + formData.email);
    e.target.reset();
}

// ============================================
// FORM HANDLERS
// ============================================

function initFormHandlers() {
    // Add any general form handlers here
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll animation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Debounce function for search/filter
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
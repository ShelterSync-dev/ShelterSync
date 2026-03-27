/* ============================================
   ABOUT PAGE - CONTACT FORM & FAQ
   ============================================ */

import { submitContactFormToFirebase } from './firebase-config.js';

console.log('✅ js_about.js loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOMContentLoaded fired');
    initializeFAQ();
    initializeContactForm();
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

function initializeContactForm() {
    console.log('🔍 Initializing contact form...');
    
    const contactForm = document.querySelector('form[id="contactFormElement"]');
    console.log('📋 Contact form found:', contactForm);
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            console.log('📧 Contact form submitted!');
            await handleContactFormSubmit(e);
        });
        console.log('✅ Contact form listener attached');
    } else {
        console.error('❌ Contact form not found');
    }
}

async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    console.log('📤 Preparing form data...');
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };
    
    console.log('📋 Form data:', formData);
    
    try {
        console.log('🔄 Calling submitContactFormToFirebase...');
        const result = await submitContactFormToFirebase(formData);
        console.log('✅ Success! Form ID:', result);
        alert('✅ Thank you for your message! We will get back to you soon at ' + formData.email);
        e.target.reset();
    } catch (error) {
        console.error('❌ Error submitting form:', error);
        alert('❌ Error sending message: ' + error.message);
    }
}

// ============================================
// FAQ ACCORDION
// ============================================

function initializeFAQ() {
    console.log('📖 Initializing FAQ...');
    
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found FAQ items:', faqItems.length);
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    if (faqItem) {
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Toggle current item
        faqItem.classList.toggle('active');
    }
}

// Make functions globally accessible
window.toggleFAQ = toggleFAQ;
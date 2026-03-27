// ============================================
// FIREBASE CONFIGURATION
// ============================================

// Import Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getDatabase, ref, onValue, push, remove, update } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js';

// Your Firebase Config (Get from Firebase Console)
// ⚠️ REPLACE THESE WITH YOUR OWN VALUES
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

// ============================================
// DATABASE HELPER FUNCTIONS
// ============================================

// GET ALL DOGS FROM FIREBASE
export function getAllDogsFromFirebase(callback) {
    const dogsRef = ref(database, 'dogs');
    onValue(dogsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const dogsArray = Object.entries(data).map(([key, value]) => ({
                firebaseId: key,
                ...value
            }));
            callback(dogsArray);
        } else {
            callback([]);
        }
    });
}

// GET SINGLE DOG BY ID
export function getDogFromFirebase(dogId, callback) {
    const dogRef = ref(database, `dogs/${dogId}`);
    onValue(dogRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            callback({
                firebaseId: dogId,
                ...data
            });
        }
    });
}

// GET DOGS BY CITY
export function getDogsByCityFromFirebase(city, callback) {
    console.log('🔍 getDogsByCityFromFirebase called with city:', city);
    
    const dogsRef = ref(database, 'dogs');
    onValue(dogsRef, (snapshot) => {
        console.log('📸 Snapshot received from Firebase');
        const data = snapshot.val();
        console.log('📦 Raw data from Firebase:', data);
        
        if (data) {
            const dogsArray = Object.entries(data)
                .map(([key, value]) => {
                    console.log(`🐕 Processing dog ${key}:`, value);
                    return {
                        firebaseId: key,
                        ...value
                    };
                })
                .filter(dog => {
                    const matches = dog.city === city;
                    console.log(`🔎 Dog "${dog.name}" city: "${dog.city}" === "${city}" ? ${matches}`);
                    return matches;
                });
            
            console.log('✅ Final dogs array for city:', dogsArray);
            callback(dogsArray);
        } else {
            console.log('❌ No data in Firebase at all');
            callback([]);
        }
    }, (error) => {
        console.error("❌ Error fetching dogs from Firebase:", error);
        callback([]);
    });
}

// ADD NEW DOG TO FIREBASE
export async function addDogToFirebase(dogData) {
    try {
        const dogsRef = ref(database, 'dogs');
        const newDogRef = await push(dogsRef, dogData);
        return newDogRef.key;
    } catch (error) {
        console.error('Error adding dog:', error);
        throw error;
    }
}

// UPDATE DOG IN FIREBASE
export async function updateDogInFirebase(dogId, dogData) {
    try {
        const dogRef = ref(database, `dogs/${dogId}`);
        await update(dogRef, dogData);
    } catch (error) {
        console.error('Error updating dog:', error);
        throw error;
    }
}

// DELETE DOG FROM FIREBASE
export async function deleteDogFromFirebase(dogId) {
    try {
        const dogRef = ref(database, `dogs/${dogId}`);
        await remove(dogRef);
    } catch (error) {
        console.error('Error deleting dog:', error);
        throw error;
    }
}

// GET ALL SHELTERS FROM FIREBASE
export function getAllSheltersFromFirebase(callback) {
    const sheltersRef = ref(database, 'shelters');
    onValue(sheltersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const sheltersArray = Object.entries(data).map(([key, value]) => ({
                firebaseId: key,
                ...value
            }));
            callback(sheltersArray);
        } else {
            callback([]);
        }
    });
}

// GET SHELTERS BY CITY FROM FIREBASE
export function getSheltersByCityFromFirebase(city, callback) {
    const sheltersRef = ref(database, 'shelters');
    onValue(sheltersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const sheltersArray = Object.entries(data)
                .map(([key, value]) => ({
                    firebaseId: key,
                    ...value
                }))
                .filter(shelter => shelter.city === city);
            callback(sheltersArray);
        } else {
            callback([]);
        }
    });
}

// UPLOAD IMAGE TO FIREBASE STORAGE
export async function uploadImageToFirebase(file) {
    try {
        const fileName = `dogs/${Date.now()}_${file.name}`;
        const fileRef = storageRef(storage, fileName);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

export { database, storage };

// ============================================
// FORMS - ADOPTION APPLICATIONS
// ============================================

// SUBMIT ADOPTION FORM
export async function submitAdoptionFormToFirebase(formData) {
    try {
        const formsRef = ref(database, 'adoptionForms');
        const newFormRef = await push(formsRef, {
            ...formData,
            submittedAt: new Date().toISOString(),
            status: 'pending'  // pending, approved, rejected
        });
        console.log("✅ Adoption form submitted with ID:", newFormRef.key);
        return newFormRef.key;
    } catch (error) {
        console.error('❌ Error submitting form:', error);
        throw error;
    }
}

// GET ALL ADOPTION FORMS (For Admin)
export function getAllAdoptionFormsFromFirebase(callback) {
    const formsRef = ref(database, 'adoptionForms');
    onValue(formsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const formsArray = Object.entries(data).map(([key, value]) => ({
                firebaseId: key,
                ...value
            }));
            callback(formsArray);
        } else {
            callback([]);
        }
    }, (error) => {
        console.error("Error fetching forms:", error);
        callback([]);
    });
}

// GET ADOPTION FORM BY ID
export function getAdoptionFormFromFirebase(formId, callback) {
    const formRef = ref(database, `adoptionForms/${formId}`);
    onValue(formRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            callback({
                firebaseId: formId,
                ...data
            });
        }
    });
}

// UPDATE ADOPTION FORM STATUS
export async function updateAdoptionFormStatus(formId, status) {
    try {
        const formRef = ref(database, `adoptionForms/${formId}`);
        await update(formRef, {
            status: status,
            updatedAt: new Date().toISOString()
        });
        console.log("✅ Form status updated to:", status);
    } catch (error) {
        console.error('❌ Error updating form:', error);
        throw error;
    }
}

// DELETE ADOPTION FORM
export async function deleteAdoptionFormFromFirebase(formId) {
    try {
        const formRef = ref(database, `adoptionForms/${formId}`);
        await remove(formRef);
        console.log("✅ Form deleted successfully");
    } catch (error) {
        console.error('❌ Error deleting form:', error);
        throw error;
    }
}

// ============================================
// CONTACT FORMS
// ============================================

// SUBMIT CONTACT FORM
export async function submitContactFormToFirebase(formData) {
    try {
        const contactRef = ref(database, 'contactForms');
        const newFormRef = await push(contactRef, {
            ...formData,
            submittedAt: new Date().toISOString(),
            read: false
        });
        console.log("✅ Contact form submitted with ID:", newFormRef.key);
        return newFormRef.key;
    } catch (error) {
        console.error('❌ Error submitting contact form:', error);
        throw error;
    }
}

// GET ALL CONTACT FORMS (For Admin)
export function getAllContactFormsFromFirebase(callback) {
    const formsRef = ref(database, 'contactForms');
    onValue(formsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const formsArray = Object.entries(data).map(([key, value]) => ({
                firebaseId: key,
                ...value
            }));
            callback(formsArray);
        } else {
            callback([]);
        }
    });
}

// MARK CONTACT FORM AS READ
export async function markContactFormAsRead(formId) {
    try {
        const formRef = ref(database, `contactForms/${formId}`);
        await update(formRef, { read: true });
    } catch (error) {
        console.error('❌ Error marking form as read:', error);
    }
}

// DELETE CONTACT FORM
export async function deleteContactFormFromFirebase(formId) {
    try {
        const formRef = ref(database, `contactForms/${formId}`);
        await remove(formRef);
        console.log("✅ Contact form deleted");
    } catch (error) {
        console.error('❌ Error deleting contact form:', error);
        throw error;
    }
}

// ============================================
// NEWSLETTER SUBSCRIPTIONS
// ============================================

// SUBSCRIBE TO NEWSLETTER
export async function subscribeToNewsletterFirebase(email) {
    try {
        const subscribersRef = ref(database, 'newsletter');
        const newSubRef = await push(subscribersRef, {
            email: email,
            subscribedAt: new Date().toISOString(),
            active: true
        });
        console.log("✅ Subscribed to newsletter:", newSubRef.key);
        return newSubRef.key;
    } catch (error) {
        console.error('❌ Error subscribing:', error);
        throw error;
    }
}

// GET ALL NEWSLETTER SUBSCRIBERS (For Admin)
export function getAllNewsletterSubscribersFromFirebase(callback) {
    const subscribersRef = ref(database, 'newsletter');
    onValue(subscribersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const subscribersArray = Object.entries(data).map(([key, value]) => ({
                firebaseId: key,
                ...value
            }));
            callback(subscribersArray);
        } else {
            callback([]);
        }
    });
}
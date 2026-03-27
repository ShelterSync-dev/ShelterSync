/* ============================================
   PAWADOPT - MOCK DATA
   All data stored in JavaScript objects
   ============================================ */

// Dogs Database
const dogsData = [
    {
        id: 1,
        name: "Bruno",
        age: "2 years",
        breed: "Indie",
        gender: "Male",
        city: "Ahmedabad",
        description: "Friendly and energetic street rescue dog. Loves to play fetch and enjoys the company of other dogs.",
        fullDescription: "Bruno is a 2-year-old indie dog rescued from the streets of Ahmedabad. He's incredibly friendly, loves to play fetch, and gets along great with other dogs and humans. Perfect for an active family!",
        image: "🐕"
    },
    {
        id: 2,
        name: "Bella",
        age: "1.5 years",
        breed: "Labrador Mix",
        gender: "Female",
        city: "Mumbai",
        description: "Sweet and gentle, Bella is perfect for families with kids. She loves cuddles and car rides.",
        fullDescription: "Bella is a beautiful Labrador mix who was rescued as a puppy. She's gentle, loving, and absolutely adores children. She knows basic commands and is house-trained.",
        image: "🐶"
    },
    {
        id: 3,
        name: "Max",
        age: "3 years",
        breed: "German Shepherd Mix",
        gender: "Male",
        city: "Delhi",
        description: "Loyal and protective, Max is looking for an experienced dog owner. He's very smart and well-trained.",
        fullDescription: "Max is a 3-year-old German Shepherd mix who's calm and loyal. He's house-trained and knows many commands. Ideal for someone who can give him regular exercise and training.",
        image: "🐕‍🦺"
    },
    {
        id: 4,
        name: "Daisy",
        age: "1 year",
        breed: "Indie",
        gender: "Female",
        city: "Bangalore",
        description: "Playful pup who's just learning to trust humans. Perfect for patient adopters willing to show her love.",
        fullDescription: "Daisy is a sweet 1-year-old indie girl who's learning to trust people after a rough start. She's playful, energetic, and responds well to positive reinforcement.",
        image: "🐕"
    },
    {
        id: 5,
        name: "Charlie",
        age: "4 years",
        breed: "Pug",
        gender: "Male",
        city: "Pune",
        description: "Small, affectionate pug who loves cuddles and short walks. Great for apartment living!",
        fullDescription: "Charlie is a 4-year-old pug with a huge personality in a small package. He's perfectly suited for apartment living, loves lap time, and is great with kids.",
        image: "🐕"
    },
    {
        id: 6,
        name: "Rocky",
        age: "2.5 years",
        breed: "Indie",
        gender: "Male",
        city: "Ahmedabad",
        description: "Strong and athletic indie boy. Needs an owner who can provide regular exercise and training.",
        fullDescription: "Rocky is a muscular, athletic indie who loves outdoor activities. He's smart, trainable, and needs an active owner who enjoys hiking or running.",
        image: "🐕"
    },
    {
        id: 7,
        name: "Lucy",
        age: "2 years",
        breed: "Indie",
        gender: "Female",
        city: "Mumbai",
        description: "Calm and friendly rescue dog. Great with families and other pets. House-trained!",
        fullDescription: "Lucy is a calm, friendly indie who was rescued from difficult circumstances. She's now thriving and looking for a permanent home where she can enjoy a peaceful life.",
        image: "🐶"
    },
    {
        id: 8,
        name: "Rusty",
        age: "1.8 years",
        breed: "Cocker Spaniel",
        gender: "Male",
        city: "Delhi",
        description: "Energetic and loving spaniel mix. Needs regular exercise but rewards you with tons of affection!",
        fullDescription: "Rusty is a beautiful Cocker Spaniel with endless energy and a heart full of love. He's perfect for active families and needs at least one hour of daily exercise.",
        image: "🐕"
    },
    {
        id: 9,
        name: "Molly",
        age: "5 years",
        breed: "Indie",
        gender: "Female",
        city: "Bangalore",
        description: "Senior girl looking for a quiet retirement home. Calm, affectionate, and low-maintenance.",
        fullDescription: "Molly is a 5-year-old senior dog who deserves a comfortable retirement home. She's calm, house-trained, and just wants to spend her golden years with loving people.",
        image: "🐕"
    },
    {
        id: 10,
        name: "Buddy",
        age: "1 year",
        breed: "Indie",
        gender: "Male",
        city: "Pune",
        description: "Young and curious, Buddy is learning about the world. Full of puppy energy and love!",
        fullDescription: "Buddy is a 1-year-old indie who's finally got a chance at a good life. He's playful, curious, and incredibly grateful for kindness.",
        image: "🐕"
    },
    {
        id: 11,
        name: "Sophie",
        age: "3 years",
        breed: "Indie",
        gender: "Female",
        city: "Ahmedabad",
        description: "Smart and obedient rescue dog. She knows commands and is very food-motivated for training!",
        fullDescription: "Sophie is an intelligent indie who's learned quickly in rescue. She's obedient, food-motivated, and eager to please her new family.",
        image: "🐶"
    },
    {
        id: 12,
        name: "Apollo",
        age: "2 years",
        breed: "Great Dane",
        gender: "Male",
        city: "Mumbai",
        description: "Gentle giant who's surprisingly calm. Perfect for families who have space for a big boy!",
        fullDescription: "Apollo is a Great Dane mix who proves that bigger dogs can be calm and gentle. He's perfect for families with enough space and love to give.",
        image: "🐕‍🦺"
    }
];

// Shelters Database
const sheltersData = [
    {
        id: 1,
        name: "Happy Tails Rescue",
        city: "Ahmedabad",
        dogsAvailable: 14,
        email: "info@happytails.in",
        phone: "+91 XXXXXXXXXX",
        description: "Local rescue focusing on indie dogs and mixed breeds. We provide medical care, training, and shelter.",
        fullDescription: "Happy Tails Rescue has been operating since 2015 in Ahmedabad. We rescue street dogs, provide medical care, vaccinations, and find them loving homes. Our team works 24/7 for animal welfare.",
        address: "123 Dogs Lane, Ahmedabad",
        website: "www.happytails.in"
    },
    {
        id: 2,
        name: "Mumbai Dog Sanctuary",
        city: "Mumbai",
        dogsAvailable: 28,
        email: "info@mumbaidogsanctuary.in",
        phone: "+91 XXXXXXXXXX",
        description: "One of India's largest dog sanctuaries. We specialize in rescue, rehabilitation, and adoption.",
        fullDescription: "Mumbai Dog Sanctuary is one of the largest animal rescue centers in Mumbai with over 25 years of experience. We handle everything from street rescues to rehabilitation and adoption.",
        address: "456 Pet Paradise, Mumbai",
        website: "www.mumbaidogsanctuary.in"
    },
    {
        id: 3,
        name: "Delhi Dog Care",
        city: "Delhi",
        dogsAvailable: 18,
        email: "info@delhidogcare.in",
        phone: "+91 XXXXXXXXXX",
        description: "Professional dog care and rescue center. We offer training, medical care, and adoption services.",
        fullDescription: "Delhi Dog Care is a professional organization dedicated to dog rescue, rehabilitation, and adoption. We also provide boarding and training services.",
        address: "789 Animal Road, Delhi",
        website: "www.delhidogcare.in"
    },
    {
        id: 4,
        name: "Bangalore Paws",
        city: "Bangalore",
        dogsAvailable: 22,
        email: "info@bangalorpaws.in",
        phone: "+91 XXXXXXXXXX",
        description: "Tech-savvy rescue team working to find forever homes for rescue dogs. Very active on social media!",
        fullDescription: "Bangalore Paws combines technology with animal rescue. We use social media and online platforms extensively to find adoptions and spread awareness.",
        address: "101 Tech Park, Bangalore",
        website: "www.bangalorpaws.in"
    },
    {
        id: 5,
        name: "Pune Dog Lovers",
        city: "Pune",
        dogsAvailable: 12,
        email: "info@punedoglovers.in",
        phone: "+91 XXXXXXXXXX",
        description: "Community-run organization dedicated to dog welfare and adoption in Pune.",
        fullDescription: "Pune Dog Lovers is a community-driven organization working to improve conditions for stray and abandoned dogs in Pune. We handle rescues, medical care, and adoptions.",
        address: "202 Community Center, Pune",
        website: "www.punedoglovers.in"
    },
    {
        id: 6,
        name: "Indie Rescue India",
        city: "Ahmedabad",
        dogsAvailable: 10,
        email: "info@indierescue.in",
        phone: "+91 XXXXXXXXXX",
        description: "Focused exclusively on rescuing and adopting indie dogs. Passionate about promoting indie adoption!",
        fullDescription: "Indie Rescue India is a specialized organization focused on rescuing, rehabilitating, and finding homes for Indian street dogs (indie breeds).",
        address: "303 Indie Park, Ahmedabad",
        website: "www.indierescue.in"
    },
    {
        id: 7,
        name: "Mumbai Animal Angels",
        city: "Mumbai",
        dogsAvailable: 16,
        email: "info@mumbaiangels.in",
        phone: "+91 XXXXXXXXXX",
        description: "Angel organization dedicated to rescuing animals in distress. Medical care is their specialty.",
        fullDescription: "Mumbai Animal Angels specializes in medical rescue and rehabilitation. Many of their dogs need special care, which they provide with expertise and compassion.",
        address: "404 Mercy Street, Mumbai",
        website: "www.mumbaiangels.in"
    },
    {
        id: 8,
        name: "Delhi Strays",
        city: "Delhi",
        dogsAvailable: 24,
        email: "info@delhitrays.in",
        phone: "+91 XXXXXXXXXX",
        description: "One of Delhi's most active rescue centers. Handles street rescues and community education.",
        fullDescription: "Delhi Strays is highly active in street rescue and community awareness about animal welfare. They provide training and rehabilitation for difficult cases.",
        address: "505 Rescue Avenue, Delhi",
        website: "www.delhistrays.in"
    }
];

// Blog Posts Database
const blogData = [
    {
        id: 1,
        title: "How to Prepare Your Home for a Rescue Dog",
        category: "Adoption",
        image: "🏠",
        summary: "A complete guide to preparing your home for your new furry family member.",
        content: "Bringing a rescue dog home is exciting! Here's what you need to prepare: 1) Safe space: Create a quiet area where your dog can feel secure. 2) Supplies: Get food/water bowls, bed, toys, leash, and collar. 3) Vet setup: Find a nearby veterinarian. 4) Rules: Establish house rules before bringing them home. 5) Patience: Remember they need time to adjust. 6) Exercise space: Ensure they have room to move and play. 7) ID: Get an ID tag and consider microchipping. Take it slow and let them adjust at their own pace.",
        author: "Dr. Priya Sharma",
        date: "March 10, 2024"
    },
    {
        id: 2,
        title: "Benefits of Adopting Indie Dogs",
        category: "Adoption",
        image: "🐕",
        summary: "Why Indian street dogs make amazing pets and deserve a chance.",
        content: "Indian indie dogs are often overlooked, but they make incredible pets! Benefits: 1) Hardy: They're naturally adapted to Indian climate. 2) Smart: Street life makes them intelligent and quick learners. 3) Loyal: Indie dogs show incredible loyalty and gratitude. 4) Health: They often have fewer genetic health issues. 5) Cost-effective: Less expensive than purebreds. 6) Unique: Every indie has a unique personality. 7) Save a life: You're literally saving a life from the streets. Consider an indie - they'll change your life forever!",
        author: "Rahul Verma",
        date: "March 5, 2024"
    },
    {
        id: 3,
        title: "Basic Dog Training Tips for Beginners",
        category: "Training",
        image: "🎓",
        summary: "Learn basic training techniques to make your dog a well-behaved companion.",
        content: "Training a dog doesn't have to be complicated. Here are basic tips: 1) Consistency: Use the same commands every time. 2) Positive reinforcement: Reward good behavior with treats and praise. 3) Short sessions: Keep training sessions to 5-10 minutes. 4) Patience: Every dog learns at their own pace. 5) Start small: Begin with simple commands like 'Sit' and 'Stay'. 6) Practice daily: Consistency is key to success. 7) Stay positive: Never scold or punish your dog. 8) Socialize: Expose them to different people and environments. Remember, training should be fun for both you and your dog!",
        author: "Ananya Singh",
        date: "March 1, 2024"
    },
    {
        id: 4,
        title: "Dog Health: Annual Checkup Checklist",
        category: "Health",
        image: "💊",
        summary: "What to expect during your dog's annual veterinary checkup.",
        content: "Regular vet checkups are crucial for your dog's health. During an annual checkup, expect: 1) Physical exam: Vet checks eyes, ears, teeth, and skin. 2) Weight check: Monitor for weight gain or loss. 3) Vaccinations: Update necessary vaccines. 4) Bloodwork: Screen for underlying health issues. 5) Parasite check: Test for worms, fleas, and ticks. 6) Dental exam: Check for dental disease. 7) Behavior assessment: Discuss any behavioral concerns. Schedule annual checkups to catch health issues early and keep your dog happy and healthy!",
        author: "Dr. Priya Sharma",
        date: "February 25, 2024"
    },
    {
        id: 5,
        title: "Nutrition Guide for Rescue Dogs",
        category: "Care",
        image: "🍖",
        summary: "How to provide proper nutrition for your rescue dog's health.",
        content: "Proper nutrition is essential for your dog's health and happiness. Key points: 1) Quality food: Choose dog food with good protein and nutrients. 2) Age-appropriate: Select food suitable for your dog's age. 3) Special needs: Some dogs need special diets due to allergies or conditions. 4) Portion control: Follow feeding guidelines to prevent obesity. 5) Fresh water: Always provide clean, fresh water. 6) Treats: Limit treats to 10% of daily calories. 7) Consult vet: Ask your vet for nutrition advice. Remember, a healthy diet = a healthy dog!",
        author: "Nutrition Expert Sarah",
        date: "February 20, 2024"
    },
    {
        id: 6,
        title: "Creating a Safe Environment for Your Dog",
        category: "Care",
        image: "🏡",
        summary: "Essential steps to make your home safe for your new dog.",
        content: "A safe environment is crucial for your dog's wellbeing. Safety tips: 1) Remove hazards: Remove toxic plants, chemicals, and small objects. 2) Secure gates: Ensure your yard is properly fenced. 3) Dog-proof cables: Hide electrical cords. 4) Safe spaces: Create a designated safe area for your dog. 5) Lock doors: Keep garden gates and doors secure. 6) Temperature control: Provide cool shelter in summer. 7) Identification: Keep ID tags and microchip info updated. 8) Emergency contacts: Keep vet numbers accessible. A safe home is a happy home!",
        author: "Pet Safety Officer",
        date: "February 15, 2024"
    }
];

// Statistics Data
const statisticsData = {
    dogsListed: 150,
    sheltersPartnered: 5,
    citiesCovered: 5,
    successfulAdoptions: 75
};

// Cities Data
const citiesData = [
    { name: "Ahmedabad", dogsCount: 3 },
    { name: "Mumbai", dogsCount: 4 },
    { name: "Delhi", dogsCount: 2 },
    { name: "Bangalore", dogsCount: 2 },
    { name: "Pune", dogsCount: 2 }
];

// City Impact Stats
const cityImpactStats = [
    { city: "Ahmedabad", adoptions: 15, shelters: 3, dogsListed: 25 },
    { city: "Mumbai", adoptions: 20, shelters: 4, dogsListed: 35 },
    { city: "Delhi", adoptions: 18, shelters: 4, dogsListed: 30 },
    { city: "Bangalore", adoptions: 12, shelters: 5, dogsListed: 28 },
    { city: "Pune", adoptions: 10, shelters: 4, dogsListed: 22 }
];

// Helper function to get dogs by city
function getDogsByCity(city) {
    return dogsData.filter(dog => dog.city === city);
}

// Helper function to get featured dogs (first 4)
function getFeaturedDogs() {
    return dogsData.slice(0, 4);
}

// Helper function to get shelters by city
function getSheltersByCity(city) {
    return sheltersData.filter(shelter => shelter.city === city);
}

// Helper function to get cities list
function getCitiesList() {
    return [...new Set(dogsData.map(dog => dog.city))];
}

// Helper function to get breeds in a city
function getBreedsByCity(city) {
    const dogs = getDogsByCity(city);
    const breeds = [...new Set(dogs.map(dog => dog.breed))];
    return breeds;
}
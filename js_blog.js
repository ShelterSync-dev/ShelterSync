/* ============================================
   BLOG PAGE - DISPLAY & MODAL
   Handles blog post display and interactions
   ============================================ */

// Blog posts data (can be replaced with Firebase later)
const blogPosts = [
    {
        id: 1,
        title: "How to Prepare Your Home for a Rescue Dog",
        category: "Adoption",
        image: "🏠",
        summary: "A complete guide to preparing your home for your new furry family member.",
        content: "Bringing a rescue dog home is exciting! Here's what you need to prepare: 1) Safe space: Create a quiet area where your dog can feel secure. 2) Supplies: Get food/water bowls, bed, toys, leash, and collar. 3) Vet setup: Find a nearby veterinarian. 4) Rules: Establish house rules before bringing them home. 5) Patience: Remember they need time to adjust. 6) Exercise space: Ensure they have room to move and play. 7) ID: Get an ID tag and consider microchipping. Take it slow and let them adjust at their own pace.",
        author: "Dr. Priya Sharma",
        date: "March 10, 2024",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Benefits of Adopting Indie Dogs",
        category: "Adoption",
        image: "🐕",
        summary: "Why Indian street dogs make amazing pets and deserve a chance.",
        content: "Indian indie dogs are often overlooked, but they make incredible pets! Benefits: 1) Hardy: They're naturally adapted to Indian climate. 2) Smart: Street life makes them intelligent and quick learners. 3) Loyal: Indie dogs show incredible loyalty and gratitude. 4) Health: They often have fewer genetic health issues. 5) Cost-effective: Less expensive than purebreds. 6) Unique: Every indie has a unique personality. 7) Save a life: You're literally saving a life from the streets. Consider an indie - they'll change your life forever!",
        author: "Rahul Verma",
        date: "March 5, 2024",
        readTime: "4 min read"
    },
    {
        id: 3,
        title: "Basic Dog Training Tips for Beginners",
        category: "Training",
        image: "🎓",
        summary: "Learn basic training techniques to make your dog a well-behaved companion.",
        content: "Training a dog doesn't have to be complicated. Here are basic tips: 1) Consistency: Use the same commands every time. 2) Positive reinforcement: Reward good behavior with treats and praise. 3) Short sessions: Keep training sessions to 5-10 minutes. 4) Patience: Every dog learns at their own pace. 5) Start small: Begin with simple commands like 'Sit' and 'Stay'. 6) Practice daily: Consistency is key to success. 7) Stay positive: Never scold or punish your dog. 8) Socialize: Expose them to different people and environments. Remember, training should be fun for both you and your dog!",
        author: "Ananya Singh",
        date: "March 1, 2024",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Dog Health: Annual Checkup Checklist",
        category: "Health",
        image: "💊",
        summary: "What to expect during your dog's annual veterinary checkup.",
        content: "Regular vet checkups are crucial for your dog's health. During an annual checkup, expect: 1) Physical exam: Vet checks eyes, ears, teeth, and skin. 2) Weight check: Monitor for weight gain or loss. 3) Vaccinations: Update necessary vaccines. 4) Bloodwork: Screen for underlying health issues. 5) Parasite check: Test for worms, fleas, and ticks. 6) Dental exam: Check for dental disease. 7) Behavior assessment: Discuss any behavioral concerns. Schedule annual checkups to catch health issues early and keep your dog happy and healthy!",
        author: "Dr. Priya Sharma",
        date: "February 25, 2024",
        readTime: "5 min read"
    },
    {
        id: 5,
        title: "Nutrition Guide for Rescue Dogs",
        category: "Care",
        image: "🍖",
        summary: "How to provide proper nutrition for your rescue dog's health.",
        content: "Proper nutrition is essential for your dog's health and happiness. Key points: 1) Quality food: Choose dog food with good protein and nutrients. 2) Age-appropriate: Select food suitable for your dog's age. 3) Special needs: Some dogs need special diets due to allergies or conditions. 4) Portion control: Follow feeding guidelines to prevent obesity. 5) Fresh water: Always provide clean, fresh water. 6) Treats: Limit treats to 10% of daily calories. 7) Consult vet: Ask your vet for nutrition advice. Remember, a healthy diet = a healthy dog!",
        author: "Nutrition Expert Sarah",
        date: "February 20, 2024",
        readTime: "4 min read"
    },
    {
        id: 6,
        title: "Creating a Safe Environment for Your Dog",
        category: "Care",
        image: "🏡",
        summary: "Essential steps to make your home safe for your new dog.",
        content: "A safe environment is crucial for your dog's wellbeing. Safety tips: 1) Remove hazards: Remove toxic plants, chemicals, and small objects. 2) Secure gates: Ensure your yard is properly fenced. 3) Dog-proof cables: Hide electrical cords. 4) Safe spaces: Create a designated safe area for your dog. 5) Lock doors: Keep garden gates and doors secure. 6) Temperature control: Provide cool shelter in summer. 7) Identification: Keep ID tags and microchip info updated. 8) Emergency contacts: Keep vet numbers accessible. A safe home is a happy home!",
        author: "Pet Safety Officer",
        date: "February 15, 2024",
        readTime: "5 min read"
    }
];

// ============================================
// INITIALIZE PAGE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    displayBlogPosts();
    initializeBlogModal();
});

// ============================================
// DISPLAY BLOG POSTS
// ============================================

function displayBlogPosts() {
    const container = document.getElementById('blogContainer');
    if (!container) {
        console.error('Blog container not found');
        return;
    }

    if (blogPosts.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No blog posts available yet.</p>';
        return;
    }

    container.innerHTML = blogPosts.map(post => `
        <div class="blog-card" onclick="viewBlogPostModal(${post.id})">
            <div class="card-image">${post.image}</div>
            <div class="card-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="color: #FF914D; font-weight: 600; font-size: 0.85rem; background: #FFF0E6; padding: 4px 12px; border-radius: 20px;">
                        ${post.category}
                    </span>
                    <span style="color: #999; font-size: 0.85rem;">⏱️ ${post.readTime}</span>
                </div>
                <h3 style="margin-bottom: 0.5rem; line-height: 1.3;">${post.title}</h3>
                <p class="card-description">${post.summary}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee;">
                    <span style="color: #999; font-size: 0.9rem;">By ${post.author}</span>
                    <span style="color: #FF914D; font-weight: 600; cursor: pointer;">Read More →</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// BLOG POST MODAL
// ============================================

function viewBlogPostModal(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) {
        console.error('Blog post not found');
        return;
    }

    const modal = document.getElementById('blogModal');
    const modalBody = document.getElementById('blogModalBody');

    if (!modal || !modalBody) {
        console.error('Blog modal elements not found');
        return;
    }

    // Create formatted content
    const formattedContent = post.content
        .split('\n')
        .map(paragraph => paragraph.trim())
        .filter(p => p)
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');

    modalBody.innerHTML = `
        <div class="blog-full-content">
            <div style="margin-bottom: 2rem;">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 5rem; margin-bottom: 1rem;">${post.image}</div>
                    <span style="display: inline-block; color: #FF914D; font-weight: 600; font-size: 0.9rem; background: #FFF0E6; padding: 6px 14px; border-radius: 20px; margin-bottom: 1rem;">
                        ${post.category}
                    </span>
                </div>
                <h2 style="text-align: center; margin-bottom: 1rem;">${post.title}</h2>
                <div style="text-align: center; color: #999; margin-bottom: 1.5rem;">
                    <p style="margin-bottom: 0.5rem;">By <strong>${post.author}</strong></p>
                    <p style="margin: 0;">📅 ${post.date} • ⏱️ ${post.readTime}</p>
                </div>
            </div>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; line-height: 1.8; color: #555;">
                ${post.content}
            </div>

            <div style="margin-top: 2rem; padding: 1.5rem; background: #fff0e6; border-radius: 8px; border-left: 4px solid #FF914D;">
                <h4 style="margin-bottom: 0.5rem; color: #333;">Did you find this helpful?</h4>
                <p style="margin: 0.5rem 0; color: #666;">Share this article with someone looking to adopt a dog!</p>
                <button class="btn btn-primary" onclick="shareBlogPost('${post.title}')" style="margin-top: 0.5rem;">
                    Share Article
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

// ============================================
// SHARE FUNCTIONALITY
// ============================================

function shareBlogPost(title) {
    const articleUrl = window.location.href;
    const text = `Check out this article on PawAdopt: "${title}". Learn more about dog adoption and care!`;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: articleUrl
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        const shareText = `${title}\n\n${text}\n\n${articleUrl}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('✅ Article link copied to clipboard!');
        });
    }
}

// ============================================
// MODAL INITIALIZATION
// ============================================

function initializeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (!modal) {
        console.error('Blog modal not found in DOM');
        return;
    }

    const closeBtn = modal.querySelector('.modal-close');

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    // Click outside modal to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// ============================================
// SEARCH/FILTER FUNCTIONALITY (Optional)
// ============================================

function filterBlogByCategory(category) {
    const container = document.getElementById('blogContainer');
    if (!container) return;

    let filtered;
    if (category === 'all') {
        filtered = blogPosts;
    } else {
        filtered = blogPosts.filter(post => post.category === category);
    }

    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No posts in this category.</p>';
        return;
    }

    container.innerHTML = filtered.map(post => `
        <div class="blog-card" onclick="viewBlogPostModal(${post.id})">
            <div class="card-image">${post.image}</div>
            <div class="card-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="color: #FF914D; font-weight: 600; font-size: 0.85rem; background: #FFF0E6; padding: 4px 12px; border-radius: 20px;">
                        ${post.category}
                    </span>
                    <span style="color: #999; font-size: 0.85rem;">⏱️ ${post.readTime}</span>
                </div>
                <h3 style="margin-bottom: 0.5rem; line-height: 1.3;">${post.title}</h3>
                <p class="card-description">${post.summary}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee;">
                    <span style="color: #999; font-size: 0.9rem;">By ${post.author}</span>
                    <span style="color: #FF914D; font-weight: 600; cursor: pointer;">Read More →</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// GET UNIQUE CATEGORIES
// ============================================

function getBlogCategories() {
    return [...new Set(blogPosts.map(post => post.category))];
}
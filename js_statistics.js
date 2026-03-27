/* ============================================
   STATISTICS PAGE - COUNTER ANIMATIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
    displayCityStats();
});

function animateCounters() {
    const duration = 2000; // 2 seconds
    const framerate = 60;
    const frames = duration / (1000 / framerate);

    // Dogs Listed Counter
    animateCounter('dogsListed', statisticsData.dogsListed, frames);

    // Shelters Partnered Counter
    animateCounter('sheltersPartnered', statisticsData.sheltersPartnered, frames);

    // Cities Covered Counter
    animateCounter('citiesCovered', statisticsData.citiesCovered, frames);

    // Successful Adoptions Counter
    animateCounter('successfulAdoptions', statisticsData.successfulAdoptions, frames);
}

function animateCounter(elementId, finalValue, frames) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let currentFrame = 0;

    const interval = setInterval(() => {
        currentFrame++;
        const progress = currentFrame / frames;
        const currentValue = Math.floor(finalValue * progress);

        element.textContent = currentValue;

        if (currentFrame >= frames) {
            element.textContent = finalValue;
            clearInterval(interval);
        }
    }, 1000 / 60);
}

function displayCityStats() {
    const container = document.getElementById('cityStatsContainer');
    if (!container) return;

    container.innerHTML = cityImpactStats.map(stat => `
        <div class="city-stat-item">
            <h4>${stat.city}</h4>
            <p>🐕 <strong>${stat.dogsListed}</strong> Dogs Listed</p>
            <p>🏢 <strong>${stat.shelters}</strong> Shelters</p>
            <p>✅ <strong>${stat.adoptions}</strong> Adoptions</p>
        </div>
    `).join('');
}
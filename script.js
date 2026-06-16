function updateCountdown() {
    // Set target date to June 20th, 2026 at midnight
    const targetDate = new Date('2026-06-20T00:00:00').getTime();
    
    // Get current time
    const now = new Date().getTime();
    
    // Calculate time difference
    const difference = targetDate - now;
    
    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update DOM - make sure elements exist first
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
    if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
    
    console.log(`Countdown: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
}

// Update countdown immediately on page load
window.addEventListener('load', function() {
    updateCountdown();
    // Update countdown every second
    setInterval(updateCountdown, 1000);
});

// Also try updating if DOM is already ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
} else {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
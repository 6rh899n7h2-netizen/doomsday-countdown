function updateCountdown() {
    // Set target date to June 20th, 2026 at midnight
    const targetDate = new Date('2026-06-20T00:00:00').getTime();
    
    // Get current time
    const now = new Date().getTime();
    
    // Calculate time difference
    const difference = targetDate - now;
    
    // Calculate total time from start to end (for progress calculation)
    const startDate = new Date('2026-06-17T00:00:00').getTime(); // Today (3 days before)
    const totalTime = targetDate - startDate;
    const elapsedTime = now - startDate;
    const progress = Math.min(Math.max(elapsedTime / totalTime, 0), 1); // 0 to 1
    
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
    
    // Update background and text color based on progress
    updateBackgroundAndColor(progress);
    
    // Check if countdown has finished
    if (difference < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        clearInterval(countdownInterval);
    }
}

function updateBackgroundAndColor(progress) {
    const body = document.body;
    
    // First background image
    const bg1 = 'https://cdn.discordapp.com/attachments/1502538307567878214/1516927800202887279/240_20260618010111.png?ex=6a346c9a&is=6a331b1a&hm=e6f775671031384c47d21018369e252115ae999a8bdfd7f9d03df6faaa231019&';
    
    // Second background image
    const bg2 = 'https://cdn.discordapp.com/attachments/1502538307567878214/1516927828375900241/240_20260618010344.png?ex=6a346ca1&is=6a331b21&hm=038432649c14136fff2adb75661715b90111b959f4054a6053897caf8959804b&';
    
    // First image starts at full opacity (1) and fades to 0
    const opacity1 = 1 - progress;
    
    // Second image starts at 0 opacity and fades in to full opacity (1)
    const opacity2 = progress;
    
    // Create pseudo-elements with opacity layers stacked on top of each other
    body.style.backgroundImage = `
        linear-gradient(rgba(255, 255, 255, ${opacity1}), rgba(255, 255, 255, ${opacity1})),
        url('${bg1}'),
        linear-gradient(rgba(255, 255, 255, ${1 - opacity2}), rgba(255, 255, 255, ${1 - opacity2})),
        url('${bg2}')
    `;
    
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundAttachment = 'fixed';
    
    // Calculate color transition from white (255, 255, 255) to red (255, 0, 0)
    const red = 255;
    const green = Math.round(255 * (1 - progress));
    const blue = Math.round(255 * (1 - progress));
    
    const textColor = `rgb(${red}, ${green}, ${blue})`;
    
    // Apply color to all text elements
    document.documentElement.style.setProperty('--text-color', textColor);
    
    // Update specific elements
    const titleElement = document.querySelector('.doomsday-title');
    if (titleElement) {
        titleElement.style.color = textColor;
        titleElement.style.textShadow = `0 0 10px ${textColor}`;
    }
    
    const timeValues = document.querySelectorAll('.time-value');
    timeValues.forEach(element => {
        element.style.color = textColor;
        element.style.textShadow = `0 0 10px ${textColor}`;
    });
    
    const timeLabels = document.querySelectorAll('.time-label');
    timeLabels.forEach(element => {
        element.style.color = textColor;
    });
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

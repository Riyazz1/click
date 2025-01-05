const button = document.getElementById('runaway-button');
const counter = document.getElementById('counter');
let clickCount = 0;

// Button avoids cursor
button.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const buttonRect = button.getBoundingClientRect();
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;

    const deltaX = buttonX - mouseX;
    const deltaY = buttonY - mouseY;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance < 50) {
        const moveDistance = 30;
        const moveX = (deltaX / distance) * moveDistance;
        const moveY = (deltaY / distance) * moveDistance;

        let newLeft = button.offsetLeft + moveX;
        let newTop = button.offsetTop + moveY;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        newLeft = Math.min(Math.max(0, newLeft), viewportWidth - buttonRect.width);
        newTop = Math.min(Math.max(0, newTop), viewportHeight - buttonRect.height);

        button.style.left = `${newLeft}px`;
        button.style.top = `${newTop}px`;
    }
});

// Update counter on button click
button.addEventListener('click', () => {
    clickCount++;
    counter.textContent = `Clicks: ${clickCount}`;
    animateCounter();
});

// Animate the counter
function animateCounter() {
    counter.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counter.style.transform = 'scale(1)';
    }, 200);
}

// Create falling circles
function createFallingCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = Math.random() * 30 + 10; // Random size
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    const startX = Math.random() * window.innerWidth; // Random horizontal position
    circle.style.left = `${startX}px`;

    const duration = Math.random() * 3 + 2; // Random fall duration
    circle.style.animationDuration = `${duration}s`;

    document.body.appendChild(circle);

    // Remove the circle after animation ends
    circle.addEventListener('animationend', () => {
        circle.remove();
    });
}

// Generate circles at intervals
setInterval(createFallingCircle, 300);
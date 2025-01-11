const button = document.getElementById('runaway-button');
const counter = document.getElementById('counter');
let clickCount = 0;


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


button.addEventListener('click', () => {
    clickCount++;
    counter.textContent = `Click: ${clickCount}`;
    animateCounter();
});


function animateCounter() {
    counter.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counter.style.transform = 'scale(1)';
    }, 200);
}


function createFallingCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = Math.random() * 30 + 10; 
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    const startX = Math.random() * window.innerWidth; 
    circle.style.left = `${startX}px`;

    const duration = Math.random() * 3 + 2; 
    circle.style.animationDuration = `${duration}s`;

    document.body.appendChild(circle);

    
    circle.addEventListener('animationend', () => {
        circle.remove();
    });
}


setInterval(createFallingCircle, 300);
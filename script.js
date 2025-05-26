// --- Theme Switcher ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.remove('light-theme', 'dark-theme'); // Remove default
    body.classList.add(savedTheme);
    updateThemeIcons(savedTheme);
} else {
    // Default to light theme if no preference is saved
    body.classList.add('light-theme');
    updateThemeIcons('light-theme');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        updateThemeIcons('dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
        updateThemeIcons('light-theme');
    }
});

function updateThemeIcons(currentTheme) {
    if (currentTheme === 'dark-theme') {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'inline-block';
    } else {
        lightIcon.style.display = 'inline-block';
        darkIcon.style.display = 'none';
    }
}


// --- Scroll Animations (Intersection Observer) ---
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% of the element must be visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

animateOnScrollElements.forEach(element => {
    observer.observe(element);
});

// Optional: Add active class to current nav link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
});
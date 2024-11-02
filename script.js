document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links li a');
    const sections = document.querySelectorAll('section');
    const navbarSelector = 'nav#main-nav';
    const navbar = document.querySelector(navbarSelector);

    function addStyles(selector) {
        const styles = `
        ${selector} {
            transition: height 0.5s ease-in-out, padding 0.5s ease-in-out
        }
        ${selector}.shrink {
            padding: 15px
            height: 20px
        }
        `
        const styleTag = document.createElement('style');
        styleTag.innerHTML = styles;
        document.head.appendChild(styleTag);
    }
    addStyles(navbarSelector)

    window.addEventListener('scroll', () => {
        console.scrollY > 10
            ? navbar.classList.add('shrink')
            : navbar.classList.remove('shrink')
    })

    // Intersection Observer setup
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                setActiveNavLink(id);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    function setActiveNavLink(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }

    // Set Home as default active link
    navLinks[0].classList.add('active');

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Initialize EmailJS
    emailjs.init("jkLAd8X0aWHM4emed");

    // Form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // Show spinner
        document.getElementById('spinner').style.display = 'flex';

        // Collect the form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const prefix = document.getElementById('prefix').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Set up the email parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            prefix: prefix,
            phone: phone,
            message: message
        };

        // Debugging: Log the parameters
        console.log("Sending email with parameters:", templateParams);

        // Send the email using EmailJS
        emailjs.send('service_8etewic', 'template_4aychwg', templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response);
                
                // Hide spinner
                document.getElementById('spinner').style.display = 'none';

                // Show custom modal
                document.getElementById('modal-message').textContent = 'Your message has been sent. We will get back to you soon!';
                document.getElementById('thank-you-modal').style.display = 'block';
                
                // Reset the form fields
                document.getElementById('contact-form').reset();
            }, function(error) {
                console.error('EmailJS failed:', error);
                
                // Hide spinner
                document.getElementById('spinner').style.display = 'none';

                // Show error in custom modal
                document.getElementById('modal-message').textContent = 'There was an error sending your message. Please try again later.';
                document.getElementById('thank-you-modal').style.display = 'block';
            });
    });
        // Close modal when clicking the close button
    document.getElementById('modal-close').addEventListener('click', function() {
        document.getElementById('thank-you-modal').style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('thank-you-modal')) {
            document.getElementById('thank-you-modal').style.display = 'none';
        }
    });

    // New scroll event to adjust caption padding
    document.addEventListener('scroll', function() {
        const mainNav = document.getElementById('main-nav');
    
        if (window.scrollY > 10) {
            mainNav.classList.add('shrink');
        } else {
            mainNav.classList.remove('shrink');
        }
    });

    // Prefix input handling
    document.getElementById('prefix').addEventListener('input', function(e) {
        // Remove any non-digit characters
        let value = this.value.replace(/\D/g, '');
        
        // Ensure it starts with a '+'
        if (value) {
            value = '+' + value;
        }
        
        // Limit to 3 digits (plus the '+' sign)
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        
        this.value = value;
    });

    // Form validation for prefix and phone
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        var phoneInput = document.getElementById('phone');
        var prefixInput = document.getElementById('prefix');
        
        if ((phoneInput.value && !prefixInput.value) || (!phoneInput.value && prefixInput.value)) {
            e.preventDefault();
            alert('Please enter both prefix and phone number, or leave both empty.');
        }
    });

    // Team carousel
    const carousel = document.querySelector('.team-carousel');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const teamMembers = document.querySelectorAll('.team-member');

    // Funkcja przesuwająca członka zespołu na początek karuzeli
    function moveToFront(member) {
        while (carousel.firstElementChild !== member) {
            carousel.appendChild(carousel.firstElementChild);
        }
    }

    function moveToBack(member) {
        while (carousel.lastElementChild !== member) {
            carousel.appendChild(carousel.firstElementChild);
        }
    }

    // Funkcja przesuwająca członka zespołu na środek karuzeli
    function moveToFrontRight(member) {
        // Najpierw ustawiamy go na początek
        moveToFront(member);

        // Następnie przesuwamy karuzelę w prawo, aby dany członek był w środku
        moveRight()
        
    }
    function moveToBackLeft(member) {
        // Najpierw ustawiamy go na początek
        moveToBack(member);

        // Następnie przesuwamy karuzelę w prawo, aby dany członek był w środku

        moveLeft()
        
    }
    function moveLeft() {
        carousel.appendChild(carousel.firstElementChild);
    }

    function moveRight() {
        carousel.prepend(carousel.lastElementChild);
    }

    leftArrow.addEventListener('click', moveRight);
    rightArrow.addEventListener('click', moveLeft);

    // Dodaj event listener do każdego członka zespołu
    teamMembers.forEach(member => {
        member.addEventListener('click', () => {
            if (member === carousel.firstElementChild) {
                moveToFrontRight(member);
            } else if (member === carousel.lastElementChild) {
                moveToBackLeft(member);
            } 
        });
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    function isMobileView() {
        return window.innerWidth <= 768;
    }

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (navLinksContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function initializeMenuState() {
        if (isMobileView()) {
            closeMenu();
        } else {
            navLinksContainer.classList.remove('active');
            navLinksContainer.style.left = '';
        }
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
    }

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    navLinks.forEach(item => {
        item.addEventListener('click', (e) => {
            if (isMobileView()) {
                closeMenu();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (isMobileView() && navLinksContainer.classList.contains('active')) {
            if (!navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobileView()) {
            closeMenu();
        }
    });

    initializeMenuState();

    window.addEventListener('resize', () => {
        initializeMenuState();
    });
});

// Lanuage switcher
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = document.documentElement.lang;
    const langLinks = document.querySelectorAll('.lang-link');
    
    langLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentLang)) {
            link.classList.add('active');
        }
    });
});

// Theme switcher
const themeToggle = document.getElementById('theme-toggle');
const themeStylesheet = document.getElementById('theme-stylesheet');

// Load the user's theme preference on page load
function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        themeStylesheet.setAttribute('href', 'light-mode.css');
        themeToggle.checked = true; // Set the toggle to checked for light mode
    } else {
        themeStylesheet.setAttribute('href', 'dark-mode.css'); // Default to dark mode
        themeToggle.checked = false; // Ensure the toggle is off for dark mode
    }
}

// Apply the theme when the page loads
loadTheme();

// Toggle the theme on checkbox change
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        themeStylesheet.setAttribute('href', 'light-mode.css');
        localStorage.setItem('theme', 'light');
    } else {
        themeStylesheet.setAttribute('href', 'dark-mode.css');
        localStorage.setItem('theme', 'dark');
    }
});

// Settings reveal
document.getElementById('cog-icon').addEventListener('click', function () {
    const settings = document.querySelector('.settings');
    settings.classList.toggle('hidden');
});

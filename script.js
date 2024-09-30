document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize EmailJS
    emailjs.init("jkLAd8X0aWHM4emed");

    // Form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();

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
                alert('Thank you for your message. We will get back to you soon!');
                
                // Reset the form fields
                document.getElementById('contact-form').reset();
            }, function(error) {
                console.error('EmailJS failed:', error);  // Pokaż pełny błąd w konsoli
                alert('There was an error sending your message. Please try again later.');
            });
    });

    // New scroll event to adjust caption padding
    document.addEventListener('scroll', function() {
        const captions = document.querySelectorAll('.caption');

        if (window.scrollY > 10) {
            captions.forEach(caption => {
                caption.classList.add('shrink');
            });
        } else {
            captions.forEach(caption => {
                caption.classList.remove('shrink');
            });
        }
    });

    // scroll event end
});


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
document.getElementById('contact-form').addEventListener('submit', function(e) {
    var phoneInput = document.getElementById('phone');
    var prefixInput = document.getElementById('prefix');
    
    if ((phoneInput.value && !prefixInput.value) || (!phoneInput.value && prefixInput.value)) {
        e.preventDefault();
        alert('Please enter both prefix and phone number, or leave both empty.');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.team-carousel');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    function moveLeft() {
        carousel.appendChild(carousel.firstElementChild);
    }

    function moveRight() {
        carousel.prepend(carousel.lastElementChild);
    }

    leftArrow.addEventListener('click', moveRight);
    rightArrow.addEventListener('click', moveLeft);
});

// Fading greetings (start)
const greetings = ["Welcome to CodeBay!", "Bienvenido a CodeBay!", "Willkommen bei CodeBay!", "Bienvenue a CodeBay!", "Witaj w CodeBay!", "Benvenuto a CodeBay!", "Bem-vindo a CodeBay!"];
let currentIndex = 0;

function changeGreeting() {
    const greetingElement = document.getElementById('greeting');
    
    // Fade out
    greetingElement.style.opacity = '0';

    // Wait for fade out, then change text and fade in
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % greetings.length;
        greetingElement.textContent = greetings[currentIndex];
        greetingElement.style.opacity = '1';

        // Schedule next change
        setTimeout(changeGreeting, 3000);
    }, 2000);
}

// Start the cycle
changeGreeting();
// Fading greetings (end)

// Hamburger menu (start)
document.addEventListener('DOMContentLoaded', (event) => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    function isMobileView() {
        return window.innerWidth <= 768;
    }

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (isMobileView()) {
                closeMenu();
            }
            const targetId = item.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (isMobileView() && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobileView()) {
            closeMenu();
        }
    });
    
});


// Hamburger menu (end)


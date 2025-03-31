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

    // Form validation for prefix and phone
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        var phoneInput = document.getElementById('phone');
        var prefixInput = document.getElementById('prefix');
        var errorMessage = document.getElementById('error-message');
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

        if ((phoneInput.value && !prefixInput.value) || (!phoneInput.value && prefixInput.value)) {
            e.preventDefault();
            errorMessage.textContent = 'Please enter both country code and phone number, or leave both empty.';
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none'; // Hide the error message if inputs are valid
            e.preventDefault();
            // Show spinner
            document.getElementById('spinner').style.display = 'flex';

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
            }
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

    // Team carousel
    const carousel = document.querySelector('.team-carousel');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const leftArrowMobile = document.querySelector('.left-arrow.mobile-arrow');
    const rightArrowMobile = document.querySelector('.right-arrow.mobile-arrow');
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

    // Team carousel - Mobile
    function moveLeftMobile() {
        carousel.appendChild(carousel.firstElementChild);
    }

    function moveRightMobile() {
        carousel.prepend(carousel.lastElementChild);
    }

    leftArrowMobile.addEventListener('click', moveRightMobile);
    rightArrowMobile.addEventListener('click', moveLeftMobile);

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

// Language switcher
document.addEventListener("DOMContentLoaded", function () {
    const langToggle = document.getElementById("language-toggle");
    const langText = document.getElementById("lang-text");
    const flagIcon = document.getElementById("flag-icon");

    let currentLang = window.location.pathname.includes("-pl") ? "pl" : "en";

    function updateLanguageButton() {
        if (currentLang === "en") {
            langText.textContent = "EN";
            langToggle.href = "index-pl.html";
            flagIcon.innerHTML = `
            <!-- Flaga UK -->
            <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
            <use xlink:href="#s" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#s)" stroke="#C8102E" stroke-width="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
        `;
        } else {
            langText.textContent = "PL";
            langToggle.href = "index.html";
            flagIcon.innerHTML = 
            `
                <!-- Flaga Polski -->
                <rect width="60" height="15" fill="white"></rect>
                <rect y="15" width="60" height="15" fill="#DC143C"></rect>
            `;
        }
    }

    updateLanguageButton();
});

// Theme switcher
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeStylesheet = document.getElementById("theme-stylesheet");

// Sprawdzenie zapisanych ustawień motywu w localStorage
const currentTheme = localStorage.getItem("theme") || "dark"; // Domyślnie ciemny motyw
setTheme(currentTheme);

// Obsługa kliknięcia przycisku zmiany motywu
themeToggle.addEventListener("click", () => {
    const newTheme = themeStylesheet.getAttribute("href") === "dark-mode.css" ? "light" : "dark";
    setTheme(newTheme);
});

// Funkcja do zmiany motywu
function setTheme(theme) {
    if (theme === "light") {
        themeStylesheet.setAttribute("href", "light-mode.css");
        themeIcon.textContent = "light_mode"; // Ikona słońca
    } else {
        themeStylesheet.setAttribute("href", "dark-mode.css");
        themeIcon.textContent = "dark_mode"; // Ikona księżyca
    }
    localStorage.setItem("theme", theme); // Zapis motywu w localStorage
}


// Copy email to clipboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the email address and copy icon
    const emailElement = document.getElementById('email-address');
    const copyIcon = document.getElementById('copy-icon');
    
    // Function to copy the email to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Email copied to clipboard!");  // Optional: feedback to user
        }).catch(err => {
            console.error("Error copying text to clipboard: ", err);
        });
    }

    // Event listener for clicking on the email address
    emailElement.addEventListener('click', function() {
        copyToClipboard(emailElement.innerText);
    });

    // Event listener for clicking on the copy icon
    copyIcon.addEventListener('click', function() {
        copyToClipboard(emailElement.innerText);
    });
});
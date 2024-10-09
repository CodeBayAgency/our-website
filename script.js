document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links li a');
    const sections = document.querySelectorAll('section');

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

    // Funkcja przesuwająca członka zespołu na środek karuzeli
    function moveToMiddle(member) {
        // Najpierw ustawiamy go na początek
        moveToFront(member);

        // Następnie przesuwamy karuzelę w lewo dwa razy, aby dany członek był w środku
        moveLeft();
        moveLeft();
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
            moveToMiddle(member);
        });
    });


    // Fading greetings
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

    // Start the greeting cycle
    changeGreeting();

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    function isMobileView() {
        return window.innerWidth <= 768;
    }

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
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
});
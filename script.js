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

    // Form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    });
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
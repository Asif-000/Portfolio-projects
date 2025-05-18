var typed = new Typed(".text", {
    strings: ["Frontend Developer", "Web Developer", "Graphics Designer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Toggle sidebar menu
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.onclick = function() {
    navbar.classList.toggle('active');
};

// Optional: close sidebar when a link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => navbar.classList.remove('active');
});


document.querySelectorAll('.row').forEach(function(card) {
    card.addEventListener('click', function(e) {
        // Remove 'show-layer' from all cards except the one clicked
        document.querySelectorAll('.row').forEach(function(c) {
            if (c !== card) c.classList.remove('show-layer');
        });
        // Toggle 'show-layer' on the clicked card
        card.classList.toggle('show-layer');
    });
});
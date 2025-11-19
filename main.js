(function ($) {
    "use strict";

    // Initialize AOS with detailed options
    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Smooth scrolling for anchor links
    $(document).ready(function () {
        $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, 'swing');
            }
        });
    });

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
                // Ensure dropdown is always visible on mobile/tablet
                $('.dropdown-menu').show();
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Optimized back to top button
    let backToTopTicking = false;

    function updateBackToTop() {
        if ($(window).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
        backToTopTicking = false;
    }

    $(window).scroll(function () {
        if (!backToTopTicking) {
            requestAnimationFrame(updateBackToTop);
            backToTopTicking = true;
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'swing');
        return false;
    });

    // Close navbar on link click for mobile, but not on dropdown-toggle
    $('.navbar-nav .nav-link:not(.dropdown-toggle), .navbar-nav .dropdown-item').click(function () {
        if ($(window).width() < 992) {
            $('#navbarCollapse').removeClass('show');
        }
    });

    // Prevent navbar from closing when clicking dropdown-toggle on mobile/tablet
    $('.navbar-nav .dropdown-toggle').click(function (e) {
        if ($(window).width() < 992) {
            e.preventDefault();
        }
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

// Tooltip functionality
const tooltips = document.querySelectorAll('.tooltip');
tooltips.forEach(tooltip => {
  tooltip.addEventListener('mouseenter', function() {
    const tooltipText = this.querySelector('.tooltiptext');
    tooltipText.style.visibility = 'visible';
    tooltipText.style.opacity = '1';
  });
  tooltip.addEventListener('mouseleave', function() {
    const tooltipText = this.querySelector('.tooltiptext');
    tooltipText.style.visibility = 'hidden';
    tooltipText.style.opacity = '0';
  });
});

// Modal functionality
const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');
const span = document.getElementsByClassName('close')[0];

if (btn) {
  btn.onclick = function() {
    modal.style.display = 'block';
  }
}

if (span) {
  span.onclick = function() {
    modal.style.display = 'none';
  }
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Gallery click to open modal
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const imgSrc = this.querySelector('img').src;
    const modalImg = document.getElementById('modalImg');
    if (modalImg) {
      modalImg.src = imgSrc;
    }
    if (modal) {
      modal.style.display = 'block';
    }
  });
});

// Stagger animation for menu cards
const menuCards = document.querySelectorAll('#menu .card');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate');
      }, index * 200); // Stagger delay of 200ms between cards
    }
  });
}, observerOptions);

menuCards.forEach(card => {
  staggerObserver.observe(card);
});

// Optimized parallax effect for hero section (disabled on mobile for performance)
const heroSection = document.querySelector('.page-header');
let parallaxTicking = false;

function updateParallax() {
  const currentScrollY = window.scrollY;

  // Disable parallax on mobile devices
  if (window.innerWidth > 768 && heroSection) {
    const parallaxSpeed = 0.5;
    const translateY = currentScrollY * parallaxSpeed;
    heroSection.style.transform = `translateY(${translateY}px)`;
  } else if (heroSection) {
    heroSection.style.transform = 'translateY(0)';
  }
  parallaxTicking = false;
}

window.addEventListener('scroll', () => {
  if (!parallaxTicking) {
    requestAnimationFrame(updateParallax);
    parallaxTicking = true;
  }
}, { passive: true });

})(jQuery);

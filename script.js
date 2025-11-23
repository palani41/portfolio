$(document).ready(function() {
  
  // ============ INITIALIZE AOS ANIMATION ============
  AOS.init({
    duration: 800,
    once: true,
    offset: 100
  });

  // ============ NAVBAR SCROLL EFFECT ============
  $(window).scroll(function() {
    // Add shadow to navbar on scroll
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }

    // Show/hide scroll to top button
    if ($(this).scrollTop() > 300) {
      $('#scrollTop').addClass('show');
    } else {
      $('#scrollTop').removeClass('show');
    }

    // Active nav link on scroll
    let scrollPos = $(document).scrollTop();
    $('.nav-link').each(function() {
      let currLink = $(this);
      let refElement = $(currLink.attr('href'));
      
      if (refElement.position() && 
          refElement.position().top <= scrollPos + 100 && 
          refElement.position().top + refElement.height() > scrollPos) {
        $('.nav-link').removeClass('active');
        currLink.addClass('active');
      }
    });
  });

  // ============ SCROLL TO TOP BUTTON ============
  $('#scrollTop').click(function() {
    $('html, body').animate({scrollTop: 0}, 600);
    return false;
  });

  // ============ SMOOTH SCROLLING ============
  $('a[href*="#"]').on('click', function(e) {
    if (this.hash !== '') {
      e.preventDefault();
      const hash = this.hash;
      
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 70
      }, 600);
    }
  });

  // ============ CLOSE MOBILE MENU ON CLICK ============
  $('.nav-link').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // ============ TYPING ANIMATION ============
  const texts = [
    'Full Stack Developer',
    'React.js Developer',
    'ColdFusion Expert',
    'Node.js Developer',
    'Problem Solver'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedOutput = document.getElementById('typed-output');

  function type() {
    if (!typedOutput) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      charIndex = Math.max(0, charIndex - 1);
      typedOutput.textContent = currentText.substring(0, charIndex);
    } else {
      charIndex = Math.min(currentText.length, charIndex + 1);
      typedOutput.textContent = currentText.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before next text
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing animation
  type();

  // ============ ANIMATE SKILL BARS ============
  function animateSkills() {
    $('.skill-progress').each(function() {
      const progress = $(this).data('progress');
      const elementTop = $(this).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();
      
      if (elementTop < windowBottom - 100) {
        $(this).css('width', progress + '%');
      }
    });
  }

  // Trigger skill animation on scroll
  $(window).scroll(animateSkills);
  
  // Initial check for skills in viewport
  animateSkills();

  // ============ CONTACT FORM SUBMISSION ============
  $('#contactForm').submit(function(e) {
    e.preventDefault();
    
    // Get form values
    const name = $('#name').val();
    const email = $('#email').val();
    const subject = $('#subject').val();
    const message = $('#message').val();
    
    // Create mailto body
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailto = `mailto:s.m.palani412002@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Open email client
    window.location.href = mailto;
    
    // Reset form
    this.reset();
  });

  // ============ PREVENT HORIZONTAL SCROLL ============
  $('body, html').css('overflow-x', 'hidden');

});
// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      });
  
      // Close mobile menu when clicking a link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        });
      });
    }
  
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  
    // Typing Animation
    const texts = [
      'Full Stack Developer',
      'ColdFusion Expert',
      'Lucee Specialist',
      'Web Developer',
      'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedOutput = document.getElementById('typed-output');
  
    function type() {
      if (!typedOutput || texts.length === 0) return;
  
      const currentText = texts[textIndex] || '';
      
      if (isDeleting) {
        // ensure charIndex stays >= 0
        charIndex = Math.max(0, charIndex - 1);
        typedOutput.textContent = currentText.substring(0, charIndex);
      } else {
        charIndex = Math.min(currentText.length, charIndex + 1);
        typedOutput.textContent = currentText.substring(0, charIndex);
      }
  
      let typeSpeed = isDeleting ? 50 : 100;
  
      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }
  
      setTimeout(type, typeSpeed);
    }
  
    // Start typing animation only if target exists
    if (typedOutput) type();
  
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-links a');
  
    if (sections.length && navLinksAll.length) {
      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id') || '';
          }
        });
  
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href') || '';
          if (href.substring(1) === current) {
            link.classList.add('active');
          }
        });
      });
    }
  
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkills = () => {
      if (!skillBars.length) return;
      skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 100) {
          const progress = parseInt(bar.getAttribute('data-progress'), 10) || 0;
          bar.style.width = progress + '%';
        }
      });
    };
  
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Initial check
  
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          scrollTopBtn.classList.add('active');
        } else {
          scrollTopBtn.classList.remove('active');
        }
      });
  
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data safely
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const subject = document.getElementById('subject')?.value || 'Contact from portfolio';
        const message = document.getElementById('message')?.value || '';
        
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  
        // Open the user's email client
        const mailto = `mailto:s.m.palani412002@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.location.href = mailto;
        
        // Reset form
        contactForm.reset();
      });
    }
});
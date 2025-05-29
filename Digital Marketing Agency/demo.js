    // Fade-in on scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Simple form submission handler (demo)
    document.getElementById('contactForm').addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for reaching out! We will get back to you soon.');
      e.target.reset();
    });
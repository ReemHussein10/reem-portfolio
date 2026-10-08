/**
 * REEM HUSSEIN - PROFESSIONAL PORTFOLIO SCRIPT
 * Vanilla JavaScript (ES6+) - Clean, Modular, Zero External Libraries
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Theme Management (Dark / Light Mode)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;
  const STORAGE_KEY = 'reem_portfolio_theme';

  // Initialize theme from localStorage or system preference
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      rootElement.setAttribute('data-theme', savedTheme);
    } else {
      // Default to dark theme for this technical portfolio
      rootElement.setAttribute('data-theme', 'dark');
    }
  }

  function toggleTheme() {
    const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    showToast(`Switched to ${newTheme} mode`);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  initTheme();

  /* ==========================================================================
     2. Mobile Navigation Drawer
     ========================================================================== */
  const navMenu = document.getElementById('nav-menu');
  const navToggleBtn = document.getElementById('nav-toggle');
  const navCloseBtn = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    if (navMenu) {
      navMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (navToggleBtn) navToggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileMenu() {
    if (navMenu) {
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
      if (navToggleBtn) navToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (navToggleBtn) {
    navToggleBtn.addEventListener('click', openMobileMenu);
  }

  if (navCloseBtn) {
    navCloseBtn.addEventListener('click', closeMobileMenu);
  }

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (
      navMenu &&
      navMenu.classList.contains('open') &&
      !navMenu.contains(event.target) &&
      navToggleBtn &&
      !navToggleBtn.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     3. Header Scroll Effect & Active Nav Link Tracking
     ========================================================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header shadow styling
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active navigation link tracking
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     4. Skills Filter
     ========================================================================== */
  const skillFilterBtns = document.querySelectorAll('[data-filter]');
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      skillCategoryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     5. Projects Filter
     ========================================================================== */
  const projectFilterBtns = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-project-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     6. Project Details Modal
     ========================================================================== */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalActionClose = document.getElementById('modal-action-close');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  // Exact data from verified project information
  const projectDetailsData = {
    'image-filters': {
      category: 'C++ Application',
      title: 'Image Filters Project',
      content: `
        <p><strong>Overview:</strong> Developed an image processing application implementing more than 5 filters, including grayscale, blur, crop, resize, and edge detection.</p>
        <p><strong>Core Capabilities:</strong> Implemented complete image loading, editing, and saving functionality with robust file handling in C++.</p>
        <h4>Key Technical Features:</h4>
        <ul>
          <li><strong>Grayscale Filter:</strong> Converts colored image data by computing weighted luminance for each pixel.</li>
          <li><strong>Blur Filter:</strong> Applies convolutional kernel smoothing across pixel neighborhoods for soft focus effects.</li>
          <li><strong>Crop & Resize:</strong> Dynamic matrix scaling and dimension trimming while preserving image aspect bounds.</li>
          <li><strong>Edge Detection:</strong> Highlights boundary transitions using algorithmic gradient analysis.</li>
          <li><strong>File I/O Safety:</strong> Verifies format integrity, memory allocation, and saves processed images to storage.</li>
        </ul>
        <h4>Applied Technologies:</h4>
        <p>C++, Algorithmic Pixel Operations, Matrix Transformations, File I/O.</p>
      `
    },
    'audio-player': {
      category: 'Desktop Application',
      title: 'Audio Player Project',
      content: `
        <p><strong>Overview:</strong> Developed a desktop audio player application using the JUCE framework in C++ featuring more than 5 core features.</p>
        <p><strong>Core Capabilities:</strong> Music playback, playlists, interactive progress bar, mute, and basic audio controls.</p>
        <h4>Key Technical Features:</h4>
        <ul>
          <li><strong>Audio Playback Engine:</strong> Reliable track loading, play, pause, and stop controls.</li>
          <li><strong>Playlist Management:</strong> Creating and queuing multiple audio tracks smoothly.</li>
          <li><strong>Interactive Progress Bar:</strong> Visual seek bar reflecting current playback timestamp with direct seeking support.</li>
          <li><strong>Volume & Mute Controls:</strong> Real-time gain adjustment and instant mute toggle functionality.</li>
          <li><strong>JUCE UI Components:</strong> Clean, responsive desktop graphical interface designed with modern audio engineering UX.</li>
        </ul>
        <h4>Applied Technologies:</h4>
        <p>JUCE C++ Framework, Audio Buffering, Desktop GUI Components, Event Listeners.</p>
      `
    },
    'game-projects': {
      category: 'C++ Game Development',
      title: 'Game Projects (Tic-Tac-Toe Variations)',
      content: `
        <p><strong>Overview:</strong> Developed multiple Tic-Tac-Toe variations in C++, including Infinity, Word, and 5x5 board versions.</p>
        <p><strong>Core Capabilities:</strong> Applied Object-Oriented Programming (OOP) concepts and implemented robust game logic with basic AI.</p>
        <h4>Key Technical Features:</h4>
        <ul>
          <li><strong>Infinity Tic-Tac-Toe:</strong> Moves expire after a defined cycle, demanding dynamic strategic adaptation.</li>
          <li><strong>Word Tic-Tac-Toe:</strong> Players place letters to form valid dictionary words rather than traditional markers.</li>
          <li><strong>5x5 Expanded Board:</strong> Extended grid variation with customized win conditions and larger state space.</li>
          <li><strong>OOP Architecture:</strong> Modular class hierarchies for game boards, player models, and game loops.</li>
          <li><strong>Basic AI Opponent:</strong> Implemented algorithmic evaluation to enable intelligent automated computer turns.</li>
        </ul>
        <h4>Applied Technologies:</h4>
        <p>C++, Object-Oriented Programming (OOP), Game Loop Architecture, Algorithmic Heuristics & AI.</p>
      `
    },
    'recipe-website': {
      category: 'Web Application',
      title: 'Recipe Website',
      content: `
        <p><strong>Overview:</strong> Developed a responsive website specifically designed for displaying dessert recipes with interactive UI elements.</p>
        <p><strong>Core Capabilities:</strong> Implemented interactive recipe cards and a styled user interface using pure HTML, CSS, and JavaScript.</p>
        <h4>Key Technical Features:</h4>
        <ul>
          <li><strong>Responsive Layout:</strong> Flawless display across smartphones, tablets, and desktop viewports.</li>
          <li><strong>Interactive Recipe Cards:</strong> Dynamic cards displaying preparation times, ingredients, and step-by-step instructions.</li>
          <li><strong>Styled UI:</strong> Cohesive visual aesthetics, elegant typography, and accessible color contrasts.</li>
          <li><strong>DOM Interaction:</strong> Vanilla JavaScript interactions for inspecting recipe information smoothly.</li>
        </ul>
        <h4>Applied Technologies:</h4>
        <p>HTML5, Modern CSS (Flexbox & Grid), Vanilla JavaScript, Responsive Design.</p>
      `
    }
  };

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data || !projectModal) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.content;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalActionClose) modalActionClose.addEventListener('click', closeModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  // Keyboard escape closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeModal();
    }
  });

  /* ==========================================================================
     7. Service Inquire Links (Pre-select service in Contact Form)
     ========================================================================== */
  const serviceInquireLinks = document.querySelectorAll('[data-service-select]');
  const contactServiceSelect = document.getElementById('contact-service');

  serviceInquireLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const selectedService = link.getAttribute('data-service-select');
      if (contactServiceSelect && selectedService) {
        contactServiceSelect.value = selectedService;
      }
    });
  });

  /* ==========================================================================
     8. Copy to Clipboard & Toast Notifications
     ========================================================================== */
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  function showToast(message, isSuccess = true) {
    if (!toast || !toastMessage) return;

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastMessage.textContent = message;
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for older environments
          const tempInput = document.createElement('textarea');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast(`Copied to clipboard: ${textToCopy}`);
      } catch (err) {
        showToast('Unable to copy automatically', false);
      }
    });
  });

  /* ==========================================================================
     9. Contact Form Client-side Validation & Submission
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setFieldError(inputElement, hasError) {
    const parentGroup = inputElement.closest('.form-group');
    if (parentGroup) {
      if (hasError) {
        parentGroup.classList.add('has-error');
      } else {
        parentGroup.classList.remove('has-error');
      }
    }
  }

  // Live input validation clear on typing
  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        setFieldError(input, false);
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim()) {
        setFieldError(nameInput, true);
        isValid = false;
      } else {
        setFieldError(nameInput, false);
      }

      // Validate email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        setFieldError(emailInput, true);
        isValid = false;
      } else {
        setFieldError(emailInput, false);
      }

      // Validate message
      if (!messageInput.value.trim()) {
        setFieldError(messageInput, true);
        isValid = false;
      } else {
        setFieldError(messageInput, false);
      }

      if (!isValid) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fix the highlighted fields above.';
        }
        return;
      }

      // Form is valid: simulate sending and generate direct mailto link
      const senderName = encodeURIComponent(nameInput.value.trim());
      const senderEmail = encodeURIComponent(emailInput.value.trim());
      const selectedService = encodeURIComponent(contactServiceSelect.value);
      const userMessage = encodeURIComponent(messageInput.value.trim());

      const mailtoSubject = encodeURIComponent(`Portfolio Inquiry: ${contactServiceSelect.value} from ${nameInput.value.trim()}`);
      const mailtoBody = encodeURIComponent(
        `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\nService/Topic: ${contactServiceSelect.value}\n\nMessage:\n${messageInput.value.trim()}`
      );

      // Visual feedback
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';
      }

      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong>Thank you, ${nameInput.value.trim()}!</strong> Your message has been prepared.<br>
            <span style="font-size: 0.85rem;">Click <a href="mailto:20240205@stud.fci-cu.edu.eg?subject=${mailtoSubject}&body=${mailtoBody}" style="color: inherit; text-decoration: underline; font-weight: bold;">here to send directly via your email client</a>.</span>
          `;
        }

        showToast('Message ready! You can also email directly.', true);
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Send Message';
        }
      }, 700);
    });
  }
});

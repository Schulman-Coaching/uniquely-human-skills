// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    // Initialize all functionality
    initSmoothScrolling();
    initFAQAccordion();
    initButtonInteractions();
    initNavigation();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        const answer = item.querySelector('.faq-item__answer');
        
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-item__question');
                    const otherAnswer = otherItem.querySelector('.faq-item__answer');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                answer.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('active');
            }
        });
    });
}

// Button interactions and tracking
function initButtonInteractions() {
    console.log('Initializing button interactions...');
    const ctaButtons = document.querySelectorAll('.btn');
    console.log('Found buttons:', ctaButtons.length);
    
    ctaButtons.forEach((button, index) => {
        console.log('Setting up button', index, button.textContent.trim());
        button.addEventListener('click', function(e) {
            console.log('Button clicked:', this.textContent.trim());
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle specific button actions
            const buttonText = this.textContent.trim();
            
            switch(buttonText) {
                case 'Start Your Transformation':
                case 'Enroll Your Team Today':
                case 'Start Your Journey':
                    console.log('Handling enrollment');
                    handleEnrollment(this);
                    break;
                case 'Download Program Guide':
                    console.log('Handling download');
                    handleDownload(this);
                    break;
                case 'Select This Track':
                    console.log('Handling track selection');
                    handleTrackSelection(this);
                    break;
                case 'Schedule a Strategy Call':
                case 'Contact Us':
                    console.log('Handling contact');
                    handleContactRequest(this);
                    break;
                case 'Get Started':
                    console.log('Scrolling to investment');
                    scrollToSection('#investment');
                    break;
                default:
                    console.log('No handler for button:', buttonText);
            }
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn--outline')) {
                this.style.boxShadow = 'var(--shadow-lg)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Navigation scroll effect
function initNavigation() {
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background opacity on scroll
        if (scrollTop > 100) {
            nav.style.backgroundColor = 'rgba(255, 255, 253, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.backgroundColor = 'var(--color-surface)';
            nav.style.backdropFilter = 'none';
        }
    });
}

// Handle enrollment process
function handleEnrollment(button) {
    console.log('Creating enrollment modal');
    showModal('Enrollment', `
        <h3>Ready to Transform Your Team?</h3>
        <p>Let's discuss which track is right for your organization.</p>
        <form class="enrollment-form">
            <div class="form-group">
                <label class="form-label" for="company">Company Name</label>
                <input type="text" id="company" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="name">Your Name</label>
                <input type="text" id="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="email">Email Address</label>
                <input type="email" id="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="track">Preferred Track</label>
                <select id="track" class="form-control" required>
                    <option value="">Select a track...</option>
                    <option value="intact-team">Intact Team Track</option>
                    <option value="leadership-community">Leadership Community Track</option>
                    <option value="unsure">Not sure yet</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label" for="team-size">Team Size</label>
                <select id="team-size" class="form-control" required>
                    <option value="">Select team size...</option>
                    <option value="3-5">3-5 people</option>
                    <option value="6-8">6-8 people</option>
                    <option value="9-15">9-15 people</option>
                    <option value="15+">15+ people</option>
                </select>
            </div>
            <button type="submit" class="btn btn--primary btn--full-width">Submit Application</button>
        </form>
    `);
}

// Handle download request
function handleDownload(button) {
    console.log('Creating download modal');
    showModal('Download Program Guide', `
        <h3>Get Your Free Program Guide</h3>
        <p>Enter your details to receive our comprehensive program guide and pricing information.</p>
        <form class="download-form">
            <div class="form-group">
                <label class="form-label" for="download-name">Name</label>
                <input type="text" id="download-name" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="download-email">Email Address</label>
                <input type="email" id="download-email" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="download-company">Company (Optional)</label>
                <input type="text" id="download-company" class="form-control">
            </div>
            <button type="submit" class="btn btn--primary btn--full-width">Download Guide</button>
        </form>
    `);
}

// Handle track selection
function handleTrackSelection(button) {
    console.log('Creating track selection modal');
    const trackCard = button.closest('.track-card');
    const trackTitle = trackCard.querySelector('.track-card__title').textContent;
    
    // Highlight selected track
    document.querySelectorAll('.track-card').forEach(card => {
        card.classList.remove('selected');
    });
    trackCard.classList.add('selected');
    
    // Show track-specific enrollment
    showModal(`Selected: ${trackTitle}`, `
        <h3>Great Choice!</h3>
        <p>You've selected the <strong>${trackTitle}</strong>. Let's get you started.</p>
        <form class="track-enrollment-form">
            <div class="form-group">
                <label class="form-label" for="track-name">Your Name</label>
                <input type="text" id="track-name" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="track-email">Email Address</label>
                <input type="email" id="track-email" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="track-phone">Phone Number</label>
                <input type="tel" id="track-phone" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="track-company">Company/Organization</label>
                <input type="text" id="track-company" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="track-role">Your Role</label>
                <input type="text" id="track-role" class="form-control" required>
            </div>
            <button type="submit" class="btn btn--primary btn--full-width">Continue Enrollment</button>
        </form>
    `);
}

// Handle contact requests
function handleContactRequest(button) {
    console.log('Creating contact modal');
    showModal('Contact Us', `
        <h3>Let's Talk</h3>
        <p>Schedule a call to discuss how we can help transform your team.</p>
        <form class="contact-form">
            <div class="form-group">
                <label class="form-label" for="contact-name">Name</label>
                <input type="text" id="contact-name" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="contact-email">Email Address</label>
                <input type="email" id="contact-email" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="contact-company">Company</label>
                <input type="text" id="contact-company" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="contact-message">How can we help?</label>
                <textarea id="contact-message" class="form-control" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn--primary btn--full-width">Send Message</button>
        </form>
        <div style="margin-top: var(--space-24); padding-top: var(--space-24); border-top: 1px solid var(--color-border);">
            <p><strong>Or contact us directly:</strong></p>
            <p>📧 hello@uniquelyhumanskills.com</p>
            <p>📞 (555) 123-4567</p>
        </div>
    `);
}

// Utility function to show modal - Simplified approach
function showModal(title, content) {
    console.log('showModal called with title:', title);
    
    // Remove existing modal
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '2000';
    
    modal.innerHTML = `
        <div class="modal__content" style="
            background: var(--color-surface);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        ">
            <div class="modal__header" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: var(--space-24);
                border-bottom: 1px solid var(--color-border);
            ">
                <h2 class="modal__title" style="margin: 0; color: var(--color-text);">${title}</h2>
                <button class="modal__close" aria-label="Close modal" style="
                    background: none;
                    border: none;
                    font-size: var(--font-size-3xl);
                    color: var(--color-text-secondary);
                    cursor: pointer;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-sm);
                ">×</button>
            </div>
            <div class="modal__body" style="padding: var(--space-24);">
                ${content}
            </div>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(modal);
    console.log('Modal added to DOM');
    
    // Handle modal close
    const closeBtn = modal.querySelector('.modal__close');
    const overlay = modal;
    
    function closeModal(e) {
        if (e.target === overlay || e.target === closeBtn) {
            console.log('Closing modal');
            modal.remove();
            document.body.style.overflow = '';
        }
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Handle escape key
    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal({ target: overlay });
            document.removeEventListener('keydown', handleEscape);
        }
    }
    document.addEventListener('keydown', handleEscape);
    
    // Handle form submission
    const form = modal.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, modal);
        });
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    console.log('Modal setup complete');
}

// Handle form submissions
function handleFormSubmission(form, modal) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        modal.querySelector('.modal__body').innerHTML = `
            <div style="text-align: center; padding: var(--space-32);">
                <div style="font-size: 48px; margin-bottom: var(--space-16);">✅</div>
                <h3 style="color: var(--color-success); margin-bottom: var(--space-16);">Thank You!</h3>
                <p>We've received your information and will contact you within 24 hours.</p>
                <button class="btn btn--primary" onclick="this.closest('.modal').remove(); document.body.style.overflow = '';">Close</button>
            </div>
        `;
    }, 1500);
}

// Utility function to scroll to section
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const headerHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}
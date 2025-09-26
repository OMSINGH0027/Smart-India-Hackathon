// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', mobileMenu);
        
        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(n => {
            n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    function mobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.overview-card, .feature-item, .step, .team-member, .arch-layer, .endpoint'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Typing animation for hero chat demo
    const typingMessage = document.querySelector('.typing');
    if (typingMessage) {
        setTimeout(() => {
            typingMessage.classList.remove('typing');
            typingMessage.querySelector('.message-content').innerHTML = 
                'The library is open from 8:00 AM to 10:00 PM on weekdays.';
        }, 3000);
    }
    
    // Interactive demo chat functionality
    let demoMessages = [
        { type: 'bot', text: 'Hello! How can I help you today?' },
        { type: 'user', text: 'What are the admission requirements?' },
        { type: 'bot', text: 'For admission, you need to meet the eligibility criteria and clear the entrance exam.' },
        { type: 'user', text: 'Tell me about campus facilities' },
        { type: 'bot', text: 'Our campus has state-of-the-art labs, library, sports complex, and hostels.' }
    ];
    
    let currentMessageIndex = 0;
    
    function addDemoMessage() {
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages && currentMessageIndex < demoMessages.length) {
            const message = demoMessages[currentMessageIndex];
            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.type}-message`;
            messageElement.innerHTML = `<div class="message-content">${message.text}</div>`;
            
            // Remove typing indicator if it exists
            const typingIndicator = chatMessages.querySelector('.typing');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            currentMessageIndex++;
            
            // Add typing indicator for next bot message
            if (currentMessageIndex < demoMessages.length && 
                demoMessages[currentMessageIndex].type === 'bot') {
                setTimeout(() => {
                    const typingElement = document.createElement('div');
                    typingElement.className = 'message bot-message typing';
                    typingElement.innerHTML = `
                        <div class="message-content">
                            <div class="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    `;
                    chatMessages.appendChild(typingElement);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    setTimeout(addDemoMessage, 2000);
                }, 1000);
            } else if (currentMessageIndex < demoMessages.length) {
                setTimeout(addDemoMessage, 3000);
            } else {
                // Reset demo after all messages
                setTimeout(() => {
                    chatMessages.innerHTML = `
                        <div class="message bot-message">
                            <div class="message-content">Hello! How can I help you today?</div>
                        </div>
                        <div class="message user-message">
                            <div class="message-content">What are the library timings?</div>
                        </div>
                        <div class="message bot-message typing">
                            <div class="message-content">
                                <div class="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    `;
                    currentMessageIndex = 2;
                    setTimeout(addDemoMessage, 3000);
                }, 5000);
            }
        }
    }
    
    // Start demo chat cycle
    setTimeout(() => {
        currentMessageIndex = 2; // Start after initial messages
        addDemoMessage();
    }, 5000);
    
    // Copy code functionality
    document.querySelectorAll('pre code').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s ease;
        `;
        
        button.addEventListener('mouseenter', () => {
            button.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
        
        block.parentElement.style.position = 'relative';
        block.parentElement.appendChild(button);
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Add CSS for active nav link
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-color) !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
    
    // Statistics counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(progress * target);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // API endpoint testing functionality
    const testButtons = document.querySelectorAll('.test-endpoint');
    testButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const endpoint = button.dataset.endpoint;
            const method = button.dataset.method;
            
            try {
                button.textContent = 'Testing...';
                button.disabled = true;
                
                const response = await fetch(endpoint, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: method === 'POST' ? JSON.stringify({
                        message: 'Hello from documentation test'
                    }) : undefined
                });
                
                const result = await response.json();
                
                // Show result in a modal or alert
                alert(`Response: ${JSON.stringify(result, null, 2)}`);
                
            } catch (error) {
                alert(`Error: ${error.message}`);
            } finally {
                button.textContent = 'Test Endpoint';
                button.disabled = false;
            }
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Search functionality for documentation
    const searchInput = document.querySelector('#doc-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const searchableElements = document.querySelectorAll('h2, h3, p, li');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                const parent = element.closest('section');
                
                if (text.includes(query) || query === '') {
                    element.style.display = '';
                    if (parent) parent.style.display = '';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', 
                document.body.classList.contains('dark-theme') ? 'dark' : 'light'
            );
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
    
    // Print functionality
    const printButton = document.querySelector('#print-docs');
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--gradient);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Console welcome message
    console.log(`
    🚀 Smart India Hackathon Documentation
    
    Welcome to the project documentation!
    
    GitHub Repository: https://github.com/OMSINGH0027/Smart-India-Hackathon
    
    Built with ❤️ for innovation
    `);
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`Page load time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});
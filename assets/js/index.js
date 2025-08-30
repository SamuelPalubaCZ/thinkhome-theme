/**
 * ThinkHome Ghost Theme JavaScript
 * Terminal-inspired interactions and functionality
 */

// Import CSS
import "../css/index.css";

// Import existing JS modules
import menuOpen from "./menuOpen";
import infiniteScroll from "./infiniteScroll";

// Theme initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    menuOpen();
    infiniteScroll();
    
    // Initialize new terminal-inspired features
    initSearch();
    initThemeToggle();
    initScrollEffects();
    initCodeBlocks();
    initKeyboardNavigation();
    initTerminalEffects();
});

/**
 * Search functionality
 */
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchInput = document.querySelector('.search-input');
    const searchClose = document.querySelector('.search-close');
    const body = document.body;

    if (!searchToggle) return;

    searchToggle.addEventListener('click', function() {
        if (searchOverlay) {
            searchOverlay.classList.add('active');
            body.classList.add('search-open');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        }
    });

    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    // Close search on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });

    function closeSearch() {
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            body.classList.remove('search-open');
            if (searchInput) {
                searchInput.value = '';
            }
        }
    }
}

/**
 * Theme toggle functionality (dark/light mode)
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleText(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleText(newTheme);
    });

    function updateThemeToggleText(theme) {
        const toggleText = themeToggle.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
        }
    }
}

/**
 * Scroll effects and progress indicator
 */
function initScrollEffects() {
    const progressBar = document.querySelector('.reading-progress');
    const header = document.querySelector('.site-header');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxHeight) * 100;
            
            progressBar.style.width = Math.min(progress, 100) + '%';
        });
    }

    // Header scroll behavior
    if (header) {
        let lastScrollY = window.pageYOffset;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.pageYOffset;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

/**
 * Code block enhancements
 */
function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(block) {
        const pre = block.parentElement;
        
        // Add copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy';
        copyButton.innerHTML = 'copy';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        
        copyButton.addEventListener('click', function() {
            const text = block.textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    copyButton.innerHTML = 'copied!';
                    setTimeout(() => {
                        copyButton.innerHTML = 'copy';
                    }, 2000);
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                copyButton.innerHTML = 'copied!';
                setTimeout(() => {
                    copyButton.innerHTML = 'copy';
                }, 2000);
            }
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });
}

/**
 * Keyboard navigation enhancements
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Skip if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch(e.key) {
            case '/':
                e.preventDefault();
                const searchToggle = document.querySelector('.search-toggle');
                if (searchToggle) searchToggle.click();
                break;
                
            case 'h':
                e.preventDefault();
                window.location.href = '/';
                break;
                
            case 'r':
                e.preventDefault();
                window.location.reload();
                break;
        }
    });
}

/**
 * Terminal-style effects and animations
 */
function initTerminalEffects() {
    // Add cursor blink effect to elements with terminal-cursor class
    const cursorElements = document.querySelectorAll('.terminal-cursor');
    cursorElements.forEach(function(element) {
        setInterval(function() {
            element.style.opacity = element.style.opacity === '0' ? '1' : '0';
        }, 500);
    });

    // Typing effect for specific elements
    const typeElements = document.querySelectorAll('[data-type-text]');
    typeElements.forEach(function(element) {
        const text = element.getAttribute('data-type-text');
        const speed = parseInt(element.getAttribute('data-type-speed')) || 50;
        
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start typing when element comes into view
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

/**
 * Utility functions
 */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to element
function scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Expose utilities globally for theme customization
window.ThinkHome = {
    debounce: debounce,
    scrollToElement: scrollToElement,
    isInViewport: isInViewport
};

/**
 * Service Worker registration for offline functionality
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
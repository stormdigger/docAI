// Advanced GSAP Animations
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initGSAPAnimations();
});

function initGSAPAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline({ delay: 3.5 }); // Wait for loading screen
    
    heroTimeline
        .from('.greeting', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power3.out' 
        })
        .from('.name', { 
            duration: 1.2, 
            y: 80, 
            opacity: 0, 
            ease: 'power3.out' 
        }, '-=0.7')
        .from('.title-highlight', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power3.out' 
        }, '-=0.5')
        .from('.hero-description', { 
            duration: 1, 
            y: 30, 
            opacity: 0, 
            ease: 'power2.out' 
        }, '-=0.3')
        .from('.hero-buttons .btn', { 
            duration: 0.8, 
            y: 30, 
            opacity: 0, 
            stagger: 0.2, 
            ease: 'back.out(1.7)' 
        }, '-=0.2')
        .from('.avatar-container', { 
            duration: 1.5, 
            scale: 0.5, 
            opacity: 0, 
            rotation: 180, 
            ease: 'elastic.out(1, 0.5)' 
        }, '-=1');

    // Floating icons animation
    gsap.to('.floating-icons i', {
        duration: 3,
        rotation: 360,
        repeat: -1,
        ease: 'none',
        stagger: 0.5
    });

    // Section reveal animations
    gsap.utils.toArray('section').forEach((section, index) => {
        if (section.id === 'home') return; // Skip hero section
        
        gsap.from(section.querySelectorAll('.section-title'), {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Skills bars animation
    gsap.utils.toArray('.skill-progress').forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        gsap.fromTo(bar, 
            { width: '0%' },
            {
                width: width,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Project cards stagger animation
    gsap.from('.project-card', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Achievement cards animation
    gsap.from('.achievement-card', {
        duration: 1,
        scale: 0.5,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.achievements-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Contact form animation
    gsap.from('.contact-form .form-group', {
        duration: 0.8,
        x: -50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Parallax effects
    gsap.utils.toArray('.parallax-element').forEach(element => {
        gsap.to(element, {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Navbar logo animation
    gsap.to('.logo-orbit', {
        duration: 10,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });

    // Add hover animations for interactive elements
    addHoverAnimations();
    
    // Text reveal animation
    addTextRevealAnimations();
    
    // Add morphing background animation
    addMorphingBackgroundAnimation();
    
    // Add scroll-based animations
    addScrollAnimations();
}

function addHoverAnimations() {
    // Button hover effects
    gsap.utils.toArray('.btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
            
            gsap.to(button.querySelector('i'), {
                duration: 0.3,
                x: 5,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
            
            gsap.to(button.querySelector('i'), {
                duration: 0.3,
                x: 0,
                ease: 'power2.out'
            });
        });
    });

    // Skill category hover effects
    gsap.utils.toArray('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', () => {
            gsap.to(category, {
                duration: 0.4,
                y: -15,
                boxShadow: '0 30px 60px rgba(0, 212, 255, 0.4)',
                ease: 'power2.out'
            });
            
            gsap.to(category.querySelector('.category-header i'), {
                duration: 0.3,
                rotation: 360,
                scale: 1.2,
                ease: 'power2.out'
            });
        });
        
        category.addEventListener('mouseleave', () => {
            gsap.to(category, {
                duration: 0.4,
                y: 0,
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
                ease: 'power2.out'
            });
            
            gsap.to(category.querySelector('.category-header i'), {
                duration: 0.3,
                rotation: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Achievement card hover effects
    gsap.utils.toArray('.achievement-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.achievement-icon'), {
                duration: 0.3,
                rotation: 10,
                scale: 1.1,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.achievement-icon'), {
                duration: 0.3,
                rotation: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Social links hover effect
    gsap.utils.toArray('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                duration: 0.3,
                y: -5,
                rotation: 15,
                scale: 1.1,
                ease: 'back.out(1.7)'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                duration: 0.3,
                y: 0,
                rotation: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Project card hover effects
    gsap.utils.toArray('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.4,
                y: -15,
                scale: 1.02,
                rotationY: 5,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.project-image'), {
                duration: 0.4,
                scale: 1.1,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.4,
                y: 0,
                scale: 1,
                rotationY: 0,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.project-image'), {
                duration: 0.4,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Contact item hover effects
    gsap.utils.toArray('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.3,
                x: 15,
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                ease: 'power2.out'
            });
            
            gsap.to(item.querySelector('.contact-icon'), {
                duration: 0.3,
                rotation: 360,
                scale: 1.1,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                x: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                ease: 'power2.out'
            });
            
            gsap.to(item.querySelector('.contact-icon'), {
                duration: 0.3,
                rotation: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

function addTextRevealAnimations() {
    // Split text animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const chars = heroTitle.textContent.split('');
        heroTitle.innerHTML = chars.map(char => 
            `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        gsap.from('.char', {
            duration: 0.1,
            opacity: 0,
            y: 50,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 4
        });
    }

    // Section title reveals
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Paragraph text reveals
    gsap.utils.toArray('p').forEach(paragraph => {
        gsap.from(paragraph, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: paragraph,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

function addMorphingBackgroundAnimation() {
    // Create animated gradient background
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        gsap.to(heroSection, {
            duration: 20,
            backgroundPosition: '200% 0%',
            ease: 'none',
            repeat: -1,
            yoyo: true
        });
    }

    // Animate floating elements
    gsap.utils.toArray('.floating-icons i').forEach((icon, index) => {
        gsap.to(icon, {
            duration: 4 + index,
            y: '-=' + (20 + index * 10),
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    });
}

function addScrollAnimations() {
    // Parallax scrolling for different elements
    gsap.to('.hero-avatar', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Scale effect on scroll
    gsap.to('.section-line', {
        scaleX: 0,
        transformOrigin: 'right center',
        ease: 'none',
        scrollTrigger: {
            trigger: '.section-line',
            start: 'top 80%',
            end: 'top 20%',
            scrub: true
        }
    });

    // Rotation effect on scroll
    gsap.to('.logo-orbit', {
        rotation: 720,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });

    // Progress bar animation based on scroll
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #00d4ff, #4ecdc4);
        z-index: 10001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    gsap.to(progressBar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });
}

// Custom cursor animation
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0,212,255,0.8) 0%, rgba(0,212,255,0) 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: difference;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            duration: 0.3,
            x: e.clientX - 10,
            y: e.clientY - 10,
            ease: 'power2.out'
        });
    });

    // Cursor interactions
    document.querySelectorAll('a, button, .project-card, .skill-category').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                duration: 0.3,
                scale: 2,
                backgroundColor: 'rgba(78,205,196,0.8)',
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                duration: 0.3,
                scale: 1,
                backgroundColor: 'rgba(0,212,255,0.8)',
                ease: 'power2.out'
            });
        });
    });
}

// Initialize custom cursor when DOM is ready
document.addEventListener('DOMContentLoaded', initCustomCursor);

// Scroll-triggered animations for stats
gsap.utils.toArray('.stat-number').forEach(stat => {
    const finalValue = parseInt(stat.textContent);
    stat.textContent = '0';
    
    gsap.to(stat, {
        innerHTML: finalValue,
        duration: 2,
        ease: 'power2.out',
        snap: { innerHTML: 1 },
        scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Loading screen animation enhancement
gsap.to('.loading-cube', {
    duration: 2,
    rotationX: 360,
    rotationY: 360,
    repeat: -1,
    ease: 'none'
});

gsap.to('.loading-progress', {
    duration: 3,
    width: '100%',
    ease: 'power2.out'
});

// Magnetic effect for buttons
gsap.utils.toArray('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
            duration: 0.3,
            x: x * 0.1,
            y: y * 0.1,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            duration: 0.5,
            x: 0,
            y: 0,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// Enhanced form animations
gsap.utils.toArray('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input.parentNode.querySelector('label'), {
            duration: 0.3,
            y: -25,
            scale: 0.8,
            color: '#00d4ff',
            ease: 'power2.out'
        });
        
        gsap.to(input.parentNode.querySelector('.form-bar'), {
            duration: 0.3,
            scaleX: 1,
            transformOrigin: 'left',
            ease: 'power2.out'
        });
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            gsap.to(input.parentNode.querySelector('label'), {
                duration: 0.3,
                y: 0,
                scale: 1,
                color: '#a0a0a0',
                ease: 'power2.out'
            });
        }
        
        gsap.to(input.parentNode.querySelector('.form-bar'), {
            duration: 0.3,
            scaleX: 0,
            transformOrigin: 'right',
            ease: 'power2.out'
        });
    });
});

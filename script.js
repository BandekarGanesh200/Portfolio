class EnhancedPortfolio {
            constructor() {
                this.init();
            }

            init() {
                this.setupLoadingScreen();
                this.setupScrollEffects();
                this.setupNavigation();
                this.setupAnimations();
                this.setupPerformance();
            }

            setupLoadingScreen() {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        document.getElementById('loadingScreen').classList.add('hidden');
                    }, 1500);
                });
            }

            setupScrollEffects() {
                
                window.addEventListener('scroll', () => {
                    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                    document.getElementById('scrollProgress').style.width = scrolled + '%';
                });

                
                window.addEventListener('scroll', () => {
                    const navbar = document.getElementById('navbar');
                    if (window.pageYOffset > 100) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                });

               
                window.addEventListener('scroll', () => {
                    const scrolled = window.pageYOffset;
                    const particles = document.querySelectorAll('.particle');
                    
                    particles.forEach((particle, index) => {
                        const speed = (index + 1) * 0.5;
                        particle.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                });
            }

            setupNavigation() {
                
                document.querySelectorAll('.nav-link').forEach(anchor => {
                    anchor.addEventListener('click', (e) => {
                        e.preventDefault();
                        const target = document.querySelector(anchor.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start' 
                            });
                        }

                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                        });
                        anchor.classList.add('active');

                        
                        document.getElementById('navLinks').classList.remove('active');
                    });
                });

                
                window.addEventListener('scroll', () => {
                    const sections = document.querySelectorAll('section[id]');
                    const navLinks = document.querySelectorAll('.nav-link');
                    
                    let current = '';
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop - 150;
                        if (window.pageYOffset >= sectionTop) {
                            current = section.getAttribute('id');
                        }
                    });

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${current}`) {
                            link.classList.add('active');
                        }
                    });
                });
            }

            setupAnimations() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                        }
                    });
                }, observerOptions);

                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    observer.observe(el);
                });

                const projectItems = document.querySelectorAll('.project-item');
                projectItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.2}s`;
                });

                const contactItems = document.querySelectorAll('.contact-details li');
                contactItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`;
                });
            }

            setupPerformance() {
               
                let ticking = false;
                const scrollHandler = () => {
                    if (!ticking) {
                        requestAnimationFrame(() => {
                            
                            ticking = false;
                        });
                        ticking = true;
                    }
                };

                window.addEventListener('scroll', scrollHandler);

                const images = document.querySelectorAll('img[loading="lazy"]');
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.classList.add('fade-in');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            }
        }

        function toggleMenu() {
            const navLinks = document.getElementById("navLinks");
            navLinks.classList.toggle("active");
        }

        
        document.addEventListener('DOMContentLoaded', () => {
            new EnhancedPortfolio();

            const style = document.createElement('style');
            style.textContent = `
                .animate {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                
                .fade-in {
                    opacity: 1;
                    transition: opacity 0.6s ease;
                }
            `;
            document.head.appendChild(style);
        });

        
        document.addEventListener('mousemove', (e) => {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #f4b400;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 3}px;
                top: ${e.clientY - 3}px;
                opacity: 1;
                transition: opacity 0.5s ease;
            `;
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.style.opacity = '0';
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 500);
            }, 100);
        });

       
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        
        const keyboardStyle = document.createElement('style');
        keyboardStyle.textContent = `
            .keyboard-navigation button:focus,
            .keyboard-navigation a:focus {
                outline: 2px solid #f4b400 !important;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(keyboardStyle);
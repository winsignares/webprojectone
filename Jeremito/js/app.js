// Verificar que el archivo se está cargando
console.log('App.js cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando funcionalidades...');
    
    try {
        // Smooth scrolling para enlaces de navegación
        const navLinks = document.querySelectorAll('.nav-link');
        console.log('Enlaces de navegación encontrados:', navLinks.length);
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar transparente que se vuelve sólido al hacer scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                } else {
                    navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                }
            });
        }

        // Animación de aparición al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal', 'active');
                }
            });
        }, observerOptions);

        // Observar elementos para animación (actualizado para timeline)
        const elementsToObserve = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
        console.log('Elementos a observar encontrados:', elementsToObserve.length);
        
        elementsToObserve.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });

        // Efecto parallax suave SOLO para el hero (no para otras secciones)
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            if (heroSection && scrolled <= window.innerHeight) {
                // Solo aplicar parallax dentro del viewport del hero
                heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        // Animación de contador para habilidades
        function animateCounters() {
            const counters = document.querySelectorAll('.skill-item');
            counters.forEach(counter => {
                const target = counter.textContent;
                let current = 0;
                const increment = target.length / 50;
                
                const updateCounter = () => {
                    if (current < target.length) {
                        current += increment;
                        counter.textContent = target.substring(0, Math.ceil(current));
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }

        // Ejecutar animación de contadores cuando las habilidades sean visibles
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            const skillsObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            skillsObserver.observe(skillsSection);
        }

        // Efecto de escritura para el título principal
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Aplicar efecto de escritura al título principal
        const mainTitle = document.querySelector('.hero-content h1');
        if (mainTitle) {
            const originalText = mainTitle.textContent;
            typeWriter(mainTitle, originalText, 150);
        }

        // Animación de partículas flotantes en el hero
        function createFloatingParticles() {
            const heroSection = document.querySelector('.hero-section');
            if (!heroSection) return;

            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 10 + 10}s infinite linear;
                    pointer-events: none;
                `;
                heroSection.appendChild(particle);
            }
        }

        // Crear partículas flotantes
        createFloatingParticles();

        // Efecto hover para las tarjetas de proyectos
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Animación de carga para elementos (actualizado para timeline)
        function addLoadingAnimation() {
            const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('loading');
                }, index * 200);
            });
        }

        // Ejecutar animación de carga después de un pequeño delay
        setTimeout(addLoadingAnimation, 500);

        // Efecto de resaltado para el navbar activo
        function highlightActiveNavItem() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (window.scrollY >= (sectionTop - 200)) {
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

        highlightActiveNavItem();

        // Efecto de vibración para botones
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            });
        });

        // Función para mostrar/ocultar elementos con fade
        function fadeInOut(element, show = true) {
            if (show) {
                element.style.opacity = '0';
                element.style.display = 'block';
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 10);
            } else {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.display = 'none';
                }, 300);
            }
        }

        // Efecto de scroll suave para el botón de scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }

        // Animación de entrada para elementos del hero
        function animateHeroElements() {
            const heroElements = document.querySelectorAll('.hero-content > *');
            heroElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    el.style.transition = 'all 0.8s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 300);
            });
        }

        // Ejecutar animación del hero
        setTimeout(animateHeroElements, 100);

        // Efecto de hover para las habilidades
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
        });

        // Función para agregar clase activa al navbar en scroll
        function updateActiveNavOnScroll() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNavOnScroll);

        // Efecto de aparición gradual para elementos
        function revealOnScroll() {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', revealOnScroll);

        console.log('Todas las funcionalidades inicializadas correctamente');
        
    } catch (error) {
        console.error('Error al inicializar las funcionalidades:', error);
    }
});

// Agregar estilos CSS adicionales para las animaciones
const additionalStyles = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        100% { transform: translateY(0px) rotate(360deg); }
    }
    
    .nav-link.active {
        color: #007bff !important;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .floating-particle {
        z-index: 1;
    }
`;

// Insertar estilos adicionales
try {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
    console.log('Estilos adicionales agregados correctamente');
} catch (error) {
    console.error('Error al agregar estilos adicionales:', error);
}

console.log('Portfolio cargado exitosamente! 🚀');

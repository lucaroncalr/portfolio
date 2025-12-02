// ==================== ANIMATIONS ON SCROLL ==================== 
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
});

// ==================== THEME TOGGLE ==================== 
const themeBtn = document.getElementById('theme-btn');
const htmlElement = document.documentElement;
const body = document.body;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateThemeIcon();
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeBtn.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ==================== TYPING EFFECT ==================== 
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ==================== SMOOTH SCROLL ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ACTIVE SECTION HIGHLIGHT ==================== 
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ==================== PARALLAX EFFECT ==================== 
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const decorations = document.querySelectorAll('.decoration-dot');
    
    if (hero) {
        const scrolled = window.scrollY;
        decorations.forEach((dot, index) => {
            dot.style.transform = `translateY(${scrolled * 0.3 * (index + 1)}px)`;
        });
    }
});

// ==================== CARD CLICK RIPPLE EFFECT ==================== 
document.querySelectorAll('.service-card, .project-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ==================== INTERACTIVE TECH STACK ==================== 
document.querySelectorAll('.tech-stack li').forEach(tech => {
    tech.addEventListener('click', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ==================== PERFORMANCE OPTIMIZATION ==================== 
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ==================== PROJECTS PAGE LOADER ==================== 
function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return; // Only run on projects page

    const currentLang = document.documentElement.lang || 'it';

    fetch('./data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            container.innerHTML = ''; // Clear loading state

            if (!data.projects || data.projects.length === 0) {
                container.innerHTML = '<p class="no-projects">Nessun progetto trovato</p>';
                return;
            }

            data.projects.forEach((project, index) => {
                const projectData = project[currentLang] || project.it;
                const categoryBadge = project.category;
                
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.setAttribute('data-aos', 'fade-up');
                projectCard.setAttribute('data-aos-delay', (index * 100).toString());
                projectCard.innerHTML = `
                    <div class="card-glow"></div>
                    <div class="project-image">
                        <img src="${project.image}" alt="${projectData.title}">
                        <div class="project-overlay">
                            <span class="badge">${categoryBadge}</span>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3>${projectData.title}</h3>
                        <p>${projectData.description}</p>
                        <div class="project-meta">
                            <span class="year"><i class="fas fa-calendar"></i> ${project.year}</span>
                            <span class="clients"><i class="fas fa-building"></i> ${project.clients.join(', ')}</span>
                        </div>
                        <div class="project-buttons">
                            <a href="${project.caseStudyUrl}" class="btn btn-secondary"><i class="fas fa-file-alt"></i> Case Study</a>
                            ${project.externalLink ? `<a href="${project.externalLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Vedi Progetto</a>` : ''}
                        </div>
                    </div>
                `;
                container.appendChild(projectCard);
            });

            // Reinitialize AOS animations
            AOS.refresh();
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            container.innerHTML = '<p class="error">Errore nel caricamento dei progetti</p>';
        });
}

// Load projects when page is ready
document.addEventListener('DOMContentLoaded', loadProjects);

// ==================== FEATURED PROJECTS LOADER (Homepage) ==================== 
function loadFeaturedProjects() {
    const container = document.getElementById('featured-projects-container');
    if (!container) return; // Only run on homepage

    const currentLang = document.documentElement.lang || 'it';

    fetch('./data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            container.innerHTML = ''; // Clear existing content

            if (!data.projects || data.projects.length === 0) {
                container.innerHTML = '<p class="no-projects">Nessun progetto trovato</p>';
                return;
            }

            // Filter only featured projects
            const featuredProjects = data.projects.filter(p => p.featured);

            featuredProjects.forEach((project, index) => {
                const projectData = project[currentLang] || project.it;
                const categoryBadge = project.category;
                
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.setAttribute('data-aos', 'fade-up');
                projectCard.setAttribute('data-aos-delay', (index * 100).toString());
                projectCard.innerHTML = `
                    <div class="card-glow"></div>
                    <div class="project-image">
                        <img src="${project.image}" alt="${projectData.title}">
                        <div class="project-overlay">
                            <span class="badge">${categoryBadge}</span>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3>${projectData.title}</h3>
                        <p>${projectData.description}</p>
                        <div class="project-buttons">
                            <a href="${project.caseStudyUrl}" class="btn btn-secondary"><i class="fas fa-file-alt"></i> Case Study</a>
                            ${project.externalLink ? `<a href="${project.externalLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Vedi Progetto</a>` : ''}
                        </div>
                    </div>
                `;
                container.appendChild(projectCard);
            });

            // Reinitialize AOS animations
            AOS.refresh();
        })
        .catch(error => {
            console.error('Error loading featured projects:', error);
            container.innerHTML = '<p class="error">Errore nel caricamento dei progetti</p>';
        });
}

// Load featured projects on homepage
document.addEventListener('DOMContentLoaded', loadFeaturedProjects);

console.log('Portfolio loaded successfully! 🚀');


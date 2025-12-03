// ==================== ANIMATIONS ON SCROLL ==================== 
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
});

// ==================== THEME TOGGLE ==================== 
const themeBtn = document.getElementById('theme-btn');
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

// ==================== PROJECTS LOADER ==================== 
/**
 * Genera l'HTML di una project card
 * @param {Object} project - Dati del progetto
 * @param {number} index - Indice per animazione delay
 * @param {boolean} showMeta - Se mostrare i metadati (anno, clienti)
 * @returns {HTMLElement} - Elemento card
 */
function createProjectCard(project, index, showMeta = false) {
    const currentLang = document.documentElement.lang || 'it';
    const projectData = project[currentLang] || project.it;
    
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    
    const metaHtml = showMeta ? `
        <div class="project-meta">
            <span class="year"><i class="fas fa-calendar"></i> ${project.year}</span>
            <span class="clients"><i class="fas fa-building"></i> ${project.clients.join(', ')}</span>
        </div>
    ` : '';
    
    const externalLinkHtml = project.externalLink 
        ? `<a href="${project.externalLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Vedi Progetto</a>` 
        : '';
    
    card.innerHTML = `
        <div class="card-glow"></div>
        <div class="project-image">
            <img src="${project.image}" alt="${projectData.title}">
            <div class="project-overlay">
                <span class="badge">${project.category}</span>
            </div>
        </div>
        <div class="project-info">
            <h3>${projectData.title}</h3>
            <p>${projectData.description}</p>
            ${metaHtml}
            <div class="project-buttons">
                <a href="${project.caseStudyUrl}" class="btn btn-secondary"><i class="fas fa-file-alt"></i> Case Study</a>
                ${externalLinkHtml}
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Carica e renderizza i progetti
 * @param {string} containerId - ID del container
 * @param {boolean} featuredOnly - Se filtrare solo i progetti in evidenza
 * @param {boolean} showMeta - Se mostrare i metadati
 */
function loadProjectsToContainer(containerId, featuredOnly = false, showMeta = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch('./data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            container.innerHTML = '';

            if (!data.projects || data.projects.length === 0) {
                container.innerHTML = '<p class="no-projects">Nessun progetto trovato</p>';
                return;
            }

            const projects = featuredOnly 
                ? data.projects.filter(p => p.featured) 
                : data.projects;

            projects.forEach((project, index) => {
                container.appendChild(createProjectCard(project, index, showMeta));
            });

            AOS.refresh();
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            container.innerHTML = '<p class="error">Errore nel caricamento dei progetti</p>';
        });
}

// Inizializza i progetti al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    // Projects page - tutti i progetti con metadati
    loadProjectsToContainer('projects-container', false, true);
    // Homepage - solo progetti in evidenza, senza metadati
    loadProjectsToContainer('featured-projects-container', true, false);
});

console.log('Portfolio loaded successfully! 🚀');


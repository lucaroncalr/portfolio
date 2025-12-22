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
            <img src="${project.heroImage}" alt="${projectData.title}">
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
                ? data.projects.filter(p => p.featured && !p.hidden) 
                : data.projects.filter(p => !p.hidden);

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

// ==================== CASE STUDY LOADER ==================== 
/**
 * Carica i dati del case study dalla URL e popola la pagina
 */
async function loadCaseStudy() {
    try {
        // Get project ID from URL parameter
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('id');

        if (!projectId) {
            throw new Error('Nessun progetto specificato');
        }

        // Fetch projects data - gestisce sia root che subdirectory
        const isInSubfolder = window.location.pathname.includes('/cases/');
        const jsonPath = isInSubfolder ? '../data/projects.json' : './data/projects.json';
        
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Errore nel caricamento dei dati');
        
        const data = await response.json();
        const project = data.projects.find(p => p.id === projectId);

        if (!project) {
            throw new Error('Progetto non trovato');
        }

        // Detect language
        const currentLang = document.documentElement.lang || 'it';
        const projectData = project[currentLang] || project.it;
        const caseStudy = projectData.caseStudy;

        // Populate page
        document.title = `${projectData.title} - Case Study - Luca Ronca`;
        document.querySelector('meta[name="description"]').content = projectData.description;

        // Hero Section
        document.getElementById('case-title').textContent = projectData.title;
        document.getElementById('case-subtitle').textContent = caseStudy.subtitle;
        document.getElementById('case-image').src = project.heroImage;
        document.getElementById('case-image').alt = projectData.title;

        // Main Content
        document.getElementById('case-challenge').textContent = caseStudy.challenge;
        document.getElementById('case-solution').textContent = caseStudy.solution;

        // Sidebar Tech
        const sidebarTech = document.getElementById('sidebar-tech');
        sidebarTech.innerHTML = '';
        project.techStack.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            sidebarTech.appendChild(tag);
        });

        // Results
        const resultsList = document.getElementById('case-results');
        resultsList.innerHTML = '';
        caseStudy.results.forEach(result => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${result}`;
            resultsList.appendChild(li);
        });

        // Key Learnings
        const learningsList = document.getElementById('case-learnings');
        learningsList.innerHTML = '';
        caseStudy.keyLearnings.forEach(learning => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-lightbulb"></i> ${learning}`;
            learningsList.appendChild(li);
        });

        // Sidebar Info
        document.getElementById('sidebar-category').textContent = project.category;
        document.getElementById('sidebar-clients').textContent = project.clients.join(', ');
        document.getElementById('sidebar-year').textContent = project.year;
        document.getElementById('sidebar-role').textContent = caseStudy.role;

        // Image Carousel
        initImageCarousel(project, projectData);

        // Reinitialize AOS
        AOS.refresh();

    } catch (error) {
        console.error('Errore:', error);
        const main = document.querySelector('.case-study-main');
        if (main) {
            main.innerHTML = `<div style="text-align: center; padding: 60px 20px; color: #ff6b6b;"><h2>${error.message}</h2><p><a href="../projects.html" class="btn btn-primary">Torna ai Progetti</a></p></div>`;
        }
    }
}

/**
 * Inizializza il carousel delle immagini
 * @param {Object} project - Dati del progetto
 * @param {Object} projectData - Dati localizzati del progetto
 */
function initImageCarousel(project, projectData) {
    if (!project.images || project.images.length === 0) return;
    
    const carousel = document.getElementById('case-carousel');
    const track = document.getElementById('carousel-track');
    const indicators = document.getElementById('carousel-indicators');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!carousel || !track || !indicators || !prevBtn || !nextBtn) return;
    
    carousel.style.display = 'block';
    
    let currentSlide = 0;
    const totalSlides = project.images.length;
    
    // Populate carousel
    project.images.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${imgSrc}" alt="${projectData.title} - Immagine ${index + 1}">`;
        track.appendChild(slide);
        
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Vai all'immagine ${index + 1}`);
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
        indicators.appendChild(dot);
    });
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
}

// Inizializza i progetti al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    // Projects page - tutti i progetti con metadati
    loadProjectsToContainer('projects-container', false, true);
    // Homepage - solo progetti in evidenza, senza metadati
    loadProjectsToContainer('featured-projects-container', true, false);
    // Case study page
    if (document.getElementById('case-title')) {
        loadCaseStudy();
    }
});

console.log('Portfolio loaded successfully! 🚀');


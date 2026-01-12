# Specifica Progetto: Portfolio Personale

**Data**: 26 novembre 2025  
**Cliente**: Luca Ronca  
**Progetto**: Sito Portfolio Personale - Showcase VR/AR & Web Development  
**Scadenza**: dicembre 2025
**Priorità**: ALTA

---

## 1. OBIETTIVO GENERALE

Creare un sito portfolio professionale che mostri i progetti completati, le competenze tecniche e generi impressioni positive per potenziali clienti e collaboratori. Il sito deve essere mobile-friendly, veloce, e dimostrare expertise in VR/AR e web development.

**Risultato atteso**: Sito completamente funzionante e live su GitHub Pages.

---

## 2. REQUISITI FUNZIONALI

### 2.1 Homepage (Landing Page)
- [ ] **Header/Navbar sticky**: Logo personale (Luca Ronca) e menu di navigazione (Home, Projects, Services, About, Contact)
- [ ] **Hero Section**: Titolo prominente, sottotitolo, descrizione breve e CTA button "See My Work"
- [ ] **Services Section**: Griglia di 6 card che descrivono i servizi offerti:
  - VR Development
  - AR Experience
  - Game Development
  - Web Development
  - Consultancy
  - Optimization
- [ ] **Projects Preview**: 3 card dei progetti principali con immagini, titolo, breve descrizione e link
- [ ] **About Section**: Breve biografia e tech stack
- [ ] **Contact Section**: CTA "Let's Work Together" con link a email, LinkedIn, GitHub
- [ ] **Footer**: Copyright notice

### 2.2 Case Study Pages (Dettaglio Progetti)
Tre pagine separate, una per ogni progetto:

**Progetto 1**
- Titolo:
- Sottotitolo:
- Metadati: Year (), Client (), Role ()
- Challenge: 
- Solution: 
- Tech Stack: 
- Results: 
- Key Learnings:
- Back link: "← Back to Portfolio"

**Progetto 2**
- Titolo:
- Sottotitolo:
- Metadati: Year (), Client (), Role ()
- Challenge: 
- Solution: 
- Tech Stack: 
- Results: 
- Key Learnings:
- Back link: "← Back to Portfolio"

**Progetto 3**
- Titolo:
- Sottotitolo:
- Metadati: Year (), Client (), Role ()
- Challenge: 
- Solution: 
- Tech Stack: 
- Results: 
- Key Learnings:
- Back link: "← Back to Portfolio"

### 2.3 Design & Styling
- [ ] **Colore primario**: Gradient (667eea → 764ba2) per elementi prominenti
- [ ] **Colore secondario**: #2c3e50 per navbar e footer
- [ ] **Typography**: Segoe UI, Arial fallback; h2 36px, body text 16px
- [ ] **Responsive Design**:
  - Desktop: Full layout, nav horizontal
  - Tablet (768px): Aggiustamenti font e spacing
  - Mobile (480px): Stack verticale, nav ridotto, font più piccoli
- [ ] **Interattività**: Hover effects su card (shadow + transform), smooth scroll, link underline su hover
- [ ] **Layout**: Max-width 1200px per contenuti, padding consistente, whitespace generoso

---

## 3. REQUISITI TECNICI

### 3.1 Infrastruttura
- [ ] Repository GitHub pubblico denominato "portfolio"
- [ ] GitHub Pages abilitato per deploy automatico da main branch
- [ ] URL finale: `https://[username].github.io/portfolio`
- [ ] Nessun build process richiesto (static HTML/CSS)

### 3.2 Struttura File
```
portfolio/
├── index.html (homepage)
├── README.md (description)
├── css/
│   └── style.css (all styles)
├── assets/
│   └── images/ (project screenshots)
└── cases/
    ├── case1.html
    ├── case2.html
    └── case3.html
```

### 3.3 Performance & Compatibilità
- [ ] Site deve caricare in <2 secondi (mobile 4G)
- [ ] Compatibile con: Chrome, Firefox, Safari, Edge (ultimi 2 anni)
- [ ] Valido HTML5 e CSS3
- [ ] Immagini ottimizzate (<200KB per thumbnail)

### 3.4 SEO Base
- [ ] Meta tags: title, description, viewport
- [ ] Semantic HTML (h1, h2, nav, section, footer)
- [ ] Alt text su tutte le immagini

---

## 4. CONTENUTI RICHIESTI

### 4.1 Testi
- Homepage: Da fornire
- Case studies: Da fornire

### 4.2 Immagini
- 3 thumbnail per i progetti (400x250px) - temporaneamente placeholder online
- Da aggiornare con screenshot reali quando disponibili
- Placeholder service: `https://via.placeholder.com/400x250?text=[project-name]`

### 4.3 Link di Contatto
- Email: `[da personalizzare]`
- LinkedIn: `[da personalizzare]`
- GitHub: `[da personalizzare]`

---

## 5. GESTIONE PROGETTO

### 5.1 Timeline
| Fase | Tempo |
|------|-------|
| Setup repo + GitHub Pages | 30 min | 
| HTML structure (index + cases) | 45 min | 
| CSS styling completo | 45 min | 
| Test locale + responsive | 15 min |
| Commit + Push | 10 min | 
| Final check + live deploy | 15 min |
| **TOTALE** | **~3.5 ore** |

### 5.2 Deliverables
- ✅ Repository GitHub pubblico
- ✅ Sito live su GitHub Pages
- ✅ Homepage funzionante
- ✅ 3 case study pages funzionanti
- ✅ Mobile responsive (testato su phone)
- ✅ Tutti i link funzionanti
- ✅ README.md aggiornato

### 5.3 Criteri di Accettazione
- [ ] Sito accessibile da `https://[username].github.io/portfolio`
- [ ] Homepage carica in <2 secondi
- [ ] Tutti i link di navigazione funzionano
- [ ] Case study pages raggiungibili dai link sulla homepage
- [ ] Navbar sticky funziona correttamente
- [ ] Responsive su mobile (test Chrome DevTools mobile view)
- [ ] Nessun errore console JavaScript
- [ ] Immagini caricate (anche se placeholder)
- [ ] Email e social link corretti

---

## 6. NOTE E CONSIDERAZIONI

### 6.1 Approccio
- Design semplice, pulito, professionale
- Focus sulla presentazione del lavoro, non su effetti complessi
- No framework (vanilla HTML/CSS) per velocità e semplicità
- Placeholder images durante development, sostituire con screenshot reali dopo

### 6.2 Post-Launch (dopo venerdì)
- Aggiungere screenshot reali dei progetti quando disponibili
- Potenzialmente: aggiungere sezione "Testimonials" o "Clients" in futuro
- Monitorare performance e feedback

### 6.3 Personalization Needed
Prima di considerare il progetto completato, personalizzare:
- [ ] Email di contatto (sostituire `luca.ronca@example.com`)
- [ ] LinkedIn URL (sostituire `lucaronca`)
- [ ] GitHub URL (sostituire `lucaronca`)
- [ ] Descrizione nel repo GitHub
- [ ] README.md con info personali

---

## 7. DESIGN REFERENCES

### Colori
- Primary Gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Navbar/Footer: `#2c3e50`
- Card Accent: `#667eea`
- Light Background: `#f9f9f9`
- Text Dark: `#333`
- Text Light: `#666`

### Font
- Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Line Height: 1.6
- Letter Spacing: 1px per headings

### Spacing
- Section padding: 80px vertical, 20px horizontal
- Card gap: 30px
- Container max-width: 1200px

---

## 8. ACCEPTANCE SIGN-OFF

**Cliente**: Luca Ronca  
**Data Inizio**: 26 novembre 2025  
**Data Scadenza**: dicembre 2025  
**Status**: In Development

Portfolio considerato **COMPLETATO** quando:
1. ✅ Tutti i deliverables sono stati consegnati
2. ✅ Criteri di accettazione sono stati soddisfatti
3. ✅ Testing locale e mobile è stato completato
4. ✅ Link di contatto sono stati personalizzati
5. ✅ Sito è live e accessible online

---

**Buon lavoro!** 🚀

## FASE 1: Repository Git e deploy su Github Pages
- [ ] **Nome**: `portfolio`
- [ ] **Descrizione**: `Professional Portfolio - Unity 3D, VR/AR, Web Development`
- [ ] **Visibility**: PUBLIC
- [ ] **Source**: "Deploy from a branch"
- [ ] **Branch**: main
- [ ] **Folder**: / (root)

---

## FASE 2: Struttura File

```
portfolio/
├── README.md (creato automaticamente)
├── index.html (create next)
├── css/
│   └── style.css (create next)
├── assets/
│   └── images/ (for screenshots)
└── cases/
    ├── case1.html (create next)
    ├── case2.html (create next)
    └── case3.html (create next)
```

---

## FASE 3: Creare Home Page
- [ ] `index.html`
- [ ] `style.css`

## FASE 4: Creare case studies
- [ ] `index.html`
- [ ] `style.css`
 
---

## FASE 5: Aggiornare le Info 

Nel `index.html` e case study pages, cambia:
- `luca.ronca@example.com` → tua email reale
- `https://linkedin.com/in/lucaronca` → tuo LinkedIn
- `https://github.com/lucaronca` → tuo GitHub

Nel file `README.md` della root:
```markdown
# Luca Ronca - Portfolio

Descrizione breve

## Visit
https://[your-username].github.io/portfolio

## Tech Stack
- 
- 
- 

## Contact
- Email: [your-email]
- LinkedIn: [your-linkedin]
- GitHub: [your-github]
```

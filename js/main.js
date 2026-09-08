document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const entranceElements = document.querySelectorAll('.hero-entrance');

    // Reveal Hero
    setTimeout(() => {
        entranceElements.forEach(el => el.classList.add('active'));
    }, 400);

    // Cursor Movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    });

    // SISTEMA DRAG ROBUSTO COMPLETO
    let isDragging = false, activeItem = null, startX, startY, initialX, initialY;

    document.querySelectorAll('.draggable').forEach(item => {
        item.addEventListener('mousedown', (e) => {
            isDragging = true;
            activeItem = item;
            const rect = item.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            initialX = rect.left;
            initialY = rect.top;
            item.style.transition = "none";
            item.style.zIndex = "1000";
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !activeItem) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        activeItem.style.left = (initialX + dx) + "px";
        activeItem.style.top = (initialY + dy + window.scrollY) + "px";
    });

    document.addEventListener('mouseup', () => {
        if(activeItem) {
            activeItem.style.zIndex = "10";
            activeItem.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
        }
        isDragging = false;
        activeItem = null;
    });

    // --- BASE DE DATOS DE PORTFOLIO (CON LAS 8 PRODUCCIONES DE MIS PROYECTOS Y TODAS SUS FOTOS) ---
    const portfolioData = {
        proyectos: [
            { 
                name: "DUALIDAD", 
                img: "images/portada_dualidad.jpg", 
                gallery: [
                    "images/d1.jpg", "images/d2.jpg", "images/d3.jpg", 
                    "images/d4.jpg", "images/d5.jpg", "images/d6.jpg", "images/d7.jpg"
                ] 
            },
            { 
                name: "JOYA DE AUTOR", 
                img: "images/portada_Joya_De_Autor.jpg", 
                gallery: [
                    "images/jda1.jpg", "images/jda2.jpg", "images/jda3.jpg", 
                    "images/jda4.jpg", "images/jda5.jpg", "images/jda6.jpg",
                    "images/jda7.jpg", "images/jda8.jpg", "images/jda9.jpg",
                    "images/jda10.jpg", "images/jda11.jpg", "images/jda12.jpg", "images/jda13.jpg"
                ] 
            },
            { 
                name: "STEFI (LEVELS MODELS)", 
                img: "images/portada_Stefi_( Levels Models).jpg", 
                gallery: [
                    "images/stefi1.jpg", "images/stefi2.jpg", "images/stefi3.jpg", 
                    "images/stefi4.jpg", "images/stefi5.jpg", "images/stefi6.jpg",
                    "images/stefi7.jpg", "images/stefi8.jpg", "images/stefi9.jpg",
                    "images/stefi10.jpg"
                ] 
            },
            {
                name: "EDITORIAL INOCENCIA PERDIDA",
                img: "images/portada_Editorial_Inocencia_Perdida.jpg",
                gallery: [
                    "images/eip1.jpg", "images/eip2.jpg", "images/eip3.jpg",
                    "images/eip4.jpg", "images/eip5.jpg", "images/eip6.jpg", 
                    "images/eip7.jpg", "images/eip8.jpg", "images/eip9.jpg"
                ]
            },
            {
                name: "MEI URBAN",
                img: "images/Portada_Mei_Urban.jpg",
                gallery: [
                    "images/mu1.jpg", "images/mu2.jpg", "images/mu3.jpg",
                    "images/mu4.jpg", "images/mu5.jpg", "images/mu6.jpg",
                    "images/mu7.jpg", "images/mu8.jpg", "images/mu9.jpg",
                    "images/mu10.jpg", "images/mu11.jpg", "images/mu12.jpg"
                ]
            },
            {
                name: "CONSUELO (LEVELS MODELS) / LËCRAB",
                img: "images/Portada_Consuelo_(Levels Models)-Lecrab.jpg",
                gallery: [
                    "images/CLL1.jpg", "images/CLL2.jpg", "images/CLL3.jpg",
                    "images/CLL4.jpg", "images/CLL5.jpg", "images/CLL6.jpg",
                    "images/CLL7.jpg", "images/CLL8.jpg", "images/CLL9.jpg",
                    "images/CLL10.jpg", "images/CLL11.jpg", "images/CLL12.jpg",
                    "images/CLL13.jpg", "images/CLL14.jpg", "images/CLL15.jpg",
                    "images/CLL16.jpg", "images/CLL17.jpg", "images/CLL18.jpg",
                    "images/CLL19.jpg"
                ]
            },
            {
                name: "INTENTANDO BORRARME",
                img: "images/Portada_intentando_borrarme.jpg",
                gallery: [
                    "images/IB1.jpg", "images/IB2.jpg", "images/IB3.jpg",
                    "images/IB4.jpg", "images/IB5.jpg", "images/IB6.jpg",
                    "images/IB7.jpg"
                ]
            },
            {
                name: "TEST JULIETA RIVERO",
                img: "images/Portada_Test_Julieta_Rivero.jpg",
                gallery: [
                    "images/TJR1.jpg", "images/TJR2.jpg", "images/TJR3.jpg",
                    "images/TJR4.jpg", "images/TJR5.jpg", "images/TJR6.jpg",
                    "images/TJR7.jpg"
                ]
            }
        ],
        cm: [
            { name: "JOYAS DE AUTOR", img: "images/foto1.jpg", gallery: [] },
            { name: "ESTUDIO PSICOLOGÍA", img: "images/foto2.jpg", gallery: [] }
        ]
    };

    // Navegación 3 Niveles
    window.showCategory = (cat) => {
        document.getElementById('view-home').classList.add('hidden');
        document.getElementById('view-list').classList.remove('hidden');
        const container = document.getElementById('productions-container');
        document.getElementById('category-title').innerText = cat === 'proyectos' ? 'MIS PROYECTOS' : 'CM';
        container.innerHTML = "";
        
        portfolioData[cat].forEach(item => {
            const card = document.createElement('div');
            card.className = "production-card";
            card.innerHTML = `<img src="${item.img}"><div class="card-overlay"><span class="production-name">${item.name}</span></div>`;
            card.onclick = () => showDetail(item);
            container.appendChild(card);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.showDetail = (prod) => {
        document.getElementById('view-list').classList.add('hidden');
        document.getElementById('view-detail').classList.remove('hidden');
        document.getElementById('production-title').innerText = prod.name;
        const mediaContainer = document.getElementById('media-content');
        mediaContainer.innerHTML = "";
        
        prod.gallery.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.loading = "lazy";
            mediaContainer.appendChild(img);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.goBack = (target) => {
        document.querySelectorAll('main > section').forEach(s => s.classList.add('hidden'));
        if(target === 'home') document.getElementById('view-home').classList.remove('hidden');
        if(target === 'list') document.getElementById('view-list').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Lógica About Overlay
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about-section');
    const closeAbout = document.getElementById('close-about');
    
    aboutLink.addEventListener('click', (e) => { 
        e.preventDefault(); 
        aboutSection.classList.add('active'); 
    });
    
    closeAbout.addEventListener('click', () => {
        aboutSection.classList.remove('active');
    });
});
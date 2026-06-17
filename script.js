document.addEventListener("DOMContentLoaded", () => {
    
    // --- MENU LATERAL ---
    const hamburger = document.getElementById("hamburger-btn");
    const sidebar = document.getElementById("sidebar");
    const closeBtn = document.getElementById("close-btn");
    const overlay = document.getElementById("overlay");

    const toggleMenu = (show) => {
        if(show) {
            sidebar.classList.add("open");
            overlay.classList.add("open");
        } else {
            sidebar.classList.remove("open");
            overlay.classList.remove("open");
        }
    };

    hamburger.addEventListener("click", () => toggleMenu(true));
    closeBtn.addEventListener("click", () => toggleMenu(false));
    overlay.addEventListener("click", () => toggleMenu(false));

    // --- TEMA CLARO/ESCURO ---
    const themeToggle = document.getElementById("theme-toggle");
    let currentTheme = localStorage.getItem("wr_theme") || "light";
    
    if (currentTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
        themeToggle.textContent = "Tema: Claro (Ativar)";
    }

    themeToggle.addEventListener("click", () => {
        if (document.body.getAttribute("data-theme") === "dark") {
            document.body.removeAttribute("data-theme");
            localStorage.setItem("wr_theme", "light");
            themeToggle.textContent = "Tema: Escuro (Ativar)";
        } else {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("wr_theme", "dark");
            themeToggle.textContent = "Tema: Claro (Ativar)";
        }
    });

    // --- SISTEMA DE NOTÍCIAS ---
    const newsContainer = document.getElementById("news-container");
    const formNews = document.getElementById("form-news");
    const modalAdd = document.getElementById("modal-add");
    
    document.getElementById("btn-add-news").addEventListener("click", () => modalAdd.classList.add("active"));
    document.getElementById("btn-cancel").addEventListener("click", () => modalAdd.classList.remove("active"));

    // Notícias padrão para quando o site abrir pela primeira vez
    const defaultNews = [
        {
            title: "Custo de servidores cai 30% com nova tecnologia de resfriamento",
            category: "Tecnologia",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80",
            desc: "Datacenters globais adotam design flat e minimalista para fiação."
        },
        {
            title: "Mercado internacional fecha semana em alta sólida",
            category: "Economia",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80",
            desc: "Índices sobem após relatórios mostrarem estabilidade na inflação."
        }
    ];

    let savedNews = JSON.parse(localStorage.getItem("wr_news_list")) || defaultNews;

    function renderizarNoticias() {
        newsContainer.innerHTML = ""; 
        
        savedNews.slice().reverse().forEach((news, index) => {
            const delay = index * 0.1; 
            const imgUrl = news.image || `https://via.placeholder.com/500x300/1e293b/ffffff?text=${news.category}`;

            const article = document.createElement("article");
            article.classList.add("noticia-card");
            article.style.animationDelay = `${delay}s`;
            
            article.innerHTML = `
                <img src="${imgUrl}" alt="Notícia">
                <div class="noticia-conteudo">
                    <span class="noticia-categoria">${news.category}</span>
                    <h3>${news.title}</h3>
                    <p>${news.desc}</p>
                </div>
            `;
            newsContainer.appendChild(article);
        });
    }

    renderizarNoticias();

    formNews.addEventListener("submit", (e) => {
        e.preventDefault(); 
        
        const novaNoticia = {
            title: document.getElementById("news-title").value,
            category: document.getElementById("news-category").value,
            image: document.getElementById("news-image").value,
            desc: document.getElementById("news-desc").value
        };

        savedNews.push(novaNoticia); 
        localStorage.setItem("wr_news_list", JSON.stringify(savedNews)); 

        formNews.reset(); 
        modalAdd.classList.remove("active"); 
        renderizarNoticias(); 
    });
});

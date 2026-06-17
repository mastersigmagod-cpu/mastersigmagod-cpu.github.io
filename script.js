document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const sideMenu = document.getElementById("side-menu");
    const overlay = document.getElementById("menu-overlay");

    // Função para abrir/fechar o menu
    const toggleMenu = () => {
        sideMenu.classList.toggle("open");
        overlay.classList.toggle("active");
        
        // Impede a tela de trás de rolar quando o menu está aberto
        if (sideMenu.classList.contains("open")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    // Eventos de clique
    menuBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
});

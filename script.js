document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.portfolio-container > section');
    const portfolioContainer = document.querySelector('.portfolio-container');

    /**
     * Affiche la section demandée et met à jour le menu.
     * @param {string} targetId L'ID de la section cible (ex: "#accueil").
     */
    const showSection = (targetId) => {
        // Ajoute l'effet de flash avant de changer le contenu
        portfolioContainer.classList.add('is-flashing');
        
        // Masque toutes les sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Affiche la section cible
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            // Remonte au sommet de la zone de contenu principale
            document.querySelector('.main-content').scrollTop = 0;
        }

        // Met à jour l'état actif dans le menu
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === targetId) {
                item.classList.add('active');
            }
        });

        // Retire l'effet de flash après un court délai
        setTimeout(() => {
            portfolioContainer.classList.remove('is-flashing');
        }, 100); 
    };

    // Gérer les clics sur le menu
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            // Met à jour l'URL sans recharger la page
            history.pushState(null, '', targetId); 
            showSection(targetId);
        });
    });

    // Gérer la navigation par l'URL (au chargement ou bouton retour)
    const handleHashChange = () => {
        // Utilise #accueil par défaut si aucun hash n'est présent
        const targetId = window.location.hash || '#accueil';
        showSection(targetId);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Afficher la bonne section au chargement initial
});

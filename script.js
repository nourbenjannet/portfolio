// ==========================================================================
// PORTFOLIO NOUR BEN JANNET - SCRIPT INTERACTION & LOGIQUE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialiser les icônes Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Gestion du Thème Sombre / Clair avec persistance
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('nbj_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('nbj_theme', newTheme);
        });
    }

    // 3. Menu Mobile Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Fermer le menu lors du clic sur un lien
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // 4. Filtrage dynamique des Compétences par Section
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCategoryBlocks = document.querySelectorAll('.skill-category-block');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCategoryBlocks.forEach(block => {
                const category = block.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    block.style.display = 'block';
                    // Animation d'apparition
                    block.style.opacity = '0';
                    block.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        block.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        block.style.opacity = '1';
                        block.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    block.style.display = 'none';
                }
            });
        });
    });

    // 5. Suivi du défilement actif (ScrollSpy)
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// 6. Gestion du formulaire de contact (mailto direct & feedback visuel)
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subject = document.getElementById('messageSubject').value;
    const message = document.getElementById('messageBody').value;
    const statusMsg = document.getElementById('formStatus');

    // Préparation de l'URL mailto
    const mailtoSubject = encodeURIComponent(`[Contact Portfolio] ${subject}`);
    const mailtoBody = encodeURIComponent(
        `Nom / Entreprise : ${name}\n` +
        `Email : ${email}\n\n` +
        `Message :\n${message}`
    );

    const mailtoUrl = `mailto:nourbenjannet02@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    if (statusMsg) {
        statusMsg.style.color = '#10b981';
        statusMsg.textContent = 'Ouverture de votre messagerie pour envoyer l\'email à Nour Ben Jannet...';
    }

    // Ouvrir le client mail
    window.location.href = mailtoUrl;

    // Réinitialiser le formulaire après un court instant
    setTimeout(() => {
        document.getElementById('contactForm').reset();
    }, 3000);
}

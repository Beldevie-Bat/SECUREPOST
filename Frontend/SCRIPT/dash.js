
document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('.menu-btn');
    const sections = document.querySelectorAll('.tab-section');

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {


            // Nettoyage des classes actives
            menuButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(sec => sec.classList.add('hidden'));

            // l'onglet cliqué
            button.classList.add('active');
            const target = button.getAttribute('data-target');
            const targetSection = document.getElementById(target);
            
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
        });
    });

    
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const targetBtn = document.querySelector(`[data-target="${hash}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    }
    
    
//nouvel actes


// pop up NOUVEL ACTE
    const modal = document.getElementById('acte-modal');
    const btnNouvelActe = document.querySelector('.add-btn');
    const btnFermerModal = document.getElementById('close-modal-btn');
    const formulaireActe = document.getElementById('acte-form');

    
    if (btnNouvelActe && modal) {
        btnNouvelActe.addEventListener('click', () => {
            modal.classList.remove('hidden'); // On affiche le PopUp
        });
    }

    //  Fermer le popup
    if (btnFermerModal && modal) {
        btnFermerModal.addEventListener('click', () => {
            modal.classList.add('hidden'); // On cache le popup
        });
    }

    // envoi du formulaire pour éviter que la page recharge
    if (formulaireActe) {
        formulaireActe.addEventListener('submit', (e) => {
            e.preventDefault(); 

            
            const type = document.getElementById('type-acte').value;
            const quartier = document.getElementById('quartier-acte').value;
            const description = document.getElementById('desc-acte').value;

            
            alert(`Acte enregistré avec succès !\nType : ${type}\nLieu : ${quartier}`);
            
            // On vide le formulaire et on ferme la fenêtre
            formulaireActe.reset();
            modal.classList.add('hidden');
        });
    }
});

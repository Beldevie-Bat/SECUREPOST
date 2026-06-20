document.addEventListener('DOMContentLoaded', () => {

    
    const menuButtons = document.querySelectorAll('.menu-btn');
    const sections = document.querySelectorAll('.tab-section');

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(sec => sec.classList.add('hidden'));

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
        if (targetBtn) targetBtn.click();
    }

    
    const burgerBtn = document.getElementById('burger-menu-btn');
    const sidebar = document.querySelector('.sidebar');

    if (burgerBtn && sidebar) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active-mobile');
        });

        
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && sidebar.classList.contains('active-mobile')) {
                sidebar.classList.remove('active-mobile');
            }
        });
    }

    
    const modal = document.getElementById('acte-modal');
    const btnNouvelActe = document.querySelector('.add-btn');
    const btnFermerModal = document.getElementById('close-modal-btn');
    const formulaireActe = document.getElementById('acte-form');
    const tbody = document.getElementById('tableau-actes-body');

    if (btnNouvelActe && modal) {
        btnNouvelActe.addEventListener('click', () => modal.classList.remove('hidden'));
    }
    if (btnFermerModal && modal) {
        btnFermerModal.addEventListener('click', () => modal.classList.add('hidden'));
    }

    
    const confirmDeleteModal = document.getElementById('confirm-delete-modal');
    const closeConfirmModalBtn = document.getElementById('close-confirm-modal-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    let rowToDelete = null;

    
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            
            const starBtn = e.target.closest('.star-btn');
            if (starBtn) {
                starBtn.classList.toggle('active');
                starBtn.title = starBtn.classList.contains('active') ? 'Prioritaire' : 'Non prioritaire';
            }
            
            
            const deleteBtn = e.target.closest('.delete-btn');
            if (deleteBtn) {
                rowToDelete = deleteBtn.closest('tr');
                if (confirmDeleteModal) confirmDeleteModal.classList.remove('hidden');
            }
        });
    }

    
    const fermerModalSuppression = () => {
        if (confirmDeleteModal) confirmDeleteModal.classList.add('hidden');
        rowToDelete = null;
    };

    if (closeConfirmModalBtn) closeConfirmModalBtn.addEventListener('click', fermerModalSuppression);
    if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', fermerModalSuppression);

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async () => {
            if (rowToDelete) {
                const numeroActe = rowToDelete.querySelector('.acte-id').textContent;
                const resultat = await supprimerActe(numeroActe);
                
                if (resultat.erreur) {
                    alert(resultat.message);
                } else {
                    rowToDelete.remove();
                    chargerActes();
                }
            }
            fermerModalSuppression();
        });
    }

    
    async function chargerActes() {
        const resultat = await recupererActes();
        
        if (!resultat.erreur && resultat.donnees) {
            afficherActes(resultat.donnees);
        }
    }

    function afficherActes(actes) {
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        actes.forEach(acte => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="acte-id">${acte.numero_acte}</td>
                <td><span class="badge badge-plainte">${acte.type_acte}</span></td>
                <td>${acte.description}</td>
                <td>${acte.quartier}</td>
                <td><button class="star-btn" title="Prioritaire">★</button></td>
                <td><button class="delete-btn" title="Supprimer l'acte"><i class="fa-solid fa-trash"></i></button></td>
            `;
            tbody.appendChild(row);
        });
    }

    
    chargerActes();

    
    if (formulaireActe) {
        formulaireActe.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const type = document.getElementById('type-acte').value;
            const quartier = document.getElementById('quartier-acte').value;
            const urgence = document.getElementById('urgence-acte').value;
            const description = document.getElementById('desc-acte').value;
            
            const resultat = await creerActe(type, description, quartier, urgence);
            
            if (resultat.erreur) {
                alert(resultat.message);
            } else {
                modal.classList.add('hidden');
                formulaireActe.reset();
                chargerActes();
            }
        });
    }
});
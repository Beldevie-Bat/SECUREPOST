document.addEventListener('DOMContentLoaded', () => {

    const menuButtons = document.querySelectorAll('.menu-btn');
    const sections = document.querySelectorAll('.tab-section');

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {


            // Nettoyage des classes actives
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
        if (targetBtn) {
            targetBtn.click();
        }
    }
    
    
    

    const modal = document.getElementById('acte-modal');
    const btnNouvelActe = document.querySelector('.add-btn');
    const btnFermerModal = document.getElementById('close-modal-btn');
    const formulaireActe = document.getElementById('acte-form');
    const tbody = document.getElementById('tableau-actes-body');

    // Nouveaux éléments pour le popup suppression
    const confirmDeleteModal = document.getElementById('confirm-delete-modal');
    const closeConfirmModalBtn = document.getElementById('close-confirm-modal-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    let rowToDelete = null; 

    
    if (btnNouvelActe && modal) {
        btnNouvelActe.addEventListener('click', () => {
            modal.classList.remove('hidden'); 
        });
    }

    if (btnFermerModal && modal) {
        btnFermerModal.addEventListener('click', () => {
            modal.classList.add('hidden'); 
        });
    }

    if (formulaireActe) {
        formulaireActe.addEventListener('submit', (e) => {
            e.preventDefault(); 

            
            const type = document.getElementById('type-acte').value;
            const quartier = document.getElementById('quartier-acte').value;
            const description = document.getElementById('desc-acte').value;
            const urgence = document.getElementById('urgence-acte').value;
            
            
            const numAffaire = `PN-2026-${Math.floor(Math.random() * 900) + 100}`;
            const badgeClass = type === 'Plainte' ? 'badge-plainte' : 'badge-mc';

            // nouvelle ligne
            const nouvelleLigne = document.createElement('tr');
            nouvelleLigne.className = 'nouvelle-ligne-animation'; 

            nouvelleLigne.innerHTML = `
                <td class="acte-id">${numAffaire}</td>
                <td><span class="badge ${badgeClass}">${type}</span></td>
                <td>${description}</td>
                <td>${quartier}</td>
                <td><button class="star-btn" title="Non prioritaire">★</button></td>
                <td><button class="delete-btn" title="Supprimer l'acte"><i class="fa-solid fa-trash"></i></button></td>
            `;

            
            tbody.insertBefore(nouvelleLigne, tbody.firstChild);

            
            const newStarBtn = nouvelleLigne.querySelector('.star-btn');
            
            
            // bouton de suppression 
            const newDeleteBtn = nouvelleLigne.querySelector('.delete-btn');
            if (newDeleteBtn) {
                newDeleteBtn.addEventListener('click', () => {
                    rowToDelete = nouvelleLigne; 
                    confirmDeleteModal.classList.remove('hidden'); 
                });
            }

            
            
            formulaireActe.reset();
            modal.classList.add('hidden');
            console.log("Acte ajouté au registre.");
        });
    }


    if (tbody) {
        tbody.addEventListener('click', (e) => {
            
            if (e.target.closest('.star-btn')) {
                const starBtn = e.target.closest('.star-btn');
                starBtn.classList.toggle('active'); 
                starBtn.title = starBtn.classList.contains('active') ? 'Prioritaire' : 'Non prioritaire';
            }
            
            if (e.target.closest('.delete-btn')) {
                const deleteBtn = e.target.closest('.delete-btn');
                rowToDelete = deleteBtn.closest('tr'); 
                confirmDeleteModal.classList.remove('hidden'); 
            }
        });
    }

    
    if (closeConfirmModalBtn) {
        closeConfirmModalBtn.addEventListener('click', () => {
            confirmDeleteModal.classList.add('hidden');
            rowToDelete = null; 
        });
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            confirmDeleteModal.classList.add('hidden');
            rowToDelete = null; 
        });
    }

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            if (rowToDelete) {
                rowToDelete.remove(); 
                console.log("Acte supprimé après confirmation.");
            }
            confirmDeleteModal.classList.add('hidden');
            rowToDelete = null; 
        });
    }
});
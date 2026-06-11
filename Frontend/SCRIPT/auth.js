
document.addEventListener('DOMContentLoaded', () => {
    // Récupere les éléments du formulaire de connexion
    const loginForm = document.getElementById('login-form');
    const agentInput = document.getElementById('Agentname');
    const matriculeInput = document.getElementById('matricule');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');



    // masquer le mot de passe
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {


            // Si c'est en mode password, on passe en texte, et vice-versa
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordBtn.className = 'fa-solid fa-eye';
            } else {
                passwordInput.type = 'password';
                togglePasswordBtn.className = 'fa-solid fa-eye-slash';
            }
        });
    }

    // Force le matricule en majuscules pendant que l'agent écrit

    if (matriculeInput) {
        matriculeInput.addEventListener('input', () => {
            let valeur = matriculeInput.value.toUpperCase();


            // On garde uniquement les lettres, chiffres et tirets
            matriculeInput.value = valeur.replace(/[^A-Z0-9-]/g, '');
        });
    }

    // Fonctions de vérification des champs
    function verifierAgent() {
        const parent = agentInput.closest('.input-box');
        if (agentInput.value.trim() === '') {
            parent.classList.add('error');
            return false;
        } else {
            parent.classList.remove('error');
            return true;
        }
    }

    function verifierMatricule() {
        const parent = matriculeInput.closest('.input-box');
        const valeur = matriculeInput.value.trim();
        
    
        // le matricle doit commencer par "PN-"
        if (valeur.length !== 11 || !valeur.startsWith("PN-")) {
            parent.classList.add('error');
            return false;
        } else {
            parent.classList.remove('error');
            return true;
        }
    }

    function verifierPassword() {
        const parent = passwordInput.closest('.input-box');
        if (passwordInput.value.length < 4) {
            parent.classList.add('error');
            return false;
        } else {
            parent.classList.remove('error');
            return true;
        }
    }

    

    if (agentInput) {
        agentInput.addEventListener('blur', verifierAgent);
        agentInput.addEventListener('input', () => {
            if (agentInput.value.trim() !== '') {
                agentInput.closest('.input-box').classList.remove('error');
            }
        });
    }

    if (matriculeInput) {
        matriculeInput.addEventListener('blur', verifierMatricule);
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', verifierPassword);
        passwordInput.addEventListener('input', () => {
            if (passwordInput.value.length >= 4) {
                passwordInput.closest('.input-box').classList.remove('error');
            }
        });
    }


    // empeche l'envoi du formulaire s'il y a des erreurs
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const agentOk = verifierAgent();
            const matriculeOk = verifierMatricule();
            const passwordOk = verifierPassword();

            // Si un des champs est faux, on bloque l'envoi
            if (!agentOk || !matriculeOk || !passwordOk) {
                e.preventDefault(); 
                
                // On remet le focus sur le premier champ vide ou faux
                if (!agentOk) {
                    agentInput.focus();
                } else if (!matriculeOk) {
                    matriculeInput.focus();
                } else if (!passwordOk) {
                    passwordInput.focus();
                }
            }
        });
    }
});


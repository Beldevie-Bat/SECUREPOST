
document.addEventListener('DOMContentLoaded', () => {
    

    const loginForm = document.getElementById('login-form');
    const agentInput = document.getElementById('Agentname');
    const matriculeInput = document.getElementById('matricule');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordBtn.className = 'fa-solid fa-eye';
            } else {
                passwordInput.type = 'password';
                togglePasswordBtn.className = 'fa-solid fa-eye-slash';
            }
        });
    }

    if (matriculeInput) {
        matriculeInput.addEventListener('input', () => {
            matriculeInput.value = matriculeInput.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
        });
    }

    
    function validerChamp(input, condition) {
        const parent = input.closest('.input-box');
        const estValide = condition(input.value.trim());
        
        if (!estValide) {
            parent.classList.add('error');
        } else {
            parent.classList.remove('error');
        }
        return estValide;
    }

    const regles = {
        agent: (val) => val.length > 0,
        matricule: (val) => /^PN-\d{4}-\d{3}$/.test(val),
        password: (val) => val.length >= 4
    };

    
    if (agentInput) agentInput.addEventListener('blur', () => validerChamp(agentInput, regles.agent));
    if (matriculeInput) matriculeInput.addEventListener('blur', () => validerChamp(matriculeInput, regles.matricule));
    if (passwordInput) passwordInput.addEventListener('blur', () => validerChamp(passwordInput, regles.password));
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const isAgentValid = validerChamp(agentInput, regles.agent);
            const isMatriculeValid = validerChamp(matriculeInput, regles.matricule);
            const isPasswordValid = validerChamp(passwordInput, regles.password);

            if (!isAgentValid || !isMatriculeValid || !isPasswordValid) {
                e.preventDefault(); 
                const firstError = document.querySelector('.input-box.error input');
                if (firstError) firstError.focus();
            }
        });
    }
});

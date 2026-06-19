
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const agentInput = document.getElementById('Agentname');
    const matriculeInput = document.getElementById('matricule');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');

    const forgotLink = document.getElementById('forgotpassword');
    const forgotModal = document.getElementById('forgotmodal');
    const closeForgotBtn = document.getElementById('close-forgot');

    const forgotForm = document.getElementById('forgot-form');
    const forgotAgentInput = document.getElementById('forgot-agent');
    const forgotMatriculeInput = document.getElementById('forgot-matricule');
    const forgotEmailInput = document.getElementById('forgot-email');

    function validerChamp(input, condition) {
        const parent = input.closest('.input-box');
        if (!parent) return false;

        const estValide = condition(input.value.trim());
        parent.classList.toggle('error', !estValide);
        return estValide;
    }

    const regles = {
        agent: (val) => val.length > 0,
        matricule: (val) => /^PN-\d{4}-\d{3}$/.test(val),
        password: (val) => val.length >= 4,
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    };

    if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        

        const svgIcon = togglePasswordBtn.querySelector('svg');
        if (isHidden) {
            svgIcon.style.color = 'var(--sp-blue-600, #3b82f6)';
            togglePasswordBtn.setAttribute('aria-label', 'Masquer le mot de passe');
        } else {
            svgIcon.style.color = '#A0AEC0';
            togglePasswordBtn.setAttribute('aria-label', 'Afficher le mot de passe');
        }
    });
}

    if (matriculeInput) {
        matriculeInput.addEventListener('input', () => {
            matriculeInput.value = matriculeInput.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
        });
    }

    if (agentInput) {
        agentInput.addEventListener('blur', () => validerChamp(agentInput, regles.agent));
    }

    if (matriculeInput) {
        matriculeInput.addEventListener('blur', () => validerChamp(matriculeInput, regles.matricule));
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', () => validerChamp(passwordInput, regles.password));
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const isAgentValid = validerChamp(agentInput, regles.agent);
            const isMatriculeValid = validerChamp(matriculeInput, regles.matricule);
            const isPasswordValid = validerChamp(passwordInput, regles.password);

            if (!isAgentValid || !isMatriculeValid || !isPasswordValid) {
                e.preventDefault();
                const firstError = document.querySelector('.input-box.error input');
                if (firstError) firstError.focus();
            } else {
                e.preventDefault();
                window.location.href = 'Dashboard.html';
            }
        });
    }

    function ouvrirModal() {
        if (forgotModal) {
            forgotModal.classList.add('open');
            if (forgotAgentInput) forgotAgentInput.focus();
        }
    }

    function fermerModal() {
        if (forgotModal) {
            forgotModal.classList.remove('open');
        }
    }

    if (forgotLink) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            ouvrirModal();
        });
    }

    if (closeForgotBtn) {
        closeForgotBtn.addEventListener('click', fermerModal);
    }

    if (forgotModal) {
        forgotModal.addEventListener('click', (e) => {
            if (e.target === forgotModal) {
                fermerModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fermerModal();
        }
    });

    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            const isAgentValid = validerChamp(forgotAgentInput, regles.agent);
            const isMatriculeValid = validerChamp(forgotMatriculeInput, regles.matricule);
            const isEmailValid = validerChamp(forgotEmailInput, regles.email);

            if (!isAgentValid || !isMatriculeValid || !isEmailValid) {
                e.preventDefault();
                const firstError = forgotForm.querySelector('.input-box.error input');
                if (firstError) firstError.focus();
            }
        });
    }
});

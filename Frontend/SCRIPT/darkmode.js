//le thème sauvegardé pour éviter le flash blanc
const themeSauvegarde = localStorage.getItem('sp-theme') || 'dark';
document.documentElement.setAttribute('data-theme', themeSauvegarde);

document.addEventListener('DOMContentLoaded', () => {
    const boutonTheme = document.getElementById('theme-toggle');
    const iconeTheme = document.getElementById('theme-icon');

    //  la bonne icône au démarrage
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        iconeTheme.className = 'fa-solid fa-sun';
    } else {
        iconeTheme.className = 'fa-solid fa-moon';
    }

    
    if (boutonTheme && iconeTheme) {
        boutonTheme.addEventListener('click', () => {
            const themeActuel = document.documentElement.getAttribute('data-theme');
            
            if (themeActuel === 'dark') {
                // mode clair
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('sp-theme', 'light');
                iconeTheme.className = 'fa-solid fa-moon';
            } else {
                //  mode sombre
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('sp-theme', 'dark');
                iconeTheme.className = 'fa-solid fa-sun';
            }
        });
    }
});
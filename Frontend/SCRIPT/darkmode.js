
const themeSauvegarde = localStorage.getItem('sp-theme') || 'dark';
document.documentElement.setAttribute('data-theme', themeSauvegarde);

document.addEventListener('DOMContentLoaded', () => {
    const boutonTheme = document.getElementById('theme-toggle');
    const iconeTheme = document.getElementById('theme-icon');

    const iconeSoleil = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m9-6.35L9.65 5.35m4.7 13.3L14.35 18.65M5.35 5.35 7.5 7.5m9 9 2.15 2.15M5.35 18.65 7.5 16.5m9-9 2.15-2.15"></path>
            <circle cx="12" cy="12" r="3.5"></circle>
        </svg>`;

    const iconeLune = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path>
        </svg>`;

    function mettreAJourIcone() {
        if (!iconeTheme) return;
        const themeActuel = document.documentElement.getAttribute('data-theme');
        
        if (iconeTheme.classList && iconeTheme.classList.length) {
            const faClasses = Array.from(iconeTheme.classList).filter(c => c.startsWith('fa'));
            faClasses.forEach(c => iconeTheme.classList.remove(c));
        }

        iconeTheme.innerHTML = themeActuel === 'dark' ? iconeSoleil : iconeLune;
    }

    mettreAJourIcone();

    if (boutonTheme && iconeTheme) {
        boutonTheme.addEventListener('click', () => {
            const themeActuel = document.documentElement.getAttribute('data-theme');

            if (themeActuel === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('sp-theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('sp-theme', 'dark');
            }

            mettreAJourIcone();
        });
    }
});
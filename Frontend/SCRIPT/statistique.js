document.addEventListener('DOMContentLoaded', () => {
    // Récupérer l'élément Canvas du HTML
    const ctx = document.getElementById('infractionsChart').getContext('2d');

    
    const verifierSiSombre = () => document.documentElement.getAttribute('data-theme') === 'dark';

    
    const infractionsChart = new Chart(ctx, {
        type: 'pie', 
        data: {
            labels: ['Grand Marché', 'Tié-Tié', 'Mpaka', 'Vindoulou'], // Tes quartiers
            datasets: [{
                label: 'Nombre d\'actes',
                data: [12, 30, 7, 5], // données de simuLaton
                backgroundColor: [
                    '#380a83', //  Grand Marché
                    '#36a2eb', // Tié-Tié
                    '#cc65fe', // Mpaka
                    '#f5e507'  //  Vindoulou
                ],
                borderWidth: 1,
                borderColor: '#1e1e1e' 
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: verifierSiSombre() ? '#ffffff' : '#333333',
                        font: {
                            family: 'Arial',
                            size: 14
                        }
                    }
                }
            }
        }
    });

    //  couleur du texte si l'utilisateur change de thème 
    const boutonTheme = document.getElementById('theme-toggle');
    if (boutonTheme) {
        boutonTheme.addEventListener('click', () => {


            
            setTimeout(() => {
                infractionsChart.options.plugins.legend.labels.color = verifierSiSombre() ? '#ffffff' : '#333333';
                infractionsChart.update(); 
            }, 50);
        });
    }
});
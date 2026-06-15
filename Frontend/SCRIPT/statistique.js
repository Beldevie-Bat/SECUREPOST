document.addEventListener('DOMContentLoaded', () => {
    // --- Graphique 1 -acte par quartier en CAMEMBER ---
    const ctxQuartiers = document.getElementById('infractionsChart').getContext('2d');
    const infractionsChart = new Chart(ctxQuartiers, {
        type: 'pie',
        data: {
            labels: ['Grand Marché', 'Tié-Tié', 'Mpaka', 'Vindoulou'],
            datasets: [{
                label: 'Nombre d\'actes',
                data: [12, 19, 7, 5],
                backgroundColor: ['#300a83', '#36a2eb', '#cc65fe', '#f5e507'],
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
                        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#333333'
                    }
                }
            }
        }
    });



    // --- Graphique2-LES URGENCES en BARRES ---
    const ctxUrgences = document.getElementById('urgencesChart').getContext('2d');
    const urgencesChart = new Chart(ctxUrgences, {
        type: 'bar', 
        data: {
            labels: ['Faible', 'Moyenne', 'Haute'], 
            datasets: [{
                label: 'Nombre de cas',
                data: [8, 20, 4], 
                backgroundColor: [  '#2ecc71',  '#f1c40f', '#e74c3c' ],
                borderWidth: 1,
                borderColor: '#1e1e1e'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#333333',
                        stepSize: 1 
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)' 
                    }
                },
                x: {
                    ticks: {
                        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#333333'
                    },
                    grid: {
                        display: false 
                    }
                }
            },
            plugins: {
                legend: {
                    display: false 
                }
            }
        }
    });

    // --- le theme---
    const boutonTheme = document.getElementById('theme-toggle');
    if (boutonTheme) {
        boutonTheme.addEventListener('click', () => {
            setTimeout(() => {
                const estSombre = document.documentElement.getAttribute('data-theme') === 'dark';
                const couleurTexte = estSombre ? '#ffffff' : '#333333';

                // Graphique 1
                infractionsChart.options.plugins.legend.labels.color = couleurTexte;
                infractionsChart.update();

                // Graphique 2
                urgencesChart.options.scales.y.ticks.color = couleurTexte;
                urgencesChart.options.scales.x.ticks.color = couleurTexte;
                urgencesChart.update();
            }, 50);
        });
    }
    
    console.log("Statistiques de la BSU initialisées avec succès."); 
});
document.addEventListener('DOMContentLoaded', () => {

    
    const estSombre = document.documentElement.getAttribute('data-theme') === 'dark';
    const couleurTexte = estSombre ? '#ffffff' : '#6b7280';

    
    const optionsDonut = {
        series: [12, 19, 7, 5], 
        chart: {
            type: 'donut',
            height: 320,
            fontFamily: 'Poppins, sans-serif'
        },
        
        colors: ['#042C53', '#36a2eb', '#B5D4F4', '#f1c40f'], 
        labels: ['Grand Marché', 'Tié-Tié', 'Mpaka', 'Vindoulou'],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%'
                }
            }
        },
        legend: {
            position: 'bottom',
            labels: { colors: couleurTexte }
        },
        stroke: { show: false }
    };

    const donutChart = new ApexCharts(document.querySelector("#donut-chart"), optionsDonut);
    donutChart.render();


    
    const optionsBarres = {
        series: [{
            name: 'Cas recensés',
            data: [8, 20, 14] 
        }],
        chart: {
            type: 'bar',
            height: 300,
            fontFamily: 'Poppins, sans-serif',
            toolbar: { show: false }
        },
        colors: ['#2ecc71', '#f1c40f', '#e74c3c'], 
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '50%'
            }
        },
        xaxis: {
            categories: ['Faible', 'Moyenne', 'Haute'],
            labels: { style: { colors: couleurTexte } }
        },
        yaxis: {
            labels: { style: { colors: couleurTexte } }
        },
        grid: {
            borderColor: estSombre ? '#374151' : '#e5e7eb'
        }
    };

    const barChart = new ApexCharts(document.querySelector("#bar-chart"), optionsBarres);
    barChart.render();


    
    const boutonTheme = document.getElementById('theme-toggle');
    if (boutonTheme) {
        boutonTheme.addEventListener('click', () => {
            setTimeout(() => {
                const nvSombre = document.documentElement.getAttribute('data-theme') === 'dark';
                const nvCouleur = nvSombre ? '#ffffff' : '#6b7280';
                const nvGrille = nvSombre ? '#374151' : '#e5e7eb';

                
                donutChart.updateOptions({
                    legend: { labels: { colors: nvCouleur } }
                });

                
                barChart.updateOptions({
                    xaxis: { labels: { style: { colors: nvCouleur } } },
                    yaxis: { labels: { style: { colors: nvCouleur } } },
                    grid: { borderColor: nvGrille }
                });
            }, 100);
        });
    }

    console.log("Statistiques de la BSU rafraîchies au format Flowbite.");
});

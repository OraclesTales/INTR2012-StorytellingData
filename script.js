document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('myChart');
            container.innerHTML = '';
            const canvas = document.createElement('canvas');
            canvas.id = 'chartCanvas';
            container.appendChild(canvas);

            const ctx = canvas.getContext('2d');

            const labels = data.map(item => item.movie);
            const worldwide = data.map(item => item.worldwide);
            const international = data.map(item => item.international);
            const domestic = data.map(item => item.domestic);

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Worldwide', data: worldwide, backgroundColor: '#52b0eb' },
                        { label: 'International', data: international, backgroundColor: 'gold' },
                        { label: 'Domestic', data: domestic, backgroundColor: '#3d67ff' }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: value => {
                                    if (value >= 1000000000) return '$' + (value / 1000000000).toFixed(1) + 'B';
                                    if (value >= 1000000) return '$' + (value / 1000000).toFixed(0) + 'M';
                                    return '$' + value;
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: { position: 'top' },
                        tooltip: { callbacks: { label: ctx => '$' + Number(ctx.raw).toLocaleString() } }
                    }
                }
            });
        })
        .catch(err => {
            console.error('Failed to load data.json', err);
        });
});
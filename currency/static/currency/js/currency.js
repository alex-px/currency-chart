(function (window, document) {

    document.addEventListener('DOMContentLoaded', function () {
        calendar.set('id_user_date')
    });
    Highcharts.chart('chart-container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'RUB/USD rate'
        },

        xAxis: {
            categories: dates,
            title: {
                text: null
            }
        },
        yAxis: {
            min: min_val,
            title: {
                text: 'RUB',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' rub'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },

        credits: {
            enabled: false
        },
        series: [{
            name: 'RUB per USD',
            data: curr

        }]
    });
})(window, document);

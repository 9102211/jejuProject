(function ($) {
    var now = new Date();
    var totalVisitorDataByYearChart;
    var domesticVisitorDataByMonthPieChart;
    var domesticVisitorDataByMonthBarChart;
    var foreignVisitorDataByMonthChart;

    $('#year').on('change', function() {

        var year = $('#year').val();

        var month = $('#month').val();

        var domesticVisitorDataByYear = getDomesticVisitorDataByYear(year);

        var foreignVisitorDataByYear = getForeignVisitorDataByYear(year);

        var totalVisitorDataByYear = [];

        for(var i=0; i<domesticVisitorDataByYear.length; i++) {
            var sum = domesticVisitorDataByYear[i].sum + foreignVisitorDataByYear[i].sum;

            totalVisitorDataByYear.push(sum);
        }

        drawTotalVisitorDataByYearChart(totalVisitorDataByYear, year)

        var domesticVisitorDataByMonth = getDomesticVisitorDataByMonth(year, month);

        var domesticVisitorDataByMonthAndTravelType = [domesticVisitorDataByMonth.independentTour, domesticVisitorDataByMonth.partialPackageTour, domesticVisitorDataByMonth.packageTour]

        drawDomesticVisitorDataByMonthBarChart(domesticVisitorDataByMonthAndTravelType, year, month)

        var domesticVisitorDataByMonthAndPurpose = [domesticVisitorDataByMonth.leisureSports, domesticVisitorDataByMonth.business, domesticVisitorDataByMonth.relaxation, domesticVisitorDataByMonth.visit, domesticVisitorDataByMonth.education, domesticVisitorDataByMonth.misc]

        drawDomesticVisitorDataByMonthPieChart(domesticVisitorDataByMonthAndPurpose, year, month)

        var foreignVisitorDataByMonth = getForeignVisitorDataByMonth(year, month);

    })

    $('#month').on('change', function() {

        var year = $('#year').val();

        var month = $('#month').val();

        var domesticVisitorDataByMonth = getDomesticVisitorDataByMonth(year, month);

        var domesticVisitorDataByMonthAndTravelType = [domesticVisitorDataByMonth.independentTour, domesticVisitorDataByMonth.partialPackageTour, domesticVisitorDataByMonth.packageTour]

        drawDomesticVisitorDataByMonthBarChart(domesticVisitorDataByMonthAndTravelType, year, month)

        var domesticVisitorDataByMonthAndPurpose = [domesticVisitorDataByMonth.leisureSports, domesticVisitorDataByMonth.business, domesticVisitorDataByMonth.relaxation, domesticVisitorDataByMonth.visit, domesticVisitorDataByMonth.education, domesticVisitorDataByMonth.misc]

        drawDomesticVisitorDataByMonthPieChart(domesticVisitorDataByMonthAndPurpose, year, month)

        var foreignVisitorDataByMonth = getForeignVisitorDataByMonth(year, month);
    })

    function drawTotalVisitorDataByYearChart(data, year) {
        var ctx = document.getElementById("totalVisitorDataByYearChart").getContext("2d");

        if(totalVisitorDataByYearChart != null) {
            totalVisitorDataByYearChart.destroy()
        }

        totalVisitorDataByYearChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                datasets: [
                {
                    label: '방문자수',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: "#3ca4f3",
                    borderWidth: 1
                },
                ]
            },
            options: {
                    title:{
                        display:true,
                        text: year + '년도 방문자수',
                        fontSize: 24,
                        fontStyle: 'normal',
                        fontFamily: 'SCoreDream'
                    },
                    legend:{
                        display:false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0
                            }
                        }]
                    }
            }
        })
    }

    function drawDomesticVisitorDataByMonthBarChart(data, year, month) {
            var ctx = document.getElementById("domesticVisitorDataByMonthBarChart").getContext("2d");

            if(domesticVisitorDataByMonthBarChart != null) {
                domesticVisitorDataByMonthBarChart.destroy()
            }

            domesticVisitorDataByMonthBarChart = new Chart(ctx, {
                type: "bar",
                data: {
                    datasets: [
                    {
                        label: '방문자수',
                        data: [data[0]],
                        backgroundColor: '#3ca4f3'
                    },
                    {
                        label: '우짤래미',
                        data: [data[1]],
                        backgroundColor: '#cccccc'
                    },
                    {
                        label: '저쩔래미',
                        data: [data[2]],
                        backgroundColor: '#666666'
                    },
                    ]
                },
                options: {
                    responsive:false,
                    title:{
                        display:true,
                        text: '여행별',
                        fontSize: 12,
                        fontStyle: 'normal',
                        fontFamily: 'SCoreDream'
                    },
                    legend:{
                        display:false
                    },
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            display: false,
                            stacked: true
                        }]
                    }
                }
            })
        }

    function drawDomesticVisitorDataByMonthPieChart(data, year, month) {
        var ctx = document.getElementById("domesticVisitorDataByMonthPieChart").getContext("2d");

        if(domesticVisitorDataByMonthPieChart != null) {
            domesticVisitorDataByMonthPieChart.destroy()
        }

        domesticVisitorDataByMonthPieChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ['레저스포츠','회의및업무','휴양및관람','친지방문','교육여행','기타방문'],
                datasets: [
                {
                    label: '방문자수',
                    data: data
                },
                ]
            },
            options: {
                    title:{
                        display:true,
                        text: month + '월 내국인 방문목적',
                        fontStyle: 'normal',
                        fontSize: 18,
                        fontFamily: 'SCoreDream'
                    },
                    legend:{
                        display:true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0
                            }
                        }]
                    }
            }
        });
    }


    function getDomesticVisitorDataByYear(year) {
        var data = [];

        $.ajax({
           type: 'GET',
           url: '/api/v1/domesticVisitorData?year=' + year,
           async: false,
           success: function(response) {
                data = response;
           }
        })

        return data;
    };


    function getDomesticVisitorDataByMonth(year, month) {
        var data = [];

        $.ajax({
            type: 'GET',
            url: '/api/v1/domesticVisitorData/' + year+month+'01',
            async: false,
            success: function(response) {
                 data = response;
            }
         })
        console.log(data)
        return data;
    }

    function getForeignVisitorDataByYear(year) {
        var data = [];

        $.ajax({
           type: 'GET',
           url: '/api/v1/foreignVisitorData?year=' + year,
           async: false,
           success: function(response) {
                data = response;
           }
        })

        return data;
    };

    function getForeignVisitorDataByMonth(year, month) {
        var data = [];

        $.ajax({
           type: 'GET',
           url: '/api/v1/foreignVisitorData/'+ year+month+'01',
           async: false,
           success: function(response) {
               data = response;
           }
        })

        return data;
    };
    


    $(document).ready(function () {
        var year = 2022;

        var month = 11;

        var domesticVisitorDataByYear = getDomesticVisitorDataByYear(year);

        var foreignVisitorDataByYear = getForeignVisitorDataByYear(year);

        var totalVisitorDataByYear = [];

        for(var i=0; i<domesticVisitorDataByYear.length; i++) {
            var sum = domesticVisitorDataByYear[i].sum + foreignVisitorDataByYear[i].sum;

            totalVisitorDataByYear.push(sum);
        }

        drawTotalVisitorDataByYearChart(totalVisitorDataByYear, year)

        var domesticVisitorDataByMonth = getDomesticVisitorDataByMonth(year, month);

        var domesticVisitorDataByMonthAndTravelType = [domesticVisitorDataByMonth.independentTour, domesticVisitorDataByMonth.partialPackageTour, domesticVisitorDataByMonth.packageTour]

        drawDomesticVisitorDataByMonthBarChart(domesticVisitorDataByMonthAndTravelType, year, month)

        var domesticVisitorDataByMonthAndPurpose = [domesticVisitorDataByMonth.leisureSports, domesticVisitorDataByMonth.business, domesticVisitorDataByMonth.relaxation, domesticVisitorDataByMonth.visit, domesticVisitorDataByMonth.education, domesticVisitorDataByMonth.misc]

        drawDomesticVisitorDataByMonthPieChart(domesticVisitorDataByMonthAndPurpose, year, month)

        var foreignVisitorDataByMonth = getForeignVisitorDataByMonth(year, month);


    })
})(jQuery);
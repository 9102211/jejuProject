(function ($) {
    var now = new Date();
    var totalVisitorDataByYearChart;
    var domesticVisitorDataByMonthPieChart;
    var domesticVisitorDataByMonthBarChart;
    var foreignVisitorDataByMonthPieChart;


    var countOfVisitorDetail = new Vue({
        el : "#countOfVisitorDetail",
        data : {
            cumSumOfVisitor : {},
            countOfVisitor : {},
            averageOfVisitor : {}
        }
    })


    $('#year').on('change', function() {

        var year = $('#year').val();

        var month = $('#month').val();

        setYearData(year)

        setMonthData(year, month);
    })

    $('#month').on('change', function() {

        var year = $('#year').val();

        var month = $('#month').val();

        setMonthData(year, month);
    })

    function setYearData(year) {
        var domesticVisitorDataByYear = getDomesticVisitorDataByYear(year);

        var foreignVisitorDataByYear = getForeignVisitorDataByYear(year);

        var totalVisitorDataByYear = [];

        for(var i=0; i<domesticVisitorDataByYear.length; i++) {
            var sum = domesticVisitorDataByYear[i].sum + foreignVisitorDataByYear[i].sum;

            totalVisitorDataByYear.push(sum);
        }
        drawTotalVisitorDataByYearChart(totalVisitorDataByYear, year)
    }

    function setMonthData(year, month) {
        var domesticVisitorDataByMonth = getDomesticVisitorDataByMonth(year, month);

        var domesticVisitorDataByMonthAndTravelType = [domesticVisitorDataByMonth.independentTour, domesticVisitorDataByMonth.partialPackageTour, domesticVisitorDataByMonth.packageTour]

        drawDomesticVisitorDataByMonthBarChart(domesticVisitorDataByMonthAndTravelType, year, month)

        var domesticVisitorDataByMonthAndPurpose = [domesticVisitorDataByMonth.leisureSports, domesticVisitorDataByMonth.business, domesticVisitorDataByMonth.relaxation, domesticVisitorDataByMonth.visit, domesticVisitorDataByMonth.education, domesticVisitorDataByMonth.misc]

        drawDomesticVisitorDataByMonthPieChart(domesticVisitorDataByMonthAndPurpose, year, month)

        var foreignVisitorDataByMonth = getForeignVisitorDataByMonth(year, month);

        drawForeignVisitorDataByMonthPieChart(foreignVisitorDataByMonth, year, month);

        var cumSumOfVisitor = getCumSumOfVisitor(year+'0101', year+''+month+'01');

        var countOfVisitor = domesticVisitorDataByMonth.sum + foreignVisitorDataByMonth.sum;

        var lastDate = new Date(year, month, 0);

        var averageOfVisitor = Math.floor(countOfVisitor / lastDate.getDate());

        setCountOfVisitorDetail(cumSumOfVisitor, countOfVisitor, averageOfVisitor);
    }

//======================================== ?????? ??? ?????? ============================================
//
    function drawTotalVisitorDataByYearChart(data, year) {
        var ctx = document.getElementById("totalVisitorDataByYearChart").getContext("2d");

        if(totalVisitorDataByYearChart != null) {
            totalVisitorDataByYearChart.destroy()
        }

        totalVisitorDataByYearChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ['1???', '2???', '3???', '4???', '5???', '6???', '7???', '8???', '9???', '10???', '11???', '12???'],
                datasets: [
                {
                    label: '????????????',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: "#3ca4f3",
                    borderWidth: 1
                },
                ]
            },
            options: {
                    title:{
                        display:true,
                        text: year + '?????? ????????????',
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
//
//======================================== ????????? ??? ?????? ============================================
//
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
                        label: '????????????',
                        data: [data[0]],
                        backgroundColor: '#3ca4f3',
                        barThickness: 2
                    },
                    {
                        label: '???????????????',
                        data: [data[1]],
                        backgroundColor: '#E97EC4',
                        barThickness: 2
                    },
                    {
                        label: '?????????????????????',
                        data: [data[2]],
                        backgroundColor: '#FFB465',
                        barThickness: 2
                    },
                    ]
                },
                options: {
//                    responsive:false,
                    title:{
                        display:true,
                        text: '????????? ????????????',
                        fontSize: 18,
                        fontStyle: 'normal',
                        fontFamily: 'SCoreDream'
                    },
                    legend:{
                        display:false
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            stacked: true,
                            barThickness: 40
                        }],
                        yAxes: [{
                            display: false,
                            stacked: true
                        }]
                    }
                }
            })
        }
//
//======================================== ????????? ?????? ?????? ============================================
//
    function drawDomesticVisitorDataByMonthPieChart(data, year, month) {
        var ctx = document.getElementById("domesticVisitorDataByMonthPieChart").getContext("2d");

        if(domesticVisitorDataByMonthPieChart != null) {
            domesticVisitorDataByMonthPieChart.destroy()
        }

        domesticVisitorDataByMonthPieChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ['???????????????','???????????????','???????????????','????????????','????????????','????????????'],
                datasets: [
                {
                    label: '????????????',
                    data: data,
                    backgroundColor: ['#FFD265','#6A7FE1','#3ca4f3','#FFB465','#8B5DC9','#90E39D']
                }
                ]
            },
            options: {
                    title:{
                        display:true,
                        text: '????????? ????????????',
                        fontStyle: 'normal',
                        fontSize: 18,
                        fontFamily: 'SCoreDream'
                    },
                    legend:{
                        display:true,
                        position: 'bottom'
                    }
            }
        });
    }
//
//======================================== ????????? ?????? ?????? ============================================
//
    function drawForeignVisitorDataByMonthPieChart(data, year, month) {
            var ctx = document.getElementById("foreignVisitorDataByMonthPieChart").getContext("2d");

            if(foreignVisitorDataByMonthPieChart != null) {
                foreignVisitorDataByMonthPieChart.destroy()
            }

            foreignVisitorDataByMonthPieChart = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: ['??????','??????','??????','??????','?????????','???????????????','???????????????','?????????','??????','??????'],
                    datasets: [
                    {
                        label: '????????? ????????????',
                        data: [data.japan, data.china, data.hongkong, data.taiwan, data.singapore, data.malaysia, data.indonesia, data.vietnam, data.usa, data.misc],
                        backgroundColor: ['#FFD265', '#0074D9', '#90E39D', '#6495ED', '#FFB6C1', '#1E90FF', '#FFC0CB', '#ADD8E6', '#FFB465', '#87CEFA']
                    }
                    ]
                },
                options: {
                        title:{
                            display:true,
                            text: '????????? ?????????',
                            fontStyle: 'normal',
                            fontSize: 18,
                            fontFamily: 'SCoreDream'
                        },
                        legend:{
                            display:true,
                            position: 'bottom'
                        }
                }
            });
        }
//

//
//======================================== ????????? ?????? ?????? ????????? ??? ?????? ============================================
//

    function drawForecastDataBarChart(labels, data) {
        var ctx = document.getElementById("forecastDataBarChart").getContext("2d");

        forecastDataBarChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                {
                    label: '????????????',
                    data: data,
                    backgroundColor: 'rgba(99, 218, 105, 0.8)',
                    borderColor: "#63DA69",
                    borderWidth: 1
                },
                ]
            },
            options: {
                    title:{
                        display:true,
                        text: '????????? ?????? ???????????? ??????',
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


    function setCountOfVisitorDetail(cumSumOfVisitor, countOfVisitor, averageOfVisitor) {
        countOfVisitorDetail.cumSumOfVisitor = cumSumOfVisitor.toLocaleString('ko-KR');
        countOfVisitorDetail.countOfVisitor = countOfVisitor.toLocaleString('ko-KR');
        countOfVisitorDetail.averageOfVisitor = averageOfVisitor.toLocaleString('ko-KR');
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

    function getCumSumOfVisitor(startDate, endDate){
        var cumSum = 0;

        $.ajax({
           type: 'GET',
           url: '/api/v1/domesticVisitorData/cumSum?startDate='+startDate+'&endDate='+endDate,
           async: false,
           success: function(response) {
               cumSum += response;

           }
        })

        $.ajax({
           type: 'GET',
           url: '/api/v1/foreignVisitorData/cumSum?startDate='+startDate+'&endDate='+endDate,
           async: false,
           success: function(response) {
               cumSum += response;
           }
        })

        return cumSum;
    }

    function getForecastData(){

        forecast = {
            forecastData : [],
            forecastDataLabels : []
        }

        $.ajax({
            type: 'GET',
            url: '/api/v1/forecastData',
            async: false,
            success: function(response) {
                response.forEach((data)=>{
                    forecast.forecastData.push(data.countOfVisitor);
                    forecast.forecastDataLabels.push(data.month);
                })
            }
         })
         return forecast;
    }


    $(document).ready(function () {
        var year = 2022;

        var month = 11;

        setYearData(year)

        setMonthData(year, month);

        var forecast = getForecastData();

        drawForecastDataBarChart(forecast.forecastDataLabels, forecast.forecastData)

    })
})(jQuery);
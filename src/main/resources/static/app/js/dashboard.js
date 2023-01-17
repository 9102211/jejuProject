var year = $("#year");

var category = $("#category");

var legend = $("#legend");

var config;

var configs = {};

var myChart;

var table = $("#table");

const imagePath = "/images/table/";

$(document).ready(function () {
    setCategory(year.val());
    setLegend(year.val(), category.val());
    setChart(year.val(), category.val(), legend.val());
    setTable(year.val(), category.val(), legend.val());
});

year.on('change', function () {
    setCategory(year.val());
    setLegend(year.val(), category.val());
    setChart(year.val(), category.val(), legend.val());
    setTable(year.val(), category.val(), legend.val());
})

function setCategory(year) {
    category.empty();
    if(year === '2022') {
        category.append('<option>렌터카 불만사항</option>');
        category.append('<option>렌터카 물가 인식</option>');
        category.append('<option>여행에 필요한 정보</option>');
        category.append('<option>물가의 여행 영향도</option>');
        category.append('<option>물가 고려되는 항목</option>');
    }else if(year === '2021') {
        category.append('<option>제주 여행에 필요한 정보</option>');
    }else if(year === '2020') {
        category.append('<option>제주 여행에 필요한 정보</option>');
    }else if(year === '2019') {
        category.append('<option>제주 여행에 필요한 정보</option>');
    }else {
        category.append('<option>제주 여행에 필요한 정보</option>');
    }
}

category.on('change', function () {
    setLegend(year.val(), category.val());
    setChart(year.val(), category.val(), legend.val());
    setTable(year.val(), category.val(), legend.val());
})

function setLegend(year, category) {
    legend.empty();
    if(year === '2022') {
        legend.append('<option>연령별</option>')
    }

    if(year === '2022' && category === '여행에 필요한 정보') {
        legend.append('<option>직업별</option>')
    }
}

legend.on('change', function () {
    setChart(year.val(), category.val(), legend.val());
    setTable(year.val(), category.val(), legend.val());
})

function setChart(year, category, legend) {
    if(myChart != null) {
        myChart.destroy();
    }
    config = configs[year+'-'+category+'-'+legend];
    var ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, config);
}

function setTable(year, category, legend) {
    $('#table').attr('src', imagePath+year+'-'+category+'-'+legend+'.png');
}

window.chartColors = {
    red: 'rgb(255,250,195)',
    orange: 'rgb(253,210,194)',
    yellow: 'rgb(182,178,215)',
    green: 'rgb(219,233,198)',
    blue: 'rgb(186,227,247)',
    purple: 'rgb(233,208,229)',
    grey: 'rgb(8,64,129)',
    mycolor : 'rgb(75, 192, 192)'
};

configs["2022-렌터카 불만사항-연령별"] = {
    type: 'bar',
    data: {
        labels: ['비싼 가격', '예약이 어려움', '원하는 차량 없음', '차량 부실','호객행위',
            '불법주차', '직원 불친절', '취소(환불) 어려움', '기타', '불편사항 없음'],
        datasets: [{
            label: "15-20세",
            backgroundColor: window.chartColors.red,
            data: [45.5,0.0,18.2,0.0,0.0,18.2,0.0,0.0,0.0,18.2],
            fill: false,
        },
            {
                label: "21-30세",
                backgroundColor: window.chartColors.orange,
                data: [40.6	,12.9,12.9,8.9,	4.0,3.0,3.0	,1.0,0.0,13.9],
                fill: false,
            },
            {
                label: "31-40세",
                backgroundColor: window.chartColors.yellow,
                data: [45.9	,10.3,8.8,7.7,3.1,2.6,2.1,1.5,0.0,18.0],
                fill: false,
            },
            {
                label: "41-50세",
                backgroundColor: window.chartColors.green,
                data: [58.8,6.7,8.5,6.1,3.6,1.2,0.6,0.0,0.6,13.9],
                fill: false,
            },
            {
                label: "51-60세",
                backgroundColor: window.chartColors.blue,
                data: [45.3,9.3,10.5,2.3,4.7,0.0,0.0,0.0,0.0,27.9],
                fill: false,
            },
            {
                label: "61세 이상",
                backgroundColor: window.chartColors.purple,
                data: [43.8,6.2,3.1,6.2,0.0,0.0,12.5,0.0,0.0,28.1],
                fill: false,
            }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        title:{
            display:true,
            text:'2022년도 연령별 렌터카 불만사항 비율'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        elements:{
            point:{radius:1}
        },
        hover: {
            mode: 'X',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'seq'
                },
                stacked: false
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                },
                stacked: false
            }]
        }
    }
};

configs["2022-렌터카 물가 인식-연령별"] = {
    type: 'bar',
    data: {
        labels: ['매우 저렴하다', '저렴하다', '보통이다', '비싸다', '매우 비싸다'],
        datasets: [
            {
                label: "15-20세",
                backgroundColor: window.chartColors.red,
                data: [0, 3.0, 39.4, 48.5, 9.1],
                fill: false,
            },
            {
                label: "21-30세",
                backgroundColor: window.chartColors.orange,
                data: [0, 4.6, 32.0, 49.0, 14.4],
                fill: false,
            },
            {
                label: "31-40세",
                backgroundColor: window.chartColors.yellow,
                data: [0, 4.7, 21.6, 48.2, 25.5],
                fill: false,
            },
            {
                label: "41-50세",
                backgroundColor: window.chartColors.green,
                data: [0.3, 2.9, 23.8, 44.4, 28.6],
                fill: false,
            },
            {
                label: "51-60세",
                backgroundColor: window.chartColors.blue,
                data: [0, 2.6, 25.8, 49.7, 21.9],
                fill: false,
            },
            {
                label: "61세 이상",
                backgroundColor: window.chartColors.purple,
                data: [1.5, 1.5, 27.3, 43.9, 25.8],
                fill: false,
            }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        title:{
            display:true,
            text:'2022년도 연령별 렌터카 물가 인식'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        elements:{
            point:{radius:1}
        },
        hover: {
            mode: 'X',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'seq'
                },
                stacked: false
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                },
                stacked: false
            }]
        }
    }
};

configs["2022-여행에 필요한 정보-연령별"] = {
    type: 'bar',
    data: {
        labels: ['방문지 정보', '이동거리 및 교통편', '음식 정보', '쇼핑 장소', '숙박시설', '금융 정보', '무료WI-FI', '기타', '코로나 확진자수/동선', '병원/코로나 진료소', '코로나 방역'],
        datasets: [
            {
                label: "15-20세",
                backgroundColor: window.chartColors.red,
                data: [18.2, 27.3, 15.2, 0, 36.4, 3, 0, 0, 0, 0, 0],
                fill: false,
            },
            {
                label: "21-30세",
                backgroundColor: window.chartColors.orange,
                data: [23.5, 19, 15.7, 3.3, 30.7, 5.2, 0.7, 0, 0, 0.7, 1.3],
                fill: false,
            },
            {
                label: "31-40세",
                backgroundColor: window.chartColors.yellow,
                data: [25.5, 11.9, 15.1, 4.7, 33.8, 2.5, 1.1, 0.4, 1.4, 0.4, 3.2],
                fill: false,
            },
            {
                label: "41-50세",
                backgroundColor: window.chartColors.green,
                data: [27.6, 16.8, 13.3, 1.9, 33.7, 2.9, 0, 0.3, 0.6, 0, 2.9],
                fill: false,
            },
            {
                label: "51-60세",
                backgroundColor: window.chartColors.blue,
                data: [27.1, 12.3, 16.1, 1.3, 37.4, 0.6, 0, 0, 1.9, 0, 3.2],
                fill: false,
            },
            {
                label: "61세 이상",
                backgroundColor: window.chartColors.purple,
                data: [16.7, 7.6, 18.2, 0, 47, 0, 1.5, 0, 3, 0, 6.1],
                fill: false,
            }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        title:{
            display:true,
            text:'2022년도 연령별 여행에 필요한 정보'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        elements:{
            point:{radius:1}
        },
        hover: {
            mode: 'X',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'seq'
                },
                stacked: false
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                },
                stacked: false
            }]
        }
    }
};

configs["2022-여행에 필요한 정보-직업별"] = {
    type: 'bar',
    data: {
        labels: ['방문지 정보', '이동거리 및 교통편', '음식 정보', '쇼핑 장소', '숙박시설', '금융 정보', '무료WI-FI', '기타', '코로나 확진자수/동선', '병원/코로나 진료소', '코로나 방역'],
        datasets: [
            {
                label: "학생",
                backgroundColor: window.chartColors.red,
                data: [18.5, 27.7, 13.8, 0, 35.4, 4.6, 0, 0, 0, 0, 0],
                fill: false,
            },
            {
                label: "사무/전문직",
                backgroundColor: window.chartColors.orange,
                data: [25.5, 14.3, 14.6, 2.9, 36.2, 2, 0.8, 0.2, 0.6, 0.2, 2.9],
                fill: false,
            },
            {
                label: "판매/기술직",
                backgroundColor: window.chartColors.yellow,
                data: [30.2, 12.3, 14.2, 4.7, 24.5, 7.5, 0, 0, 2.8, 0, 3.8],
                fill: false,
            },
            {
                label: "자영업",
                backgroundColor: window.chartColors.green,
                data: [18.6, 15.3, 11.9, 1.7, 44.1, 1.7, 0, 1.7, 3.4, 0, 1.7],
                fill: false,
            },
            {
                label: "전업주부",
                backgroundColor: window.chartColors.blue,
                data: [26, 11.7, 20.8, 0, 35.1, 1.3, 0, 0, 2.6, 0, 2.6],
                fill: false,
            },
            {
                label: "기타(무직 등)",
                backgroundColor: window.chartColors.purple,
                data: [13.3, 20, 3.3, 20, 0, 0, 0, 0, 3.3, 10],
                fill: false,
            }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        title:{
            display:true,
            text:'2022년도 직업별 여행에 필요한 정보'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        elements:{
            point:{radius:1}
        },
        hover: {
            mode: 'X',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'seq'
                },
                stacked: false
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                },
                stacked: false
            }]
        }
    }
};

configs["2022-물가의 여행 영향도-연령별"] = {
    type: 'bar',
    data: {
        labels: ['큰 영향을 주지 않는다', '영향을 주지 않는다', '보통이다', '영향을 준다', '큰 영향을 준다'],
        datasets: [
            {
                label: "15-20세",
                backgroundColor: window.chartColors.red,
                data: [3.0, 0, 45.5, 30.3, 21.2],
                fill: false,
            },
            {
                label: "21-30세",
                backgroundColor: window.chartColors.orange,
                data: [0, 4.6, 45.1, 32.7, 17.6],
                fill: false,
            },
            {
                label: "31-40세",
                backgroundColor: window.chartColors.yellow,
                data: [0, 4.7, 29.9, 47.5, 18.0],
                fill: false,
            },
            {
                label: "41-50세",
                backgroundColor: window.chartColors.green,
                data: [0.6, 3.8, 26.0, 47.3, 22.2],
                fill: false,
            },
            {
                label: "51-60세",
                backgroundColor: window.chartColors.blue,
                data: [1.3, 4.5, 33.5, 46.5, 14.2],
                fill: false,
            },
            {
                label: "61세 이상",
                backgroundColor: window.chartColors.purple,
                data: [3.0, 4.5, 31.8, 50, 10.6],
                fill: false,
            }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        title:{
            display:true,
            text:'2022년도 연령별 물가의 여행 영향도'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        elements:{
            point:{radius:1}
        },
        hover: {
            mode: 'X',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'seq'
                },
                stacked: false
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                },
                stacked: false
            }]
        }
    }
};


configs["2022-물가 고려되는 항목-연령별"] = {
    type: 'bar',
    data: {
        labels: ['숙박비', '식대', '커피/간식', '렌터카', '콘텐츠/관광지 이용료', '쇼핑(기념품/특산품 포함)', '기타'],
        datasets: [{
            label: "15-20세",
            backgroundColor: window.chartColors.red,
            data: [46.2,38.5,0,0,15.4,0,0],
            fill: false,
        },
            {
                label: "21-30세",
                backgroundColor: window.chartColors.orange,
                data: [32.4,37.0,16.7,13.0,0.9,0,0],
                fill: false,
            },
            {
                label: "31-40세",
                backgroundColor: window.chartColors.yellow,
                data: [48,25.5,8.5,15,2.5,0.5,0],
                fill: false,
            },
            {
                label: "41-50세",
                backgroundColor: window.chartColors.green,
                data: [45.5,29.0,5.1,17.6,2.8,0,0],
                fill: false,
            },
            {
                label: "51-60세",
                backgroundColor: window.chartColors.blue,
                data: [34.8,34.8,5.4,19.6,1.1,4.3,0],
                fill: false,
            },
            {
                label: "61세 이상",
                backgroundColor: window.chartColors.purple,
                data: [40,35,2.5,20,0,0,2.5],
                fill: false,
            }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        title:{
            display:true,
            text:'2022년도 연령별 물가 고려되는 항목'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        elements:{
            point:{radius:1}
        },
        hover: {
            mode: 'X',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'seq'
                },
                stacked: false
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                },
                stacked: false
            }]
        }
    }
};

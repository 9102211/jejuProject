var year = $("#year");

var category = $("#category");

var chart = $("#chart");

var table = $("#table");

var yearValue =  year.val();

$(document).ready(function () {
    setCategory(yearValue);
});

year.on('change', function () {
    yearValue = year.val();
    setCategory(yearValue);
})

function setCategory(year) {
    category.empty();
    if(year === '2022') {
        category.append('<option>제주 여행에 필요한 정보</option>');
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

function setChart() {

}

function setTable() {

}



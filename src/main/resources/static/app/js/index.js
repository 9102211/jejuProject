(function ($) {
// 날씨 api - fontawesome 아이콘
    var weatherIcon = {
        '01' : 'fas fa-sun',
        '02' : 'fas fa-cloud-sun',
        '03' : 'fas fa-cloud',
        '04' : 'fas fa-cloud-meatball',
        '09' : 'fas fa-cloud-sun-rain',
        '10' : 'fas fa-cloud-showers-heavy',
        '11' : 'fas fa-poo-storm',
        '13' : 'far fa-snowflake',
        '50' : 'fas fa-smog'
    };
    // 날씨 정보
    var weather = new Vue({
        el : '#weather',
        data : {
            icon : {},
            weatherDescription : {},
            temp : {},
            humidity : {},
            wind : {},
            city : {},
            cloud : {},
            tempMin : {},
            tempMax : {}
        }
    });

    $(document).ready(function () {
       getWeather();
    });

    // 날씨 api
    function getWeather() {
        var url = "https://api.openweathermap.org/data/2.5/weather?q=jeju&appid=4c898866d30a8fec71c8c393e0680b95";

        $.get(url, function(response) {
            weather.icon = weatherIcon[(response.weather[0].icon).substr(0,2)];
            weather.weatherDescription = response.weather[0].main;
            weather.temp = Math.floor(response.main.temp- 273.15) + 'º';
            weather.humidity = response.main.humidity+ ' %';
            weather.wind = response.wind.speed + ' m/s';
            weather.cloud = response.clouds.all +"%";
            weather.tempMin = Math.floor(response.main.temp_min- 273.15) + 'º';
            weather.tempMax = Math.floor(response.main.temp_max- 273.15) + 'º';

        })
      }


      function getBlogURL(){
        $.ajax({
            type: 'GET',
            url: 'http://192.168.0.59:5000/keyword/성산일출봉',
            contentType : 'application/json; charset=cp949',
            success: function(response) {
                 console.log(response)
            }
         })
      }

      getBlogURL()
})(jQuery);
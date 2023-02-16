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

    var weatherDescription = {
        '01' : '맑음',
        '02' : '흐림',
        '03' : '흐림',
        '04' : '흐림',
        '09' : '비.눈',
        '10' : '비.눈',
        '11' : '비.눈',
        '13' : '비.눈',
        '50' : '흐림'
    }

    var recommendContentByWeather = new Vue({
        el : '#recommendContentByWeather',
        data : {
            contentList : {}
        },
        methods : {
//            toMoreResults : function(){
//                location.href = '/tour?keyword='+searchResult.keyword
//            },
//
//            setContentId : function(id) {
//                contentId = id;
//            }
        }
    });

    var recommendContentByHistory = new Vue({
        el : '#recommendContentByHistory',
        data : {
            contentList : {}
        },
        methods : {
//            toMoreResults : function(){
//                location.href = '/tour?keyword='+searchResult.keyword
//            },
//
//            setContentId : function(id) {
//                contentId = id;
//            }
        }
    });

    var recommendNaverBlogByHistory = new Vue({
        el : '#recommendNaverBlogByHistory',
        data : {
            contentList : {}
        },
        methods : {

        }
    })

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
       var weatherCode = getWeather();
       getRecommendContentByWeather(weatherCode);
       var idList = getRecommend(getCookieWord('history'));
       getRecommendContentByHistory(idList)
    });

    // 날씨 api
    function getWeather() {
        var url = "https://api.openweathermap.org/data/2.5/weather?q=jeju&appid=4c898866d30a8fec71c8c393e0680b95";

        var weatherCode = '';

        $.ajax({
           type: 'GET',
           url: url,
           async: false,
           success: function(response) {
               weather.icon = weatherIcon[(response.weather[0].icon).substr(0,2)];
               weatherCode = (response.weather[0].icon).substr(0,2);
               weather.weatherDescription = response.weather[0].main;
               weather.temp = Math.floor(response.main.temp- 273.15) + 'º';
               weather.humidity = response.main.humidity+ ' %';
               weather.wind = response.wind.speed + ' m/s';
               weather.cloud = response.clouds.all +"%";
               weather.tempMin = Math.floor(response.main.temp_min- 273.15) + 'º';
               weather.tempMax = Math.floor(response.main.temp_max- 273.15) + 'º';
           }
        })

        return weatherCode;
      }

    function getRecommendContentByWeather(weatherCode) {
        $.get("/api/v1/content?category=tour&size=3&sort=random&weather=" + weatherDescription[weatherCode], function(response) {
            recommendContentByWeather.contentList = response.data;
        })
    }

    function getRecommendContentByHistory(idList) {
        $.get("/api/v1/content?idList=" + idList, function(response) {
            recommendContentByHistory.contentList = response.data;
        })
    }

    function getRecommend(keyword){
        var idList;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.0.59:5000/keyword/' + keyword,
            contentType : 'application/json; charset=cp949',
            async: false,
            success: function(response) {
                console.log(response)

                idList = response.contentList.join(",");

                recommendNaverBlogByHistory.contentList = response.naverBlogList;

            }
         })

         return idList;
    }

    function getCookieWord(name) {
      const cookieString = decodeURIComponent(document.cookie);
      const cookieList = cookieString.split(';');

      for (let i = 0; i < cookieList.length; i++) {
        let cookie = cookieList[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          let cookieValue = cookie.substring(name.length + 1);
          let cookieWords = cookieValue.split('|');
          return cookieWords.join(" ");;
        }
      }
      return null;
    }
})(jQuery);
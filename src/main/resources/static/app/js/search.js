(function ($) {
    var categoryList = ['tour', 'food', 'stay', 'shopping']

    var searchResult = new Vue({
        el : "#searchResult",
        data : {
            keyword : {}
        }
    })

    // 관광 정보
    var tour = new Vue({
        el : '#tour',
        data : {
            totalElements : {},
            contentList : {}
        },
        methods : {
            toMoreResults : function(){
                location.href = '/tour?keyword='+searchResult.keyword
            },

            showDetail : function(id) {
                console.log('오름')
            }
        }
    });

    var food = new Vue({
        el : '#food',
        data : {
            totalElements : {},
            contentList : {}
        },
        methods : {
            toMoreResults : function(){
                location.href = '/food?keyword='+searchResult.keyword
            }
        }
    });

    var stay = new Vue({
        el : '#stay',
        data : {
            totalElements : {},
            contentList : {}
        },
        methods : {
            toMoreResults : function(){
                location.href = '/stay?keyword='+searchResult.keyword
            }
        }
    });

    var shopping = new Vue({
        el : '#shopping',
        data : {
            totalElements : {},
            contentList : {}
        },
        methods : {
            toMoreResults : function(){
                location.href = '/shopping?keyword='+searchResult.keyword
            }
        }
    });

    var categoryMap = {'tour' : tour, 'food' : food, 'stay' : stay, 'shopping' : shopping};

    $(document).ready(function () {
        var url = new URL(window.location.href)

        var urlParams = url.searchParams;

        var keyword = urlParams.get('keyword')

        searchResult.keyword = keyword;

        for(var i=0; i<categoryList.length; i++) {
            searchStart(keyword, categoryList[i])
        }
    });

    function searchStart(keyword, category) {

        $.get("/api/v1/content?category="+category+"&keyword="+keyword+"&page=0&size=4&sort=search,desc", function (response) {
            categoryMap[category].totalElements = response.pagination.totalElements;
            categoryMap[category].contentList = response.data;
        })
    };

    function setDetail(id) {
        $.get("/api/v1/content/" + id, function (response) {
            content.content = response;
        });
    }

})(jQuery);
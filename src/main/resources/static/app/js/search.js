(function ($) {

    var contentId;

    var categoryList = ['tour', 'food', 'stay', 'shopping', 'rentalcar']

    var reviewPagination = {
        totalPages : 0,            // 전체 페이지수
        totalElements : 0,         // 전체 데이터수
        currentPage :  0,          // 현재 페이지수
        currentElements : 0        // 현재 데이터수
    }

    var content = new Vue({
        el : '#content-detail',
        data : {
            content : {},
            youtubeList : {},
            alternativeImage : '/images/noneimage.png',
            reviewList : {},
            contentIsClicked : true,
            reviewIsClicked : false
        },
        methods: {
            showContent : function() {
                if(!this.contentIsClicked) {
                    this.contentIsClicked = true
                    this.reviewIsClicked = false
                }
            },

            showReview : function() {
                if(!this.reviewIsClicked) {
                    this.reviewIsClicked = true
                    this.contentIsClicked = false
                }
            },
            showMore : function() {
                index = reviewPagination.currentPage + 1;
                setReview(index);
            },

            changeCondition : function () {
                setReview(0);
            }
        }
    })


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

            setContentId : function(id) {
                contentId = id;
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
            },
            setContentId : function(id) {
                contentId = id;
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
            },
            setContentId : function(id) {
                contentId = id;
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
            },
            setContentId : function(id) {
                contentId = id;
            }
        }
    });

    var rentalcar = new Vue({
        el : '#rentalcar',
        data : {
            totalElements : {},
            contentList : {},
            alternativeImage : '/images/noneimage.png'
        },
        methods : {
            toMoreResults : function(){
                location.href = '/rentalcar?keyword='+searchResult.keyword
            },
            setContentId : function(id) {
                contentId = id;
            }
        }
    });

    var categoryMap = {'tour' : tour, 'food' : food, 'stay' : stay, 'shopping' : shopping, 'rentalcar' : rentalcar};

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

            if(response.category === '관광지') {
//                setYoutube(response.title)
            }
        });
    }

    function setYoutube(keyword) {
        $.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&type=video&key=AIzaSyDFUmIFYT4Jn2W0oW0f0HH9NyzpK-jJnPo&q=제주 " + keyword +"vlog", function (response){
            content.youtubeList = response.items;
        });
    }


    function setReview(index) {
        var checked = $('#type').find("input[type='checkbox']:checked");
        var type = [];

        for(var i=0; i<checked.length; i++) {
            type.push(checked[i].value);
        }
        $.get("/api/v1/review?page=" + index + "&contentId=" + contentId + "&type=" + type, function (response) {

            if(index === 0) {
                content.reviewList = response.data;
            }else {
                content.reviewList = content.reviewList.concat(response.data);
            }

            reviewPagination = response.pagination;
        })
    }

    $('#content-detail').on('show.bs.modal', function (event) {
        setDetail(contentId);
        setReview(0);
        content.showContent();
    })

    $('.modal').on('hidden.bs.modal', function (e) {
        $('naver').prop('checked', true);
        $('kakao').prop('checked', true);
        $('google').prop('checked', true);
    });
})(jQuery);
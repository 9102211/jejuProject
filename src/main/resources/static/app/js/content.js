(function ($) {
    var maxBtnSize = 5;              // 검색 하단 최대 범위
    var indexBtn = [];               // 인덱스 버튼
    var category = window.location.pathname.replace('/', '');
    var keyword = '';
    var sort = '';

    // 페이징 처리 데이터
    var pagination = {
        totalPages : 0,            // 전체 페이지수
        totalElements : 0,         // 전체 데이터수
        currentPage :  0,          // 현재 페이지수
        currentElements : 0        // 현재 데이터수
    };

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

    // 페이지 정보
    var showPage = new Vue({
        el : '#showPage',
        data : {
            totalElements : {},
            categoryType : {},
            keyword : ''
        }
    });

    // 데이터 리스트
    var contentList = new Vue({
        el : '#contentList',
        data : {
            contentList : {},
            alternativeImage : '/images/noneimage.png',
        },
        methods: {
            showMarker: function(id) {
                for(var i=0; i<markers.length; i++) {
                    if(id === markers[i].id) {
                        kakao.maps.event.trigger(markers[i], 'click');
                    }
                }
            }
        }
    });

    // 페이지 버튼 리스트
    var pageBtnList = new Vue({
        el : '#pageBtn',
        data : {
            btnList : {}
        },
        methods: {
            indexClick: function (id) {
                searchStart(id-1)
            },
            previousClick:function () {
                searchStart(Math.floor(pagination.currentPage/5)*5-1);
            },
            nextClick:function () {
                searchStart((Math.floor((pagination.currentPage) / maxBtnSize)+1) * maxBtnSize);
            }
        }
    });

    var searchCondition = new Vue({
        el : '#searchCondition',
        methods: {
            changeSort: function () {
                searchStart(0)
            }
        }
    })

    $(document).ready(function () {
        var url = new URL(window.location.href)

        var urlParams = url.searchParams;

        if(urlParams.get('keyword') !== null) {
            keyword = urlParams.get('keyword');
            showPage.keyword = keyword;
        }

        if(category === 'food') {
            showPage.categoryType = '음식점';
        }else if(category === 'tour') {
            showPage.categoryType = '관광지';
        }else if(category === 'stay') {
            showPage.categoryType = '숙박';
        }else if(category === 'shopping') {
            showPage.categoryType = '쇼핑';
        }else if(category === 'rentalcar') {
            showPage.categoryType = '렌트카';
        }

        searchStart(0)
    });

    function searchStart(index) {
        //이전 마커 지우기
        deleteMarkers()
        if(currentOverlay != null) {
            currentOverlay.setMap(null)
        }

        var url = "/api/v1/content?category="+category+"&page="+index+"&sort="+$('#sort').val();

        if(keyword !== '') {
            url +="&keyword="+keyword;
        }

        $.get(url, function (response) {
            /* 데이터 셋팅 */
            // 페이징 처리 데이터
            indexBtn = [];
            pagination = response.pagination;

            //전체 페이지
            showPage.totalElements = pagination.totalElements;

            // 검색 데이터
            contentList.contentList = response.data

            //마커 그리기
            markers = new Array(response.data.length);
            setMarkers(response.data);

            // 이전버튼
            if(Math.floor(pagination.currentPage/maxBtnSize) === 0){
                $('#previousBtn').addClass("disabled")
            }else{
                $('#previousBtn').removeClass("disabled")
            }
            // 다음버튼
            if(Math.floor(pagination.currentPage/maxBtnSize) === Math.floor((pagination.totalPages-1)/maxBtnSize)){
                $('#nextBtn').addClass("disabled")
            }else{
                $('#nextBtn').removeClass("disabled")
            }
            // 페이징 버튼 처리
            var temp = Math.floor(pagination.currentPage / maxBtnSize);
            for(var i = 1; i <= maxBtnSize; i++){
                var value = i+(temp*maxBtnSize);

                if(value <= pagination.totalPages){
                    indexBtn.push(value)
                }
            }
            // 페이지 버튼 셋팅
            pageBtnList.btnList = indexBtn;

            // 제일 처음 랜더링 후 색상 처리
            setTimeout(function () {
                $('li[btn_id]').removeClass( "active" );
                $('li[btn_id='+(pagination.currentPage+1)+']').addClass( "active" );
            },50)
        });
    };

    function setDetail(id) {
        $.get("/api/v1/content/" + id, function (response) {
            content.content = response;
        });
    }

    function setReview(index) {
        var contentId = $('#content-detail').attr('content_id');
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
        var contentId = $('#content-detail').attr('content_id');
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
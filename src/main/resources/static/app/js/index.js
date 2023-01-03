(function ($) {

    var maxBtnSize = 5;              // 검색 하단 최대 범위
    var indexBtn = [];               // 인덱스 버튼

    // 페이징 처리 데이터
    var pagination = {
        totalPages : 0,            // 전체 페이지수
        totalElements : 0,         // 전체 데이터수
        currentPage :  0,          // 현재 페이지수
        currentElements : 0        // 현재 데이터수
    };

    // 페이지 정보
    var showPage = new Vue({
        el : '#showPage',
        data : {
            totalElements : {}
        }
    });

    // 데이터 리스트
    var rentalCarList = new Vue({
        el : '#rentalCarList',
        data : {
            rentalCarList : {}
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

    $(document).ready(function () {
        searchStart(0)
    });

    function searchStart(index) {
        console.log("index : " + index)

        //이전 마커 지우기
        deleteMarkers();

        if(currentOverlay != null) {
            currentOverlay.setMap(null);
        }

        $.get("/api/v1/rentalCar?page="+index, function (response) {
            /* 데이터 셋팅 */
            // 페이징 처리 데이터
            indexBtn = [];
            pagination = response.pagination;

            //전체 페이지

            showPage.totalElements = pagination.totalElements;
            showPage.currentPage = pagination.currentPage+1;
            // 검색 데이터

            rentalCarList.rentalCarList = response.data;
            // 이전버튼

            markers = new Array(response.data.length);

            //마커 그리기
            setMarkers(response.data);

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
    }

})(jQuery);
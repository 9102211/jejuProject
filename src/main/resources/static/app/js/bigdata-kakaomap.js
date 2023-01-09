var roadEventMarkers = [];
var roadConditionMarkers = [];
var roadCloseMarkers = [];
var currentInfoWindow;

var mapContainer = document.getElementById('map'), // 지도를 표시할 div

    mapOption = {
        center: new kakao.maps.LatLng(33.34, 126.49), // 지도의 중심좌표
        level: 9 // 지도의 확대 레벨
    };
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

$(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
});

/* 마커 삭제 */
function deleteMarkers(markers) {
    for(var i=0; i<markers.length; i++) {
        markers[i].iw.close();
        markers[i].setMap(null);
    }
}

/* 인포윈도우 삭제 */
function deleteInfoWindow(currentInfoWindow) {
    if(currentInfoWindow != null) {
        currentInfoWindow.close();
    }
}

/* 교통정보 레이어 */
$('#btn-traffic').on('click', function (e) {
    if(!$(e.target).hasClass('active')) {
        $(e.target).addClass('active')
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    }else {
        $(e.target).removeClass('active')
        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    }
});

/* 위험정보 버튼 이벤트 */
$('#btn-road-event').on('click', function (e) {
    if(!$(e.target).hasClass('active')) {
        $(e.target).addClass('active')
        setRoadEventMarkers()
    }else {
        $(e.target).removeClass('active')
        deleteMarkers(roadEventMarkers)
    }
})

/* 돌발상황 마커 생성*/
function setRoadEventMarkers() {
    $.get("/api/v1/roadEvent", function (response) {
        deleteMarkers(roadEventMarkers)

        roadEventMarkers = []

        var imageSrc = '/images/free-icon-warning.png',
            imageSize = new kakao.maps.Size(40, 40),
            imageOption = {offset : new kakao.maps.Point(20, 35)}

        response.forEach(function (roadEvent) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(roadEvent.lat, roadEvent.lon),
                image : new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            })

            var iwContent = '<div style="width: 150px">' +
                '<p class="text-danger m-0"><i class="bi bi-exclamation-lg"></i>도로 위험 정보</p>' +
                '<p class="mt-1 mb-0"> 상황 : ' + roadEventCode[roadEvent.code] + '</p>' +
                '<p class="mb-1 text-muted" style="font-size: 0.7rem">기준 : ' +roadEvent.lastUpdatedAt + '</p>' +
                '</div>'

            var infowindow = new kakao.maps.InfoWindow({
                position : marker.getPosition(),
                content : iwContent,
                removable : true
            })

            marker.iw = infowindow;

            kakao.maps.event.addListener(marker, 'click', function() {
                deleteInfoWindow(currentInfoWindow)
                currentInfoWindow = infowindow
                infowindow.open(map, marker)
            });

            roadEventMarkers.push(marker)
        })
    })
}

/* 도로통제 마커 생성*/
function setRoadCloseMarkers() {
    $.get("/api/v1/roadClose", function (response) {
        deleteMarkers(roadCloseMarkers)

        roadCloseMarkers = []

        var imageSrc = '/images/free-icon-warning.png',
            imageSize = new kakao.maps.Size(40, 40),
            imageOption = {offset : new kakao.maps.Point(20, 35)}

        response.forEach(function (roadClose) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(roadClose.lat, roadClose.lon),
                image : new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            })

            var iwContent = '<div style="width: 150px">' +
                '<p class="text-danger m-0"><i class="bi bi-sign-stop-fill"></i>도로 통제 정보</p>' +
                '<p class="mt-1 mb-0"> 상황 : ' + roadEventCode[roadEvent.code] + '</p>' +
                '<p class="mb-1 text-muted" style="font-size: 0.7rem">기준 : ' +roadEvent.lastUpdatedAt + '</p>' +
                '</div>'

            var infowindow = new kakao.maps.InfoWindow({
                position : marker.getPosition(),
                content : iwContent,
                removable : true
            })

            marker.iw = infowindow;

            kakao.maps.event.addListener(marker, 'click', function() {
                deleteInfoWindow(currentInfoWindow)
                currentInfoWindow = infowindow
                infowindow.open(map, marker)
            });

            roadCloseMarkers.push(marker)
        })
    })
}


/* 노면정보 버튼 이벤트 */
$('#btn-road-condition').on('click', function (e) {
    if(!$(e.target).hasClass('active')) {
        $(e.target).addClass('active')
        setRoadConditionMarkers()
    }else {
        $(e.target).removeClass('active')
        deleteMarkers(roadConditionMarkers)
    }
})

/* 노면정보 마커 생성*/
function setRoadConditionMarkers() {
    $.get("/api/v1/roadCondition", function (response) {
        deleteMarkers(roadConditionMarkers)

        roadConditionMarkers = []

        response.forEach(function (roadCondition) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(roadCondition.lat, roadCondition.lon)
            })

            var wrap = document.createElement('div');

            var title = document.createElement('p')
            title.appendChild(document.createTextNode('노면 정보'))
            wrap.appendChild(title)

            var content = document.createElement('div')
            content.className = 'border-top'

            var visibilty = document.createElement('p')
            visibilty.appendChild(document.createTextNode('시야 : ' + roadCondition.visibility))
            content.appendChild(visibilty);

            var snow =  document.createElement('p')
            snow.appendChild(document.createTextNode('적설 : ' + roadCondition.snow))
            content.appendChild(snow);

            var roadTemp = document.createElement('p')
            roadTemp.appendChild(document.createTextNode('노면 온도 : ' + roadCondition.roadTemp))
            content.appendChild(roadTemp);

            var waterFilm = document.createElement('p')
            waterFilm.appendChild(document.createTextNode('수막 : ' + roadCondition.waterFilm))
            content.appendChild(waterFilm);

            var friction = document.createElement('p')
            friction.appendChild(document.createTextNode('마찰계수 : ' + roadCondition.friction))
            content.appendChild(friction);

            var code = document.createElement('p')
            code.appendChild(document.createTextNode('코드 : ' + roadCondition.code))
            content.appendChild(code);

            for(var i=0; i<content.children.length; i++) {
                content.children[i].className = 'm-0'
            }

            wrap.appendChild(content)
            var iwContent = wrap;

            var infowindow = new kakao.maps.InfoWindow({
                position : marker.getPosition(),
                content : iwContent,
                removable : true
            })

            marker.iw = infowindow;

            kakao.maps.event.addListener(marker, 'click', function() {
                deleteInfoWindow(currentInfoWindow)
                currentInfoWindow = infowindow
                infowindow.open(map, marker)
            });
            roadConditionMarkers.push(marker)
        })
    })
}

function reload() {


}
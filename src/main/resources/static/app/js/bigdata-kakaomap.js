var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.34, 126.49), // 지도의 중심좌표
        level: 9 // 지도의 확대 레벨
    };
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var roadEventMarkers = [],
    roadConditionMarkers = [];

var gasStationMarkers = [],
    evChargingStationMarkers = [],
    cluster = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 5 // 클러스터 할 최소 지도 레벨
});

var currentInfoWindow;

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

        deleteMarkers(roadEventMarkers)
        roadEventMarkers = []

        setRoadEventMarkers()
        setRoadCloseMarkers()
        setRoadWorkMarkers()
    }else {
        $(e.target).removeClass('active')
        deleteMarkers(roadEventMarkers)
    }
})

/* 돌발상황 마커 생성*/
function setRoadEventMarkers() {
    $.get("/api/v1/roadEvent", function (response) {

        var imageSrc = '/images/markers/road-event.png',
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

        var imageSrc = '/images/markers/road-event.png',
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
                '<p class="mt-1 mb-0"> 상황 :  </p>' +
                '<p class="mb-1 text-muted" style="font-size: 0.7rem">기준 : ' +roadClose.lastUpdatedAt + '</p>' +
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

/* 도로작업 마커 생성 */
function setRoadWorkMarkers() {
    $.get("/api/v1/roadWork", function (response) {

        var imageSrc = '/images/markers/road-event.png',
            imageSize = new kakao.maps.Size(40, 40),
            imageOption = {offset : new kakao.maps.Point(20, 35)}

        response.forEach(function (roadClose) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(roadClose.lat, roadClose.lon),
                image : new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            })

            var iwContent = '<div style="width: 150px">' +
                '<p class="text-danger m-0"><i class="bi bi-sign-stop-fill"></i>도로 작업 정보</p>' +
                '<p class="mt-1 mb-0"> 상황 :  </p>' +
                '<p class="mb-1 text-muted" style="font-size: 0.7rem">기준 : ' +roadClose.lastUpdatedAt + '</p>' +
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

        var imageSrc = '',
            imageSize = new kakao.maps.Size(40, 40),
            imageOption = {offset : new kakao.maps.Point(20, 35)}

        response.forEach(function (roadCondition) {

            if(roadCondition.code === '1' || roadCondition.code === '2' || roadCondition.code === '5') {
                imageSrc = '/images/markers/road-condition-water.png';
            }else if(roadCondition.code === '3' || roadCondition.code === '4' || roadCondition.code === '6' || roadCondition.code === '8') {
                imageSrc = '/images/markers/road-condition-snow.png';
            }else if(roadCondition.code === '0') {
                imageSrc = '/images/markers/road-condition-dry.png';
            }else {
                imageSrc = '/images/markers/road-condition-noInfo.png';
            }

            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(roadCondition.lat, roadCondition.lon),
                image : new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            })

            var roadTemp = roadCondition.roadTemp == -1 && roadCondition.code === '99' ? '정보없음' : roadCondition.roadTemp;
            var visibility = roadCondition.visibility == -1 ? '정보없음' : roadCondition.visibility;
            var snow = roadCondition.snow == -1 ? '정보없음' : roadCondition.snow;
            var waterFilm = roadCondition.waterFilm == -1 ? '정보없음' : roadCondition.waterFilm;
            var friction = roadCondition.friction == -1 ? '정보없음' : roadCondition.friction;


            var iwContent = '<div class="p-2" style="width: 150px">' +
                '<p class="mb-2 h5">노면 정보</p>' +
                '<p class="m-0" style="font-size: 0.9rem"> 시야 : ' + visibility + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem"> 적설 : ' + snow + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem"> 노면온도 : ' + roadTemp + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem"> 수막두께 : ' + waterFilm + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem"> 마찰계수 : ' + friction + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem"> 상황 : ' + roadConditionCode[roadCondition.code] + '</p>' +
                '<p class="mb-1 text-muted" style="font-size: 0.7rem">기준 : ' +roadCondition.createdAt + '</p>' +
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
            roadConditionMarkers.push(marker)
        })
    })
}



/* 주유소 버튼 이벤트 */
$('#btn-gas-station').on('click', function(e) {

    if($('#btn-ev-charging-station').hasClass('active')) {
        $('#btn-ev-charging-station').removeClass('active')
        deleteMarkers(evChargingStationMarkers)
        cluster.clear()
    }

    if(!$(e.target).hasClass('active')) {
        $(e.target).addClass('active')
        setGasStationMarkers()
    }else {
        $(e.target).removeClass('active')
        deleteMarkers(gasStationMarkers)
        cluster.clear();
    }
})

/* 주유소 마커 생성 */
function setGasStationMarkers() {
    $.get("/api/v1/gasStation", function (response) {
        deleteMarkers(gasStationMarkers)
        gasStationMarkers = []
        cluster.clear();

        var imageSrc = '/images/markers/gas-station.png',
            imageSize = new kakao.maps.Size(40, 40),
            imageOption = {offset : new kakao.maps.Point(20, 35)}

        response.forEach(function (gasStation) {
            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(gasStation.lat, gasStation.lon),
                image : new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            })

            var iwContent = '<div class="p-2" style="width: 450px">' +
                '<p class="mb-2 h5">'+gasStation.name+'</p>' +
                '<p class="m-0" style="font-size: 0.9rem"><i class="bi bi-geo-alt-fill"></i> ' + gasStation.addr + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem"><i class="bi bi-telephone"></i> ' +gasStation.tel + '</p>' +
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

            gasStationMarkers.push(marker)
            cluster.addMarkers(gasStationMarkers)
        })
    })
}


/* 전기차 충전소 버튼 이벤트 */
$('#btn-ev-charging-station').on('click', function(e) {

    if($('#btn-gas-station').hasClass('active')) {
        $('#btn-gas-station').removeClass('active')
        deleteMarkers(gasStationMarkers)
        cluster.clear()
    }

    if(!$(e.target).hasClass('active')) {
        $(e.target).addClass('active')
        setEvChargingStationMarkers()
    }else {
        $(e.target).removeClass('active')
        deleteMarkers(evChargingStationMarkers)
        cluster.clear()
    }
})


function setEvChargingStationMarkers() {
    $.get("/api/v1/evChargingStation", function (response) {
        deleteMarkers(evChargingStationMarkers)
        evChargingStationMarkers = []
        cluster.clear();
        var imageSrc =  '',
            imageSize = new kakao.maps.Size(40, 40),
            imageOption = {offset : new kakao.maps.Point(20, 35)}

        response.forEach(function (evChargingStation) {
            if(evChargingStation.slow > 0 || evChargingStation.fast > 0) {
                imageSrc = '/images/markers/EV.png';
            }else {
                imageSrc = '/images/markers/EV-full.png';
            }

            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(evChargingStation.lat, evChargingStation.lon),
                image : new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            })

            var free = evChargingStation.free === 'Y' ? '무료주차' : '유료주차';
            var typeOne = evChargingStation.countOfTypeOne > 0 ? 'DC차데모 : ' + evChargingStation.countOfTypeOne+' ' : '';
            var typeTwo = evChargingStation.countOfTypeTwo > 0 ? 'AC완속 : ' + evChargingStation.countOfTypeTwo+' ' : '';
            var typeThree = evChargingStation.countOfTypeThree > 0 ? 'DC차데모+AC3상 : ' + evChargingStation.countOfTypeThree+' ' : '';
            var typeFour = evChargingStation.countOfTypeFour > 0 ? 'DC콤보 : ' + evChargingStation.countOfTypeFour+' ' : '';
            var typeFive = evChargingStation.countOfTypeFive > 0 ? 'DC차데모+DC콤보 : ' + evChargingStation.countOfTypeFive+' ' : '';
            var typeSix = evChargingStation.countOfTypeSix > 0 ? 'DC차데모+AC3상 : ' + evChargingStation.countOfTypeSix+' ' : '';

            var slow = evChargingStation.slow > 0 ? evChargingStation.slow : 0;
            var fast = evChargingStation.fast > 0 ? evChargingStation.fast : 0;

            var iwContent = '<div class="p-2" style="width: 450px">' +
                '<p class="mb-2 h5">'+evChargingStation.name+'</p>' +
                '<p class="m-0" style="font-size: 0.9rem"><i class="bi bi-geo-alt-fill"></i> ' + evChargingStation.addr + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem"><i class="bi bi-clock"></i> ' + evChargingStation.useTime + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem"><i class="bi bi-cash"></i> ' + free + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem"><i class="bi bi-ev-station-fill"></i> ' + typeOne + typeTwo + typeThree + typeFour + typeFive + typeSix + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem"><i class="bi bi-telephone"></i> ' +evChargingStation.bcall + '</p>' +
                '<p class="m-0" style="font-size: 0.9rem">급속 : '+ fast +' 완속 : '+ slow + '</p>' +
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

            evChargingStationMarkers.push(marker)
            cluster.addMarkers(evChargingStationMarkers)
        })
    })
}
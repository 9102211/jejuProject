var mapContainer = document.getElementById('map'), // 지도를 표시할 div 

mapOption = { 
    center: new kakao.maps.LatLng(33.37505849442243, 126.58152392245819), // 지도의 중심좌표
    level: 9 // 지도의 확대 레벨
}; 

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var markers = [];
var currentOverlay;

function deleteMarkers() {
    for(var i=0; i<markers.length; i++) {
        markers[i].setMap(null);
    }
}

function deleteOverlay(overlay) {
    if(currentOverlay != null && currentOverlay !== overlay) {
        currentOverlay.setMap(null);
    }
}

function setMarkers(rentalCarList) {
    var idx = 0;

    rentalCarList.forEach(function (rentalCar){
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(rentalCar.lat, rentalCar.lon)
        })

        markers[idx++] = marker;

        var wrap = document.createElement('div');
        wrap.className = 'wrap';

        var info = document.createElement('div');
        info.className = 'info';
        wrap.appendChild(info)

        var title = document.createElement('div');
        title.className = 'title';
        title.appendChild(document.createTextNode(rentalCar.name));
        info.appendChild(title);

        var close = document.createElement('div');
        close.className = 'close';
        close.onclick = function() {
            overlay.setMap(null);
        };
        title.appendChild(close);

        var body = document.createElement('div');
        body.className = 'body';
        info.appendChild(body);

        var imgDiv = document.createElement('div');
        imgDiv.className = 'img';
        body.appendChild(imgDiv);
        var img = document.createElement('img');
        img.src = '/images/rent.png';
        img.style = 'width:73px; height:70px';
        imgDiv.appendChild(img);

        var desc = document.createElement('div');
        desc.className = 'desc';
        var ellipsis = document.createElement('div');
        ellipsis.className = 'ellipsis';
        ellipsis.appendChild(document.createTextNode(rentalCar.address))
        desc.appendChild(ellipsis);

        var tel = document.createElement('div');
        tel.className = 'tel ellipsis';
        tel.appendChild(document.createTextNode(rentalCar.tel))
        desc.appendChild(tel);

        var a = document.createElement('a');
        a.href = '/rentalCar/' + rentalCar.id;
        a.target= '_blank';
        a.className = 'link';
        a.appendChild(document.createTextNode('자세히 보기'))
        desc.appendChild(document.createElement('div').appendChild(a));

        body.appendChild(desc);

        var overlay = new kakao.maps.CustomOverlay({
            position: marker.getPosition(),
            content: wrap
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            deleteOverlay(overlay);
            currentOverlay = overlay;
            overlay.setMap(map);
        });
    })
}

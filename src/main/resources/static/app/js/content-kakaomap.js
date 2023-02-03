var mapContainer = document.getElementById('map'), // 지도를 표시할 div 

mapOption = { 
    center: new kakao.maps.LatLng(33.34, 126.53), // 지도의 중심좌표
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

function setMarkers(contentList) {
    var idx = 0;

    contentList.forEach(function (content){
        var imageSrc = '/images/markers/rental-car.png',
            imageSize = new kakao.maps.Size(40, 40),
            imageOption = {offset : new kakao.maps.Point(20, 35)}

        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(content.lat, content.lon),
            image : new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        })

        marker.id = content.id;

        markers[idx++] = marker;

        var wrap = document.createElement('div');
        wrap.className = 'wrap';
        wrap.style = 'cursor: pointer;'

        var info = document.createElement('div');
        info.className = 'info';
        wrap.appendChild(info)

        var title = document.createElement('div');
        title.className = 'title';
        title.appendChild(document.createTextNode(content.title));
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
        img.src = content.image;
        img.style = 'width:73px; height:70px';
        imgDiv.appendChild(img);

        var desc = document.createElement('div');
        desc.className = 'desc';
        var ellipsis = document.createElement('div');
        ellipsis.className = 'ellipsis';
        ellipsis.appendChild(document.createTextNode(content.address))
        desc.appendChild(ellipsis);

        var tel = document.createElement('div');
        tel.className = 'tel ellipsis';
        tel.appendChild(document.createTextNode(content.tel))
        desc.appendChild(tel);

        var a = document.createElement('a');
        a.className = 'link stretched-link';
        a.appendChild(document.createTextNode('상세정보/리뷰보기'))
        a.setAttribute('data-toggle', 'modal')
        a.setAttribute('data-target', '#content-detail')
        a.addEventListener('click', function () {
            document.getElementById('content-detail').setAttribute('content_id', content.id);
        })
        desc.appendChild(document.createElement('div').appendChild(a));

        body.appendChild(desc);

        var overlay = new kakao.maps.CustomOverlay({
            position: marker.getPosition(),
            content: wrap
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            map.panTo(marker.getPosition());
            deleteOverlay(overlay);
            currentOverlay = overlay;
            overlay.setMap(map);
        });
    })
}

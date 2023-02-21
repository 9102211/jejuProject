map.setZoomable(false)

window.addEventListener('keydown', function(event) {
    if(event.key === 'Control') {
        var mapScreen = $('#map-screen')
        console.log(mapScreen.stop(true))
        mapScreen.removeClass('d-flex');
        mapScreen.addClass('d-none');
        mapScreen.css('opacity', '0');
        map.setZoomable(true)
    }
})

window.addEventListener('keyup', function(event) {
    if(event.key === 'Control') {
        map.setZoomable(false)
    }
})

$('#zoom-in').on('click', function() {
    var level = map.getLevel();
    map.setLevel(level - 1, {anchor: map.getCenter()});
})

$('#zoom-out').on('click', function() {
    var level = map.getLevel();
    map.setLevel(level + 1, {anchor: map.getCenter()});
})

$('#map').on('wheel', function(e) {
    var mapScreen = $('#map-screen')

    if (e.ctrlKey || mapScreen.queue().length > 0) {
        e.preventDefault();
        return;
    }

    mapScreen.removeClass('d-none');
    mapScreen.addClass('d-flex');
    mapScreen.animate({opacity: 0.5}, 1000);

    setTimeout(clearMapScreen, 2000)
});

function clearMapScreen() {
    var mapScreen = $('#map-screen')

    mapScreen.animate({opacity: 0}, 1000, function() {
        mapScreen.removeClass('d-flex');
        mapScreen.addClass('d-none');
    });
}


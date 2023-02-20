map.setZoomable(false)

window.addEventListener('keydown', function(event) {
    console.log(event.key)
    if(event.key === 'Control') {
        map.setZoomable(true)
    }
})

window.addEventListener('keyup', function(event) {
    if(event.key === 'Control') {
        map.setZoomable(false)
    }
})

document.getElementById('zoom-in').addEventListener('click', function() {
  var level = map.getLevel();
  map.setLevel(level - 1, {anchor: map.getCenter()});
});

document.getElementById('zoom-out').addEventListener('click', function() {
  var level = map.getLevel();
  map.setLevel(level + 1, {anchor: map.getCenter()});
});
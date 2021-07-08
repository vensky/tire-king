ymaps.ready(init);
function init(){
    var map = new ymaps.Map("map", {
        center: [55.77, 37.69],
        controls: ['zoomControl'],
        behaviors: ['drag'],
        zoom: 15
    });

    var placemark = new ymaps.Placemark([55.77, 37.69], {
        iconContent: '<img src="apple-touch-icon-180.png" width="16" height="16" alt="Balloon" style="width: 18px; heigth: 18px;">',
        hintContent: 'Tire King',
        balloonContent: 'Tire King Москва<br>Выездной шиномонтаж<br>Круглосуточно, без выходных',
    },
    {
        iconColor: '#f24622',
    });
    map.geoObjects.add(placemark);
}

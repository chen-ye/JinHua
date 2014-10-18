var map;
var markArr = [];
var fb = new Firebase("https://tankrobot.firebaseio.com/");

function panToPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    panToCoords(lat, long);
}

function panToCoords(lat, long) {
    for (var marker in markArr) {
        markArr[marker].setMap(null);
    }
    markArr = [];

    var markerImage = {
        url: 'img/Map Marker-01.png',
        anchor: new google.maps.Point(24,30)
    }

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: "",
        map: map,
        icon: markerImage
    });

    map.panTo(marker.getPosition());
    markArr.push(marker);
}

fb.child("location").on("value", function(snapshot) {
    var loc = eval("[" + snapshot.val()+ "]");
    // "(47.6577738,-122.3018555)"
    var lat = loc[0];
    var long = loc[1];
  
    // var position = {coords: {latitude: lat, longitude: long}};
  
    //navigator.geolocation.getCurrentPosition(panToPosition);
    console.log("Updated");
    console.log(lat);
    console.log(long);
    panToCoords(lat, long);
});

function onPositionUpdate(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var midnightCommanderStyle = 
    [{"featureType":"water","stylers":[{"color":"#021019"}]},{"featureType":"landscape","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"transit","stylers":[{"color":"#146474"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]}]

    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 18,
        disableDefaultUI: true,
        styles: midnightCommanderStyle
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

//setInterval(function(e) {
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(panToPosition);
//    }
//}, 5000);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onPositionUpdate);
}
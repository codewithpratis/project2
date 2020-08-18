var lasVegasCoord = [36.17, -115.14];
var mapZoomLevel = 5;


var myMap = L.map("map-id", {
    center: lasVegasCoord,
    zoom: 13
});
// Define streetmap and darkmap layers
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "outdoors-v10",
        accessToken: API_KEY
    }).addTo(myMap)




var url = "/api"

d3.json(url, function (data) {
    var business = data.businesses;

    for (var i =0; i < 1000; i++){
        var location = ([business[i].latitude, business[i].longitude]);
        console.log(location)
        if(location) {
            var mark = L.marker(location).addTo(myMap);
            mark.bindPopup("<h3>" + business[i].name + 
            "</h3><h3>" + "Rating: " + business[i].stars  + " / 5.0" +
            "<hr>" + "Review Count: " + business[i].review_count +
            "<hr>" + "Address: " + business[i].address + "</h3>");
        }
    }
});







var lasVegasCoord = [36.17, -115.14];

var myMap = L.map("map-id", {
  // updated to Las Vegas
  center: lasVegasCoord,
  zoom: 13
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var url = "/api";

d3.json(url, function (data) {

  var business = data.businesses;
  var heatArray = [];

  for (var i = 0; i < 1000; i++) {
    var location = ([business[i].latitude, business[i].longitude]);
    console.log(location);
    if (location) {
      var mark = L.marker(location).addTo(myMap);
      heatArray.push(location);
      mark.bindPopup("<h3>" + business[i].name + "</h3>" + 
      "<h3>" + "Rating: " + business[i].stars  + " / 5.0" +
      "<hr>" + "Review Count: " + business[i].review_count +
      "<hr>" + "Address: " + business[i].address + "</h3>");
    }
  }
  var heat = L.heatLayer(heatArray, {
    radius: 100,
    blur: 35
  }).addTo(myMap);
});

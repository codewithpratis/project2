var lasVegasCoord = [36.17, -115.14];
var mapZoomLevel = 5;
/* restaurant = '../../thousandRestaurant.csv' */



// Define streetmap and darkmap layers
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});
var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "outdoors-v10",
  accessToken: API_KEY
});
var satelite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  id: 'mapbox.streets',
  attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
});



var myMap = L.map("map-id", {
  center: lasVegasCoord,
  zoomDelta: 1,
  zoomSnap: 0,
  layers: [lightmap, streetmap]
});

// base maps
var baseMaps = {
  "Light Map": lightmap,
  "Dark Map": dark,
  "Street Map": streetmap,
  "Satelite": satelite
};

/* var overlayMaps = {
  "Restaurants": restaurant
};
 */
L.control.layers(baseMaps, {
  collapsed: false
});

/* var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/yelpBusiness";

MongoClient.connect(url, function(err, db) {
  if(err) throw err;
  var dbo = db.db("mydb");
  
})  */

/* var MongoClient = require('/api'); */

// Connect to the db

/* var mongo = require('mongodb');
var url = "mongodb://localhost:27017/yelpBusiness";
mongo.MongoClient.connect(url, function(err, db) {
if (err) throw err;
console.log("Database created!");
db.close();
});
 */

MongoClient.connect("mongodb://localhost:27017/yelpBusiness", function (err, db) {
    
    db.collection('openVegas', function (err, collection) {
        
         collection.find().toArray(function(err, items) {
            if(err) throw err;    
            console.log(items);            
        });
        
    });
  })

/* var runLayer = omnivore.csv('thousandRestaurant.csv', null, L.geoJson(null, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup("<h3>" + "Name: " + feature.properties.name +
      "</h3><h3>" + "Rating: " + feature.properties.stars  + " / 5.0" +
      "<hr>" + "Review Count: " + feature.properties.review_count +
      "<hr>" + "Address: " + feature.properties.address + "</h3>");
  }
}).on('ready', function () {
  // http://leafletjs.com/reference.html#map-fitbounds
  myMap.fitBounds(runLayer.getBounds());
})) */
  .addTo(myMap);



// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
/* L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
})

var customLayer = L.geoJson(null, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.Title);
    }
});

var runLayer = omnivore.csv('tenRestaurant.csv', null, customLayer)
    .on('ready', function() {
        // http://leafletjs.com/reference.html#map-fitbounds
        myMap.fitBounds(runLayer.getBounds());
    })
    .addTo(myMap); */

// Create the tile layer that will be the background of our map
/* var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });
// Create a baseMaps object to hold the lightmap layer
var baseMaps = {
  "Light Map": lightmap
};
var overlayMaps = {
  "Bike Stations": stations
}

// Create the map object with options
var Mymap = L.map("map-id", {
  center: lasVegasCoord,
  zoom: mapZoomLevel,
  layers: [lightmap]
});
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
})
.addTo(Mymap); */
// upload CSV file from local directory and display latitude and longitude coordinates as default blue markers on map
/* var customLayer = L.geoJson(null, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.Title);
    }
});

var runLayer = omnivore.csv('restaurant.csv', null, customLayer)
    .on('ready', function() {
        // http://leafletjs.com/reference.html#map-fitbounds
        Mymap.fitBounds(runLayer.getBounds());
    })
    .addTo(Mymap);
 */
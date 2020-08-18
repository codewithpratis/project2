var lasVegasCoord = [36.17, -115.14];
var mapZoomLevel = 10;
restaurantData = '../../tenRestaurant.csv'



var myMap = L.map('map-id', {
    center: lasVegasCoord, // EDIT latitude, longitude to re-center map
    zoom: mapZoomLevel,  // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
    scrollWheelZoom: false
  });

  /* Control panel to display map layers */
  var controlLayers = L.control.layers( null, null, {
   position: "topright",
   collapsed: false
  }).addTo(myMap);

  var resto = L.geoJSON(restaurantData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      var color;
      var r = 225;
      var g = Math.floor(225 - 80 * feature.properties.stars);
      var b = Math.floor(225 - 80 * feature.properties.stars);
      color = "rgb(" + r + " ," + g + "," + b + ")"

      var geojsonMarkerOptions = {
        radius: 4 * feature.properties.stars,
        fillColor: color,
        color: "yellow",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });

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

  // base maps
  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": dark,
    "Street Map": streetmap,
    "Satelite": satelite
  };

  var overlayMaps = {
    "Restaurants": resto
  };

  var myMap = L.map("map-id", {
    center: lasVegasCoord,
    zoom: mapZoomLevel,
    layers: [lightmap, dark, streetmap, resto]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


  // see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/

  // upload CSV file from local directory and display latitude and longitude coordinates as default blue markers on map
  var customLayer = L.geoJson(null, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.name);
      }
  });

  var runLayer = omnivore.csv('hundredRestaurant.csv', null, customLayer)
      .on('ready', function() {
          // http://leafletjs.com/reference.html#map-fitbounds
          myMap.fitBounds(runLayer.getBounds());
      })
      .addTo(myMap);



  /* var customLayer = L.geoJson(null, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.name +
      "</h3><p>" + feature.properties.stars + "</p>" +
      "<hr><p>" + feature.properties.address + "</p>");
      }
  });
  var runLayer = omnivore.csv('hundredRestaurant.csv', null, customLayer)
    .on('ready', function () {
      // http://leafletjs.com/reference.html#map-fitbounds
      myMap.fitBounds(runLayer.getBounds());
    });

  var resto = L.geoJSON(restaurantData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      var color;
      var r = 225;
      var g = Math.floor(225 - 80 * feature.properties.stars);
      var b = Math.floor(225 - 80 * feature.properties.stars);
      color = "rgb(" + r + " ," + g + "," + b + ")"

      var geojsonMarkerOptions = {
        radius: 4 * feature.properties.mag,
        fillColor: color,
        color: "yellow",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });
  createMap(resto);
}

function createMap(resto) {


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

  // base maps
  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": dark,
    "Street Map": streetmap,
    "Satelite": satelite
  };

  var overlayMaps = {
    "Restaurants": resto
  };

  var myMap = L.map("map-id", {
    center: lasVegasCoord,
    zoom: mapZoomLevel,
    layers: [lightmap, dark, streetmap, resto]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  function getColor(d) {
    return d < 1 ? 'rgb(255,255,255)' :
      d < 2 ? 'rgb(255,225,225)' :
        d < 3 ? 'rgb(255,195,195)' :
          d < 4 ? 'rgb(255,165,165)' :
            d < 5 ? 'rgb(255,135,135)' :
              d < 6 ? 'rgb(255,105,105)' :
                d < 7 ? 'rgb(255,75,75)' :
                  d < 8 ? 'rgb(255,45,45)' :
                    d < 9 ? 'rgb(255,15,15)' :
                      'rgb(255,0,0)';
  }

  // legend 
  var legend = L.control({
    position: 'bottomright'
  });

  legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 1, 2, 3, 4, 5, 6, 7, 8],
      labels = [];

    div.innerHTML += 'Ratings<br><hr>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };

  legend.addTo(myMap);
}
 */


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
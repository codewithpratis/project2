var lasVegasCoord = [36.17, -115.14];
// Adding tile layer to the map
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

/* var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-satellite",
    accessToken: API_KEY
}); */


// Assemble API query URL
var url = "/api";




// Layer Markers



var rating5_markers = L.layerGroup();
var rating4_markers = L.layerGroup();
var rating3_markers = L.layerGroup();
var rating12_markers = L.layerGroup();

var Buble_Rev5_markers = L.layerGroup();
var Buble_Rev4_markers = L.layerGroup();
var Buble_Rev3_markers = L.layerGroup();
var Buble_Rev12_markers = L.layerGroup();


//color function
function getColor(d) {
    return d > 1000 ? '#996515' :
        d > 550 ? '#D2691E' :
            d > 200 ? '#CD853F' :
                d > 100 ? '#FF8C00' :
                    d > 50 ? '#FFA500' :
                        d > 0 ? '#FFD700' :
                            '#FAFAD2';
};




d3.json(url, function (data) {
    var business = data.businesses;
    var heatArray5 = [];
    var heatArray4 = [];
    var heatArray3 = [];
    var heatArray12 = [];

    for (var i = 0; i < 1000; i++) {
        var location = ([business[i].latitude, business[i].longitude]);
        console.log(location);
        if (location) {
            //console.log(company_info.longitude)
            var mark = L.marker(location).addTo(myMap);
            heatArray5.push(location);
            heatArray4.push(location);
            heatArray3.push(location);
            heatArray12.push(location);
            mark.bindPopup("<h3>" + business[i].name + 
            "</h3><h3>" + "Rating: " + business[i].stars  + " / 5.0" +
            "<hr>" + "Review Count: " + business[i].review_count +
            "<hr>" + "Address: " + business[i].address + "</h3>");
    }
            if (business[i].stars == 5) {
                heatArray5.push([business[i].latitude, business[i].longitude]);

                L.circle([business[i].latitude, business[i].longitude], {
                    stroke: false,
                    fillOpacity: 0.75,
                    color: "red",
                    fillColor: getColor(business[i].review_count),
                    radius: business[i].review_count / 2
                    
                }).addTo(Buble_Rev5_markers);

            }
            else if ((business[i].stars == 4.5) || (business[i].stars == 4)) {
                heatArray4.push([business[i].latitude, business[i].longitude]);
                L.circle([business[i].latitude, business[i].longitude], {
                    stroke: false,
                    fillOpacity: 0.75,
                    color: "red",
                    fillColor: getColor(business[i].review_count),
                    radius: business[i].review_count / 4
                }).addTo(Buble_Rev4_markers);

            }
            else if ((business[i].stars == 3.5) || (business[i].stars == 3)) {
                heatArray3.push([business[i].latitude, business[i].longitude]);
                L.circle([business[i].latitude, business[i].longitude], {
                    stroke: false,
                    fillOpacity: 0.75,
                    color: "red",
                    fillColor: getColor(business[i].review_count),
                    radius: business[i].review_count / 4
                }).addTo(Buble_Rev3_markers);

            } else {
                heatArray12.push([business[i].latitude, business[i].longitude]);
                L.circle([business[i].latitude, business[i].longitude], {
                    stroke: false,
                    fillOpacity: 0.75,
                    color: "red",
                    fillColor: getColor(business[i].review_count),
                    radius: business[i].review_count
                }).addTo(Buble_Rev12_markers);

            }
        }


L.heatLayer(heatArray5, {
    radius: 20,
    blur: 35
}).addTo(rating5_markers);

L.heatLayer(heatArray4, {
    radius: 20,
    blur: 35
}).addTo(rating4_markers);

L.heatLayer(heatArray3, {
    radius: 20,
    blur: 35
}).addTo(rating3_markers);

L.heatLayer(heatArray12, {
    radius: 20,
    blur: 35
}).addTo(rating12_markers);
});




// Create a baseMaps object
var baseMaps = {
    "Street Map": streetmap,
};

// Create an overlay object
var overlayMaps = {
    "Rating: 5 Stars": rating5_markers,
    "Rating: 4+ Stars": rating4_markers,
    "Rating: 3+ Stars": rating3_markers,
    "Rating: below 3 Stars": rating12_markers,
    "5 Stars Review Counts": Buble_Rev5_markers,
    "4+ Stars Review Counts": Buble_Rev4_markers,
    "3+ Stars Review Counts": Buble_Rev3_markers,
    "Below 3 Stars Review Counts": Buble_Rev12_markers

};

// Creating map object
var myMap = L.map("map-id", {
    center: lasVegasCoord,
    zoom: 13,
    layers: [streetmap, rating5_markers, Buble_Rev5_markers]
});


// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
addLegend(myMap)

//Add Legend

function addLegend(map) {


    var legend = L.control({ 
        position: 'bottomright' 
    });

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend');
        var level = [0, 50, 100, 200, 550, 1000];
        var divItem = [];

        for (var i = 0; i < level.length; i++) {
            div.innerHTML += 
            '<i style="background:' + getColor(level[i] + 1) +'">&nbsp&nbsp&nbsp&nbsp</i> ' + level[i] + (level[i+1] ? '&ndash;'
            + level[i+1] + '<br>' : '+');

        }
        return div;
    };

    legend.addTo(map);
}
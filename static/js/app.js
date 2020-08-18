url = "/api"
/* d3.json(url, function (importedData) {
    var business = importedData.businesses;
    for (var i = 0; i < 20; i++) {
        var names = business[i].name;

        console.log(names);

        var ratings = business[i].stars;
        console.log(ratings);


        var trace = {
            x: names,
            y: ratings,
            marker: {
                color: 'black'
            },
            type: 'bar'
        };
        var otu_best = (id_data.slice(0, 10)).reverse();
        var otu_id = otu_best.map(data => "OTU " + data);
        console.log(`OTU IDS: ${otu_id}`)
        var data = [trace];

        var layout = {
            title: "10 Best Restaurants",
            height: 500,
            width: 1000

        };
        Plotly.newPlot("bar", data, layout);
    }
});
// for Bar Graph */

d3.json(url).then((importedData) => {
    // console.log(importedData);
    var data = importedData.businesses;
    for (i = 0; i < 20; i++) {
        // Sort the data array using the greekSearchResults value
        /*  data.sort(function (a, b) {
             return parseFloat(b.stars) - parseFloat(a.stars);
         }); */

        // Slice the first 10 objects for plotting
        data = data.slice(0, 20);

        // Reverse the array due to Plotly's defaults
        //data = data.reverse();

        // Trace1 for the Greek Data
        var trace1 = {
            x: data.map(row => row.name),
            y: data.map(row => row.stars),
            text: data.map(row => row.name),
            name: "Restaurant Ratings",
            type: "scatter",
            
        };
        var trace2 = {
            x: data.map(row => row.name),
            y: data.map(row => row.review_count),
            text: data.map(row => row.name),
            name: "Restaurant Review Counts",
            type: "scatter",
            
        };


        // data
        var chartData = [trace1, trace2];

        // Apply the group bar mode to the layout
        var layout = {
            title: "Review Counts vs the Ratings",
            margin: {
                l: 300,
                r: 100,
                t: 100,
                b: 100
            },
            width: 1400,
            height: 500
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", chartData, layout);
    }
});



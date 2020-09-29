// use d3 to read samples.json
// create a horizontal bar chart with a dropdown menu to show top 10 OTUs found in an individual
    // use sample_values as the value for the bar chart
    // use otu_ids as the label for the bar chart
    // use otu_lables as the hovertext for the chart
// create a bubble chart that displays each sample
    // use otu_ids for the x value
    // use sample_values for the y value
    // use sample_values for the marker size
    // use otu_ids for the marker colors
    // use otu labels for the text values
// display the sample metadata (individuals demographic info)
// display the key pair from the JSON metadata
// update the plots any time that a new sample is selected

// function to call on samples.json and pulling out top 10 otu ids
// try running datasamples id 940
function dataSamples(id) {
    d3.json("./static/js/samples.json").then((data) => {
    console.log(data); 
    // drill down to ids, use map then filter and call on 0 index.
    var otI  = data.samples.map(oi => oi.id)
    var otI = data.samples.filter(oi => {return oi.id == id})
    otIfinal = otI[0];
    console.log("IDS: ",otIfinal);
    // drill down to otu_ids
         // slice, then map
    var oidsSlice = otIfinal.otu_ids.slice(0, 10).map(idLabel => `OTU ${idLabel}`);
    console.log(oidsSlice);
    // bubble chart slice 0, 10 otu_ids, specifically for bubble chart instead of oidsSlice
    var oidsSliceBubble = otIfinal.otu_ids.slice(0, 10)
    // slice sample values
    var sampleSlice = otIfinal.sample_values.slice(0, 10);
    console.log(sampleSlice);

    // labels slice for charts
    var labels = otIfinal.otu_labels.slice(0, 10);
    console.log(`labels: ${labels}`);

    // horoizontal bar chart
    // create bar chart first
     // create trace
    //  use oidsSlice, sampleSlice, labels
     var trace = {
        y: oidsSlice.reverse(),
        x: sampleSlice.reverse(),
        text: labels.reverse(),
        marker: {
            color: "red"},
        type: "bar",
        orientation: "h"
    };

    // create data
    var data = [trace];

    //layout, use margin for chart to show up, 
    var layout = {
        title: "Top 10 OTU IDs and Sample Values",
        yaxis: {
            tickermode: "linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };
    // use plotly.newPlot
    Plotly.newPlot("bar", data, layout);

    //  create bubble chart
    // put in the separate function use slicebubble for otu ids, create new for bubble, use sampleSlice and labels
    // create trace1 
    var trace1 = {
        x: oidsSliceBubble,
        y: sampleSlice,
        text: labels,
        mode: 'markers',
        marker: {
         size: sampleSlice,
         colorscale: "rainbow",
         color: oidsSliceBubble,
        }
    };
    // create data
    var data1 = [trace1];

    // create layout
    var layout1 = {
        xaxis: {title: "OTU ID"},
        title: "Belly Button Biodiversity Bubble Chart"
    };
     // use plotly.newPlot
    Plotly.newPlot("bubble", data1, layout1);
    });
};

   //   display metadata in demographic info
   //  display key-value pair for metadata object
// create an event to pull the different data when the dropdown is clicked 
// use d3.json from above and data. 
// print metadata.
// create result to filter through and incorporate return for an id
function demoInfo(id) {
    d3.json("./static/js/samples.json").then((data) => {
        var meta = data.metadata;
        console.log(meta)
        // use a filter and return like above
        var resultInfo = meta.filter(i => {return i.id == id});
        console.log(resultInfo);
        // use const test variable is index 0 of filtered id in resultInfo
        const test = resultInfo[0];
        console.log(test);
        // print on html doc
        var demo = d3.select("#sample-metadata");
        console.log(demo);
        // reset html data
        demo.html("")
        // use object.entries and use test. Create a forEach and use the key. 
        // Use append and uppercase to print
        Object.entries(test).forEach((key) => {
            demo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}
// link to html doc, use optionChanged, make sure to keep to ids.
function optionChanged(id) {
    dataSamples(id);
    demoInfo(id);
}


// create new function to create dropdown menu
      // drop down menu, 
function init() {
        // create a variable for d3.select #selDataset
    var dropdownMenu = d3.select("#selDataset");
        // use above filepath like in the last two functions
    d3.json("./static/js/samples.json").then((data) => {
        console.log(data);
            // call on the names for the ids, use foreach as a loop
        data.names.forEach(function(name) {
                // use the dropdown menu and add on to the end of the list, use text to print name
            dropdownMenu.append("option").text(name).property("value")
        });
            // call on functions and print in the dropdown
        dataSamples(data.names[0]);
        demoInfo(data.names[0]);
    });
}
    //call init 
init();

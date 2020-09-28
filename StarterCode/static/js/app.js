// use d3 to read samples.json
// create a horizontal bar chart with a dropdown menu to show top 10 OTUs found in an individual
    // use sample_values as the value for the bar chart
    // use otu_ids as the label for the bar chart
    // use otu_bales as the hovertext for the chart
// create a bubble chart that displays each sample
    // use otu_ids for the x value
    // use sample_values for the y value
    // use sample_values for the marker size
    // use otu_ids for the marker colors
    // use otu labels for the text values
// display the sample metadata (individuals demographic info)
// display the key pair from the JSON metadata
// update the plots any time that a new sample is selected

// function to call on samples.json and pulling out top 10
// try running datasamples id type  940
function dataSamples(id) {
    d3.json("./static/js/samples.json").then((data) => {
    console.log(data);
    // create bar horo chart, drop down menu, display top 10 OTUs
     // display 10 OTUs  
    // drill down to ids
    var otI  = data.samples.map(oi => oi.id)
    var otI = data.samples.filter(oi => {return oi.id == id})
    otIfinal = otI[0];
    console.log("IDS: ",otIfinal);
    // drill down to otu_ids
    // var otIfinal = data.samples.map(otuID => otuID.otu_ids)
    // console.log(`OTU IDS:${otIfinal}`)
         // slice
    // var firstOIDs = otIfinal.slice(0, 1);
    // console.log(firstOIDs);
    
    // const fOIDs = firstOIDs[0];
    // console.log(fOIDs);
    // split this into bar and bubble
    var oidsSlice = otIfinal.otu_ids.slice(0, 10).map(idLabel => `OTU ${idLabel}`);
    console.log(oidsSlice);

    var oidsSliceBubble = otIfinal.otu_ids.slice(0, 10)

    var sampleSlice = otIfinal.sample_values.slice(0, 10);
    console.log(sampleSlice);

    // labels

    var labels = otIfinal.otu_labels.slice(0, 10);
    console.log(`labels: ${labels}`);


      //     // filter through sample values
//     var sampleValues = data.samples.map(sampleV => sampleV.sample_values);
//     console.log(`sample values: ${sampleValues}`);
//    // slice
//     var sv = sampleValues.slice(0, 1);
//     console.log(sv);

//     const firstSample = sv[0];
//     console.log(firstSample);

    

    // labels

    // var lab = data.samples.map(l => l.otu_labels)
    // console.log(`labels: ${lab}`);

    // var label = lab.slice(0,1);
    // console.log(label)

    // const labe = label[0];
    // console.log(labe);

    // var labels = labe.slice(0, 10);
    // console.log(labels);


    // put in a separate function
    // horo bar chart
    // create bar chart first
     // create trace
    //  plotly is interupting data incorrectly
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

        // 
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
    
    Plotly.newPlot("bar", data, layout);

    //  create bubble chart
    // put in the separate function
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

    var data1 = [trace1];

    var layout1 = {
        xaxis: {title: "OTU ID"},
        title: "Belly Button Biodiversity Bubble Chart"
    };

    Plotly.newPlot("bubble", data1, layout1);
    });
};

   //   display metadata in demographic info
   //  display key-value pair for metadata object
// create an event to pull the different data when the dropdown is clicked 
// function optionChanged(newSample) {
//     buildCharts(newSample);
//     buildMetadata(newSample)
// }

function demoInfo(id) {
    d3.json("./static/js/samples.json").then((data) => {
        var meta = data.metadata;
        console.log(meta)
        var resultInfo = meta.filter(i => {return i.id == id});
        console.log(resultInfo);
        const test = resultInfo[0];
        console.log(test);
        // var resultInfo = metadata.filter(m => m.id === metadata);
        // console.log(`test ${resultInfo}`);
        // print on html doc
        var demo = d3.select("#sample-metadata");
        console.log(demo);
        demo.html("")
        Object.entries(test).forEach((key) => {
            demo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}
// link to html doc
function optionChanged(id) {
    dataSamples(id);
    demoInfo(id);
}


// create new function to create dropdown menu
      // drop down menu, 
function init() {
        // create a variable for d3.select seldataset
    var dropdownMenu = d3.select("#selDataset");
        // use above filepath
    d3.json("./static/js/samples.json").then((data) => {
        console.log(data);
            // call on the names for the ids, use foreach as a loop
        data.names.forEach(function(name) {
                // use the dropdown menu and add on to the end of the list, use text to print name
            dropdownMenu.append("option").text(name).property("value")
        });
            // call on function and print in the dropdown
        dataSamples(data.names[0]);
        demoInfo(data.names[0]);
    });
}
    
init();
// demoInfo();
// dataSamples();
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
    console.log(`IDS: ${otI}`);
    // drill down to otu_ids
    var otIfinal = data.samples.map(otuID => otuID.otu_ids)
    console.log(`OTU IDS:${otIfinal}`)
         // slice
    var firstOIDs = otIfinal.slice(0, 1);
    console.log(firstOIDs);
    
    const fOIDs = firstOIDs[0];
    console.log(fOIDs);
    
    var oidsSlice = fOIDs.slice(0, 10);
    console.log(oidsSlice);

      //     // filter through sample values
    //     // not getting right numbers
    var sampleValues = data.samples.map(sampleV => sampleV.sample_values);
    console.log(`sample values: ${sampleValues}`);
   // slice
    var sv = sampleValues.slice(0, 1);
    console.log(sv);

    const firstSample = sv[0];
    console.log(firstSample);

    var sampleSlice = firstSample.slice(0, 10);
    console.log(sampleSlice);

    var lab = data.samples.map(l => l.otu_labels)
    console.log(`labels: ${lab}`);

    var label = lab.slice(0,1);
    console.log(label)

    const labe = label[0];
    console.log(labe);

    var labels = labe.slice(0, 10);
    console.log(labels);


    // horo bar chart
    // create bar chart first
     // create trace
     var trace = {
        x: oidsSlice,
        y: sampleSlice,
        text: labels,
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
    var trace1 = {
        x: oidsSlice,
        y: sampleSlice,
        text: labels,
        mode: 'markers',
        marker: {
         size: sampleSlice,
         color: oidsSlice,
        }
    };

    var data1 = [trace1];

    var layout1 = {
        xaxis: {title: "OTU ID"},
        title: "Belly Button"
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

function demoInfo() {
    d3.json("./static/js/samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata);
        var resultInfo = metadata.id.map(d => d.id) 
        console.log(`test${resultInfo}`);
        
        // var demo = d3.select("#sample-metadata");
        // demo.html("")
        // Object.entries(result).forEach((key) => {
        //     demo.append("h5").text(key[0])
        // });
    });
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
        // demoInfo(data.names[0]);
    });
}
    
init();
demoInfo();
// dataSamples();
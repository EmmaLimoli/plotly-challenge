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

// d3.json("./static/js/samples.json", function(metadata) {
//     console.log(metadata);
// });

// function to call on samples.json and pulling out top 10
// try running datasamples id type  940
function dataSamples(id) {
    d3.json("./static/js/samples.json").then((data) => {
    console.log(data);
    // create bar horo chart, drop down menu, display top 10 OTUs
     // display 10 OTUs  
    var wfreq = data.metadata.map(wash => wash.wfreq)
    console.log(`Washing frequency: ${wfreq}`);
    // // filter out top 10 OTUs
    var filters = data.samples.filter(otu => otu.id); 
    console.log(filters);
    // // sort and slice out top 10 use  otu_ids, xaxis is otuids
    // not getting right numbers
    // sort
    filters.sort(function compareFunction(firstNum, secondNum) {
        return firstNum - secondNum;
    });
    console.log(filters);
        // slice
    var otuIds = filters.slice(0, 10);
    console.log(otuIds);
        // filter through sample values
        // not getting right numbers
    var sampleValues = filters.filter(sampleV => sampleV.sample_values);
    console.log(sampleValues);
        // sort
    sampleValues.sort(function compareFunction(firstNum, secondNum) {
        return secondNum - firstNum;
    });
    console.log(sampleValues);
        // slice
    var sv = sampleValues.slice(0, 10);
    console.log(sv);
    // create hovertext with otu_labels

  
    // horo bar chart
    // create bar chart first
     // create trace
    var trace = {
        x: otuIds,
        y: sv,
        type: "bar",
        color: "red",
        orientation: "h"
    };

        // create data
    var data = [trace];

        // 
    var layout = {
        title: "OTU IDs and Sample Values",
        yaxis: {
            tickermode: "linear",
        },
        margin: {
            l: 75,
            r: 75,
            t: 50,
            b: 40
        }
    };
    
    Plotly.newPlot("bar", data, layout);
// print out function name to put in html doc
dataSamples();

    // create bubble chart



    });
}
// create an event to pull the different data when the dropdown is clicked 

// create new function to create dropdown menu
      // drop down menu, 
    //   display metadata in demographic info
    //  display key-value pair for metadata object
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
    });
}

init();
   




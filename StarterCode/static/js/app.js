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
    // var wfreq = data.metadata.map(wash => wash.wfreq)
    // console.log(`Washing frequency: ${wfreq}`);
    // drill down to ids
    var otI  = data.samples.map(oi => oi.id)
    console.log(`IDS: ${otI}`);
    // drill down to otu_ids
    var otIfinal = data.samples.map(otuID => otuID.otu_ids)
    console.log(`OTU IDS:${otIfinal}`)

    // var topTen = data.samples.map(o => o.otu_ids === otu_ids) [0];
    // console.log(`final:${topTen}`)
    // // filter out top 10 OTUs
    // var filters = otI.filter(otu => otu.otu_ids); 
    // console.log(filters);
    // // sort and slice out top 10 use  otu_ids, xaxis is otuids
    // not getting right numbers
    // sort
    // filters.sort(function compareFunction(firstNum, secondNum) {
    //     return firstNum - secondNum;
    // });
    // console.log(filters);
    //     // slice
    var firstOIDs = otIfinal.slice(0, 10);
    console.log(firstOIDs);
    //     // filter through sample values
    //     // not getting right numbers
    var sampleValues = data.samples.map(sampleV => sampleV.sample_values);
    console.log(sampleValues);
    //     // sort
    sampleValues.sort(function compareFunction(firstNum, secondNum) {
        return secondNum - firstNum;
    });
    console.log(sampleValues);
    //     // slice
    var sv = sampleValues.slice(0, 1);
    console.log(sv);

    var svFinal = sv.slice(0,10);
    console.log(svFinal)
    // create hovertext with otu_labels

  
    // horo bar chart
    // create bar chart first
     // create trace
    // var trace = {
    //     x: otuIds,
    //     y: sv,
    //     type: "bar",
    //     color: "red",
    //     orientation: "h"
    // };

    //     // create data
    // var data = [trace];

    //     // 
    // var layout = {
    //     title: "OTU IDs and Sample Values",
    //     yaxis: {
    //         tickermode: "linear",
    //     },
    //     margin: {
    //         l: 75,
    //         r: 75,
    //         t: 50,
    //         b: 40
    //     }
    // };
    
    // Plotly.newPlot("bar", data, layout);
// print out function name to put in html doc
dataSamples();

    // create bubble chart



    });
}
   //   display metadata in demographic info
   //  display key-value pair for metadata object
// create an event to pull the different data when the dropdown is clicked 
// function info(id) {
//     d3.json("./static/js/samples.json").then((data) => {
//         var metadata = data.metadata;
//         console.log(metadata);
//         var result = metadata.filter(i => i.id); 
//         var demo = d3.select("#sample-metadata");
//         demo.html("")
//         Object.defineProperties(result).forEach((key) => {
//             demo.append("h5").text(key[0])
//         });
// })

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
        // info(data.metadata);
    });
}

init();
   




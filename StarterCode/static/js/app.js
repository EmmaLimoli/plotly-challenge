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
    // // sort and slice out top 10 use  otu_ids
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

    // drop down menu
    // horo bar chart
    // create bar chart first
     // create trace
    var trace = {
        x: otuIds,
        y: sampleValues,
        type: "bar"
    };

        // create data
    var data = [trace];

        // 
    var layout = {
        title: "OTU IDs and Sample Values",
        xaxis: { title: "OTU IDs"},
        yaxis: { title: "Sample Values"}
    };

    Plotly.newPlot("bar", data, layout);

    });
}



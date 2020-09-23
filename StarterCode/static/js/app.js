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

// d3.json("./data/samples.json".then((metadata) => {
//     console.log(metadata [0]);
// }));

// function to call on samples.json and pulling out top 10
function dataSamples (id) {
    d3.json("./static/js/samples.json").then((data) => {
        console.log(data);
    // create bar horo chart, drop down menu, display top 10 OTUs
     // display 10 OTUs   
        var wfreq = data.metadata.map(wash => wash.wfreq)
        console.log(`test${wfreq}`);
    // filter out top 10 OTUs
        var filterOtus = data.samples.filter(otus => otus.id.toString() === id, [0]);
        console.log(samples);
    // sort and slice out top 10
        var sort = filterOtus.reverse()
        console.log(sort);
    // slice
        var slice = sort.slice(0,10)
        console.log(slice);
        console.log(dataSamples);

    });
}


    // drop down menu
    // horo bar chart
    // var trace1 = 

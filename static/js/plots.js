function biodiversityID() {
    var selDataset = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
    var samples = data.names;
    samples.forEach((sample) => {
        selDataset.append("option")
        .text(sample)
        .property("value", sample);
    });
    var firstsample = samples[0];
    console.log(firstsample)
    demographicInfo(firstsample);
    createChart(firstsample);
    });
}
biodiversityID();

function demographicInfo(sampleID) {
    d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    console.log(metadata)
    var infoArray = metadata.filter(sampleobject => sampleobject.id == sampleID);
    console.log(infoArray)
    var result = infoArray[0];
    console.log(result)
    var display = d3.select("#sample-metadata");
    display.html("");
    Object.entries(result).forEach(([key,value]) => {
        display.append("h6").text(`${key}: ${value}`);
    });
});
}

function createChart(sampleID) {
    d3.json("samples.json").then((data) => {
        var sampleData = data.samples;
        var infoArray = sampleData.filter(sampleobject => sampleobject.id == sampleID);
        var result = infoArray[0];
        var otu_ids = result.otu_ids;
        var otu_lables = result.otu_lables;
        var sample_values = result.sample_values;
    
    var bubbledata = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_lables,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }

        }
    ];
    Plotly.newPlot("bubble", bubbledata);
    
    var bardata = [{
        type: 'bar',
        x: sample_values,
        y: otu_lables,
        orientation: 'h',
        
      }];
      
      Plotly.newPlot('bar', bardata);
});
}
function optionChanged(sampleNew) {
    createChart(sampleNew);
    demographicInfo(sampleNew);

    
}



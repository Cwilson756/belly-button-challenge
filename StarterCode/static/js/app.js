// Set url as constant
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

//Fetch data from url and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

// Create build charts function to build charts based on sample data
function buildCharts(sample) {
  
  // Grab the sample data from the url
  d3.json(url).then((data) => {
    var samples= data.samples;
    var resultsarray= samples.filter(sampleobject => 
        sampleobject.id == sample);
    var result= resultsarray[0]
  
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    // Build the bar chart
    var bar_data =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"

    }
    ];

     var barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: { t: 30, l: 150 }
    };

     // Plot it
    Plotly.newPlot("bar", bar_data, barLayout);


    // Build the bubble chart
    var LayoutBubble = {
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
      };
  
      var DataBubble = [ 
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          }
      }
    ];
    
    // Plot it
    Plotly.newPlot("bubble", DataBubble, LayoutBubble);
    });
}

// Build out the MetaData
function buildMetadata(sample) {
    d3.json(url).then((data) => {
        var metadata= data.metadata;
        var resultsarray= metadata.filter(sampleobject => 
            sampleobject.id == sample);
        var result= resultsarray[0]
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Create a function to change the charts based on the selected dropdown delement
function init() {

    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset"); 

    // Populate select options with list of samples
    d3.json(url).then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

// Grab new data and build charts/metadata when new sample is selected
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Initialize the dashboard
init();
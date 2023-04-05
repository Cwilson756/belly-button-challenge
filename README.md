# belly-button-challenge
Repository for my module 14 belly button challenge

## The Project

Using D3, I pulled the dataset from the following url: https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

I then created a horizontal bar chart with a dropdown menu which displayed the top 10 OTUs found in the selected individual. The bar chart used:
    sample_values as the values
    otu_ids as the labels
    otu_labels as the hovertext

Next I created a bubble chart. The bubble chart used:
    otu_ids for the x values
    sample_values for the y values
    sample_values for the marker size
    otu_ids for the marker colors
    otu_labels for the text values

This interactive dashboard also displays the sample metadata, i.e., an individual's demographic information.

All plots are updated when a new sample is selected.


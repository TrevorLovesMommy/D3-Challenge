// @TODO: YOUR CODE HERE!

//to run this code locally, spin up your local server via anaconda prompt
//in your broswer, url will be localhost:8000

//define svg area dimensions
var svgWidth = 960;
var svgHeight = 500;

//define the chart's margins as an object
var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
}

//define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//select scatter id from index.html, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//append a group to the svg area and shift ('translate')  it to the right and down to adhere
//to the martins set in the chartMargin object   
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//load census data from data.csv.  use d3.csv to convert it into an array of objects
d3.csv("assets/data/data.csv").then (function(censusData){

    console.log(censusData);

    //step 1:  Parse data/cast as numbers
    //d3.csv reads everthing in as strings
    //need to convert poverty and healthcareLow into numerical values
    //===============================================================
    censusData.forEach(function(data){

    });


}).catch(function(error) {
 console.log(error);
});




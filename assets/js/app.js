// @TODO: YOUR CODE HERE!

//to run this code locally, spin up your local server via anaconda prompt
//in your broswer, url will be localhost:8000

//define svg area dimensions
var svgWidth = 800;
var svgHeight = 600;

//define the chart's margins as an object
var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 100
}

//define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

//select scatter id from index.html, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//append a group to the svg area and shift ('translate')  it to the right and down to adhere
//to the margins set in the chartMargin object   
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
        data.poverty = +data.poverty;
        data.healthcareLow = +data.healthcareLow;

    });

    //step 2:  create scale function for x and y axis
    //===================================================
    //domain is original data.  range the domain scaled in terms of pixels

    //create a linear scale for the x axis
    var xLinearScale = d3.scaleLinear()
    // .domain([0, d3.max(censusData, d=>d.poverty)])
    // .domain([d3.extent(censusData, d => d.poverty)])
    .domain([7, d3.max(censusData, d=>d.poverty)])
    .range([0, chartWidth]);
    
    //create a linear scale for the y axis
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, d=>d.healthcareLow)])
    .range([chartHeight, 0]);


    //step 3:  create axis functions
    //==================================================
    //instantiate x and y axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //step 4:  append axis to chart
    //==================================================
    chartGroup.append("g")
    .call(leftAxis);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    //step 5:  Create circles
    //==================================================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcareLow))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5")
    //append text
    .append("text")
    .text(function(d) {
        return d.state;});


    // .attr("dy", ".3em");

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (chartHeight / 2) -60)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare(%)");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");



}).catch(function(error) {
 console.log(error);
});




(function() {

  // Set margin, height, width
  var margin = { top: 55, left: 50, right: 25, bottom: 25},
  height = 400 - margin.top - margin.bottom,
  width = 240 - margin.left - margin.right;

  // Create the container where we will insert our SVGs
  var container = d3.select("#chart-3")
    .style("margin-left", "-10%")
    

  // Read the data files
  d3.queue()
    .defer(d3.csv, "middle-class-income.csv")
    .defer(d3.csv, "middle-class-income-usa.csv")
    .await(ready)
  
  // Build our scales
  var xPositionScale = d3.scalePoint()
    .range([0, width])

  var yPositionScale = d3.scaleLinear()
    .domain([0,20000])
    .range([height, 0])

  // Build the graphs
  function ready(error, others, usa) {
    console.log(others)
    console.log(usa)

    // list of years to feed our scale's domain
    years = usa.map(function(d){
      return d.year
    })
    // console.log(years)

    // Update the x scale
    xPositionScale.domain(years)


    // Nest the data by country for our small multiples
    var others_nested = d3.nest()
      .key(function(d){
        return d.country
      })
      .entries(others)
    console.log(others_nested)

    // Line generator
    var line = d3.line()
      .x(function(d){
        return xPositionScale(d.year)
      })
      .y(function(d){
        return yPositionScale(d.income)
      })


    // Append one SVG for each year
    container.selectAll("svg")
      .data(others_nested)
      .enter().append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      // Create the loop of our small multiples
      .each(function(d){
        // Define SVG
        var svg = d3.select(this)


        // axes
        // Moving axes up here, so there are behind graph lines
        var xAxis = d3.axisBottom(xPositionScale).tickValues(["1980", "1990", "2000", "2010"])
        svg.append("g")
          .attr("class", "axis x-axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        var yAxis = d3.axisLeft(yPositionScale).tickValues([5000, 10000, 15000, 20000]).tickFormat(function(d) { return "$" + d3.format(",")(d); })
        svg.append("g")
          .attr("class", "axis y-axis")
          .call(yAxis);

        // Tick lines across the graph, dashed
        svg.selectAll(".y-axis .tick line")
          .attr("stroke-dasharray", 2)
          .attr("x2", width)
          .attr("stroke", "lightgray")

        svg.selectAll(".x-axis .tick line")
          .attr("stroke-dasharray", 2)
          .attr("y2", -height)
          .attr("stroke", "lightgray")

        // Remove axes lines
        svg.selectAll(".domain")
          .remove()

        // insert each country's name as graph title
        // we use the others_nested
        svg.append("text")
          .text(d.key)
          .attr("x", width/2)
          .attr("text-anchor", "middle")
          .attr("fill", "maroon")
          .attr("font-weight", "bold")
          .attr("y", -margin.top/2)

        // Draw US line
        svg.append("path")
          .attr("d", line(usa))
          .attr("fill", "none")
          .attr("stroke", "gray")
          .attr("stroke-width", 3)

        svg.append("path")
          .attr("d", function(d){
            return line(d.values)
          })
          .attr("fill", "none")
          .attr("stroke", "maroon")
          .attr("stroke-width", 3)





      })


  }
  
})();
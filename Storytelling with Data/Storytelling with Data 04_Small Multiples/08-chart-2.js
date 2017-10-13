(function() {

  // Set margin, height, width
  var margin = { top: 35, left: 30, right: 160, bottom: 25},
  height = 200 - margin.top - margin.bottom,
  width = 280 - margin.left - margin.right;

  // Create the container where we will insert our SVGs
  var container = d3.select("#chart-2")
    .style("margin-left", "-20%")
    .style("margin-right", "-20%")
    .style("background-color", "none")

  // Create our scales
  var xPositionScale = d3.scaleLinear()
    .domain([10,55])
    .range([0, width])
  var yPositionScale = d3.scaleLinear()
    .domain([0, 0.3])
    .range([height, 0])


  // Read the file
  d3.queue()
    .defer(d3.csv, "fertility.csv")
    .await(ready)

  function ready(error, datapoints) {
    
    // Nest the data by year for our small multiples
    var nested = d3.nest()
      .key(function(d){
        return d.Year
      })
      .entries(datapoints)

    // Append one SVG for each year
    container.selectAll("svg")
      .data(nested)
      .enter().append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", (width + margin.left + margin.right)/2)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      // Create the loop of our small multiples
      .each(function(d){
        // Define SVG
        var svg = d3.select(this)

        // Insert text of year
        svg.append("text")
          .text(d.key)
          .attr("x", width/2)
          .attr("y", -margin.top/2)
          .attr("text-anchor", "middle")

        // Draw areas for Japan
        var area_jp = d3.area()
          .x0(function(d){
            return xPositionScale(d.Age)
          })
          .y0(function(d){
            return yPositionScale(0)
          })
          .x1(function(d){
            return xPositionScale(d.Age)
          })
          .y1(function(d){
            return yPositionScale(d.ASFR_jp)
          })

        // Draw areas for US
        var area_us = d3.area()
          .x0(function(d){
            return xPositionScale(d.Age)
          })
          .y0(function(d){
            return yPositionScale(0)
          })
          .x1(function(d){
            return xPositionScale(d.Age)
          })
          .y1(function(d){
            return yPositionScale(d.ASFR_us)
          })

        // Append areas for Japan
        svg.selectAll(".usa")
          .data(nested)
          .enter().append("path")
          .attr("class", "usa")
          .attr("d", area_us(d.values))
          .attr("fill", "turquoise")
          .attr("fill-opacity", 0.25)

        // Append areas for US
        svg.selectAll(".japan")
          .data(nested)
          .enter().append("path")
          .attr("class", "japan")
          .attr("d", area_jp(d.values))
          .attr("fill", "red")
          .attr("fill-opacity", 0.01)

        // sum for Japan
        var sum_jp = d3.sum(d.values, function(d){
          return d.ASFR_jp
        })
        
        // sum for US
        var sum_us = d3.sum(d.values, function(d){
          return d.ASFR_us
        })
        
        // create decimail format
        formatDecimal = d3.format(".2f")

        // insert text with the sum
        svg.append("text")
          .text(formatDecimal(sum_us))
          .attr("x", xPositionScale(40))
          .attr("y", yPositionScale(0.2))
          .attr("fill", "turquoise")

        svg.append("text")
          .text(formatDecimal(sum_jp))
          .attr("x", xPositionScale(40))
          .attr("y", yPositionScale(0.15))
          .attr("fill", "red")

        // Insert axes
        var xAxis = d3.axisBottom(xPositionScale)
          .tickValues([15,30,45])
        svg.append("g")
          .attr("class", "axis x-axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
        var yAxis = d3.axisLeft(yPositionScale)
          .ticks(3)
          .tickFormat(d3.formatPrefix(".1", 1e2))
        svg.append("g")
          .attr("class", "axis y-axis")
          .call(yAxis);



      })


    

  }
  
})();
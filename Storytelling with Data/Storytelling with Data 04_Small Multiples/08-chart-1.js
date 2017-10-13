(function() {
  // Set margin, height, width
  var margin = { top: 150, left: 100, right: 30, bottom: 30},
  height = 800 - margin.top - margin.bottom,
  width = 780 - margin.left - margin.right;

  // Set svg ang g element
  var svg = d3.select("#chart-1")
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create time parser
  var parseTime = d3.timeParse("%B-%y")

  // Read in the data, create datetime column with time parser
  d3.queue()
    .defer(d3.csv, "housing-prices.csv", function(d){
      d.datetime = parseTime(d.month);
      return d;
    })
    .await(ready)

  // Create scales
  var xPositionScale = d3.scaleTime()
    .range([0, width/1.3])

  var yPositionScale = d3.scaleLinear()
    .domain([180, 340])
    .range([height, 0]);

  var colorScale = d3.scaleOrdinal()
    .range(['#a6cee3','#1f78b4','#008000','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a'])

  // Create d3 graph
  function ready(error, datapoints) {
    //console.log(datapoints)

    // Update xPositionScale
    xPositionScale.domain(d3.extent(datapoints, function(d){
        return d.datetime; 
        })
      )

    // Nest data under region for lines
    var nested = d3.nest()
      .key(function(d){
        return d.region
      })
      .entries(datapoints)

      //console.log(nested)

    // insert rect
    // move it from the end of the code up here, so it's behind the lines and texts

    // get December datetime
    // var decDatetime
    // d3.extent(datapoints, function(d){
    //   if (d.month === "December-16"){
    //     return decDatetime = d.datetime
    //   }
    // })


    // var febDatetime
    // d3.extent(datapoints, function(d){
    //   if (d.month === "February-17"){
    //     return febDatetime = d.datetime
    //   }
    // })

    // svg.append("rect")
    //   .attr("fill", "black")
    //   .attr("x", xPositionScale(decDatetime))
    //   .attr("y", 0)
    //   .attr("width",  xPositionScale(febDatetime) - xPositionScale(decDatetime))
    //   .attr("height", height)

    // var decDatapoint = datapoints.find(function(d){
    //   return d.month === 'December-16'
    // }), febDataPoint = datapoints.find(function(d){
    //   return d.month === 'February-17'
    // })
    // // console.log(decDatapoint.datetime)
    
    // svg.append("rect")
    //   .attr("fill", "black")
    //   .attr("x", xPositionScale(decDatapoint.datetime))
    //   .attr("y", 0)
    //   .attr("width",  xPositionScale(febDataPoint.datetime) - xPositionScale(decDatapoint.datetime))
    //   .attr("height", height)

    // instead of finding the datapoints with the date we need, and extracting the datetime
    // just use the time parser we have already created and feed the datetime that exports
    // to the scale
    var decDatetime = parseTime("December-16"), 
        febDatetime = parseTime("February-17")

    svg.append("rect")
      .attr("fill", "lightgray")
      .attr("x", xPositionScale(decDatetime))
      .attr("y", 0)
      // for the width we need the difference between february and decmember
      .attr("width",  xPositionScale(febDatetime) - xPositionScale(decDatetime))
      .attr("height", height)



    // Create d3 lines
    var line = d3.line()
        .x(function(d){
          return xPositionScale(d.datetime)
        })
        .y(function(d){
          return yPositionScale(d.price)
        })

    // Draw the lines
    svg.selectAll("path")
      .data(nested)
      .enter().append("path")
      .attr("d", function(d){
        return line(d.values)
      })
      .attr("stroke", function(d){
        return colorScale(d.key)
      })
      .attr("fill", "none")

    // Draw the last circle
    svg.selectAll("circle")
      .data(nested)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d){
        return colorScale(d.key)
      })
      //console.log(nested[0].values[0].datetime)
      .attr("cx", xPositionScale(nested[0].values[0].datetime))
      .attr("cy", function(d){
        // console.log("region", d.key, "original value:", +d.values[d.values.length - 1].price, "on date: ", d.values[d.values.length - 1].datetime)
        // console.log("region", d.key, "original value:", +d.values[0].price, "on date: ", d.values[0].datetime)
        return yPositionScale(+d.values[0].price)
      })

    // Insert texts of regions
    svg.selectAll("text")
      .data(nested)
      .enter().append("text")
      .text(function(d){
        return d.key
      })
      .attr("x", xPositionScale(nested[0].values[0].datetime))
      .attr("y", function(d){
        return yPositionScale(+d.values[0].price)
      })
      .attr("dx", 10)

    // Insert title
    svg.append("text")
      .text("U.S. housing prices fall in winter")
      .attr("x", width / 2)
      // Place the title in the middle of the margin, use minus to make it go upwards
      .attr("y", -margin.top/2)
      .attr("text-anchor", "middle")
      .attr("font-size", "30")





    // create axes
    var xAxis = d3.axisBottom(xPositionScale).tickFormat(d3.timeFormat("%b %y")).ticks(9)
      svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    var yAxis = d3.axisLeft(yPositionScale)
      svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);


  }
  
})();
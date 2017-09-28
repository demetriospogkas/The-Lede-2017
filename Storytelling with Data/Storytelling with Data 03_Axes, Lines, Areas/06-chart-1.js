(function() {
  var margin = { top: 30, left: 100, right: 30, bottom: 30},
  height = 400 - margin.top - margin.bottom,
  width = 780 - margin.left - margin.right;

  console.log("Building chart 1");

  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create a time parser
  var parseTime = d3.timeParse("%Y-%m-%d")

  // Create your scales


  // Create a d3.line function that uses your scales


  // Now we read in our data
  // with .defer, this time we're adding a THIRD argument
  // instead of just.defer(d3.csv, "AAPL.csv")
  // it does converting and cleaning of each data point
  // as we read it in
  d3.queue()
    .defer(d3.csv, "AAPL.csv", function(d) {
      // d.Date is a string to begin with, but we can
      // imagine treating a date like a string doesn't
      // work well. So instead we use parseTime (which we
      // created up above) to turn it into a date.
      d.datetime = parseTime(d.Date);
      return d;
    })
    .await(ready);

  function ready(error, datapoints) {
    console.log("chart1 datapoints", datapoints)


    // Update your scales
    
    // xPosition will be the dates
    // we can use scaleTime for the dates
    // we start with the list of dates for the domain
    var dates = datapoints.map(function(d){
      return d.datetime
    })

    var xPositionScale = d3.scaleTime()
      .domain(d3.extent(datapoints, function(d) { return d.datetime; }))
      .range([0, width])

    // yPosition is the closing price
    closeMin = d3.min(datapoints, function(d){
      return +d.Close
    })
    closeMax = d3.max(datapoints, function(d){
      return +d.Close
    })
    yPositionScale = d3.scaleLinear()
      .domain([closeMin, closeMax])
      .range([height, 0])

    // Draw your dots
    svg.selectAll("circle")
      .data(datapoints)
      .enter().append("circle")
      .attr("r", 3)
      .attr("cy", function(d){
        return yPositionScale(+d.Close)
      })
      .attr("cx", function(d){
        return xPositionScale(d.datetime)
      })

    // Draw your single line
    var line = d3.line()
      .x(function(d){
        return xPositionScale(d.datetime)
      })
      .y(function(d){
        return yPositionScale(d.Close)
      })


    svg.append("path")
      .datum(datapoints)
      .attr("d", line)
      .attr("stroke", "black")
      .attr("fill", "none")

    // Add your axes
    var xAxis = d3.axisBottom(xPositionScale).tickFormat(d3.timeFormat("%m/%d/%y"))
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
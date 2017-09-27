(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var margin = { top: 80, left: 80, right: 80, bottom: 80},
        height = 450 - margin.top - margin.bottom,
        width = 600 - margin.left - margin.right;

  var svg = d3.select("#chart9")
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  // Build your scales here
  heightScale = d3.scaleLinear().domain([0,10]).range([0,300])

  colorScale = d3.scaleOrdinal().range(['#0449a0', '#2482f9', '#c8defa'])

  xPositionScale = d3.scaleBand().range([0,400])

  d3.queue()
    .defer(d3.csv, "eating-data.csv")
    .await(ready)


  function ready(error, datapoints) {
    var names = datapoints.map(function(d) { return d.name })
    xPositionScale.domain(names)

    // Add and style your marks here
    svg.selectAll('rect')
      .data(datapoints)
      .enter().append('rect')
      .attr('x', function(d){
        return xPositionScale(d['name'])
      })
      .attr('y', function(d){
        return 300 - heightScale(d['hamburgers'])
      })
      .attr('height', function(d){
        return heightScale(d['hamburgers'])
      })
      .attr('width', 58)
      .attr('fill', function(d){
        return colorScale(d['animal'])
      })


    var yAxis = d3.axisLeft(heightScale);
      svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

    var xAxis = d3.axisBottom(xPositionScale)
      svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + "300" + ")")
        .call(xAxis);


  }
})()
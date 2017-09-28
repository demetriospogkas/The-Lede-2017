(function() {
	var margin = { top: 30, left: 30, right: 30, bottom: 30},
	height = 400 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 2");

	var svg = d3.select("#chart-2")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create your scales
	var colorScale = d3.scaleOrdinal()
		.range(["orange", "green", "gray", "blue", "yellow"])



	// Import your data file using d3.queue()
	d3.queue()
		.defer(d3.csv, "alcohol-consumption.csv")
		.await(ready);

	function ready(error, datapoints) {
		// Confirm the csv reading
		console.log("chart2 datapoints", datapoints)

		// Find alcohol consumption max for yPositionScale
		var valueMax = d3.max(datapoints, function(d){
			return +d.Value
		})
		console.log(valueMax)

		// Build yPositionScale
		var yPositionScale = d3.scaleLinear()
			.domain([0, valueMax])
			.range([height, 0])
		
		// List of years
		var years = datapoints.map(function(d){
			return d.TIME
		})

		var xPositionScale = d3.scalePoint()
		.domain(years)
		.range([0, width])

		// Create a d3.line function
		var line = d3.line()
			.x(function(d){
				return xPositionScale(d.TIME)
			})
			.y(function(d){
				return yPositionScale(d.Value)
			})

		// Draw your dots
		svg.selectAll("circle")
      .data(datapoints)
      .enter().append("circle")
      .attr("r", 3)
      .attr("fill", function(d){
      	return colorScale(d.LOCATION)
      })
      .attr("cy", function(d){
      	return yPositionScale(d.Value)
      })
      .attr("cx", function(d){
      	return xPositionScale(d.TIME)
      })

		// Draw your lines
		var nested = d3.nest()
			.key(function(d){
				return d.LOCATION
			})
			.entries(datapoints)

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


		// Add your axes
		var xAxis = d3.axisBottom(xPositionScale)
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
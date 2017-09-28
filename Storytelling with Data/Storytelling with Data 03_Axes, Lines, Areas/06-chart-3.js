(function() {
	var margin = { top: 30, left: 30, right: 30, bottom: 30},
	height = 400 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 3");

	var svg = d3.select("#chart-3")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create your scales
	var colorScale = d3.scaleOrdinal()
		.range(['green', 'gray', 'orange'])

	// Do you need a d3.line function for this? Maybe something similar?

	// Import your data file using d3.queue()
	d3.queue()
		.defer(d3.csv, "air-emissions.csv")
		.await(ready)

	function ready(error, datapoints) {
		console.log("chart 3 datapoints", datapoints)

		// xPosition will be the year
		// we input a list of the years as domain
		var xPositionScale = d3.scalePoint()
			.domain(datapoints.map(function(d) {
				return d.Year
			}))
			.range([0, width])

		// yPosition will be the value
		var yPositionScale = d3.scaleLinear()
			.domain([0, 500])
			.range([height, 0])

		// Draw your areas
		var area = d3.area()
	    .x0(function(d){
	      return xPositionScale(d.Year)
	    })
	    .y0(function(d){
	      return yPositionScale(0)
	    })
	    .x1(function(d){
	      return xPositionScale(d.Year)
	    })
	    .y1(function(d){
	      return yPositionScale(d.Value)
	    })

	  var nested = d3.nest()
	  	.key(function(d){
	  		return d.Country
	  	})
	  	.entries(datapoints)

	  svg.selectAll("path")
	    .data(nested)
	    .enter().append("path")
	    .attr("d", function(d){
	    	return area(d.values)
	    })
	    .attr("fill", function(d){
	    	return colorScale(d.key)
	    })
	    .attr("fill-opacity", "0.25")
	    .attr("stroke", function(d){
	    	return colorScale(d.key)
	    })


		// Add your axes
		var xAxis = d3.axisBottom(xPositionScale)
	  svg.append("g")
	    .attr("class", "axis x-axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

	  var yAxis = d3.axisLeft(yPositionScale);
	  svg.append("g")
	    .attr("class", "axis y-axis")
	    .call(yAxis);

  	}
})();
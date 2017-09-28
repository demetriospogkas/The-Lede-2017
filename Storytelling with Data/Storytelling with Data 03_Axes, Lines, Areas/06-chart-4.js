(function() {
	var margin = { top: 30, left: 30, right: 30, bottom: 30},
	height = 400 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 4");

	var svg = d3.select("#chart-4")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Read the data
	d3.queue()
		.defer(d3.csv, "air-emissions.csv")
		.await(ready);

	function ready(error, datapoints) {
		console.log("chart 4 datapoints", datapoints)

		// xPositionScale from Years in our data
		var years = datapoints.map(function(d){
			return d.Year
		})

		var xPositionScale = d3.scalePoint()
			.domain(years)
			.range([0, width])

		// yPositionScale is the air-emissions
		var yPositionScale = d3.scaleLinear()
			.domain([0, 500])
			.range([height, 0])


		// line generator
		var line = d3.line()
			.x(function(d){
				return xPositionScale(d.Year)
			})
			.y(function(d){
				return yPositionScale(d.Value)
			})

		// nest the data
		var nested = d3.nest()
			.key(function(d){
				return d.Country
			})
			.entries(datapoints)

		// throw the lines
		svg.selectAll("path")
			.data(nested)
			.enter().append("path")
			.attr("d", function(d){
				return line(d.values)
			})
			.attr("stroke", function(d){
				if (d.key === "France") {
					return "blue"
				}
				return "gray"
			})
			.attr("fill", "none")


		// throw the texts
		svg.selectAll("text")
			.data(nested)
			.enter().append("text")
			.text(function(d){
				return d.key
			})
			.attr("x", xPositionScale(years[years.length -1]))
			.attr("y", function(d){
				return yPositionScale(d.values[d.values.length - 1].Value)
			})
			.attr("dy", -15)
			.attr("dx", -40)


		// throw the only dot
		svg.selectAll("circle")
			.data(nested)
			.enter().append("circle")
			.attr("r", 4)
			.attr("fill", function(d){
				if (d.key === "France"){
					return "blue"
				}
				return "gray"
			})
			.attr("cx", xPositionScale(years[years.length -1]))
			.attr("cy", function(d){
				return yPositionScale(d.values[d.values.length - 1].Value)
			})

		// axes
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
(function() {
	var margin = { top: 30, left: 30, right: 30, bottom: 30},
	height = 500 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 5");

	var svg = d3.select("#chart-5")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.queue()
		.defer(d3.csv, "animal-sizes.csv")
		.await(ready)

	function ready(error, datapoints) {
		console.log("Chart 5 datapoints are", datapoints)

		// xPositionScale is size
		var sizes = datapoints.map(function(d){
			return d.size
		})

		var xPositionScale = d3.scaleBand()
			.domain(sizes)
			.range([width, 100])


		// yPositionScale is breed
		var breeds = datapoints.map(function(d){
			return d.breed
		})

		var yPositionScale = d3.scaleBand()
			.domain(breeds)
			.range([0, height])

		// rSize is SqRt
		amounts = datapoints.map(function(d){
			return d.amount
		})

		var rMin = d3.min(datapoints, function(d){
				return +d.amount
			})
		var rMax = d3.max(datapoints, function(d){
				return +d.amount
			})

		var rSize = d3.scaleSqrt()
			.domain([rMin, rMax])
			.range([10, 50])			

		// Add your circles
		svg.selectAll("circle")
			.data(datapoints)
			.enter().append("circle")
			.attr("cx", function(d){
				return xPositionScale(d.size)
			})
			.attr("cy", function(d){
							return yPositionScale(d.breed)
			})
			.attr("r", function(d){
				return rSize(d.amount)
			})

		// axes
		var xAxis = d3.axisBottom(xPositionScale)
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(-100," + height + ")")
      .call(xAxis);

    var yAxis = d3.axisLeft(yPositionScale)
    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis);

	}
})();
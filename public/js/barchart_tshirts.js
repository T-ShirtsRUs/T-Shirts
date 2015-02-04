var thought = {
  "thoughts" : [
    {"word" : "wu tang",
    "count": 100,
    "url" : "http://ecx.images-amazon.com/images/I/61AahwY%2Bj7L._UL1500_.jpg"
    },

    {"word" : "iggy asalea",
    "count": 80,
    "url": "https://img1.etsystatic.com/043/0/9257203/il_340x270.631035637_ampf.jpg"
    },

    {"word" : "minor threat",
    "count": 60,
    "url" : "https://fashionfades.files.wordpress.com/2010/01/minor-threat-bottled.jpg?w=297"
    },

    {"word" : "pavement",
    "count" : 40,
    "url": "http://images.brandretailers.com/rock/assets/products/56946/large/pavement-night-falls-men-s-t-shirt-pvt12(1).jpg"
    },
     {"word" : "george carlin",
    "count": 20,
    "url": "http://ecx.images-amazon.com/images/I/412UGXphwPL._SX342_.jpg"
    },

    {"word" : "dice clay",
    "count": 10,
    "url": "http://brooklynsteez.com/products/215097.jpg"
    },
  ]
}

var ranges = [100,80,60,40,101,81,61,11,10,2,3]
var margin = { top:30, right:30, bottom:40, left:50 }
var height = 300 - margin.top - margin.bottom
var width = 400 - margin.left - margin.right
var left_width = 100;
var bar_height = 20;

function drawBarChart(data) {
  var color = d3.scale.category20()

  var body = d3.select(".barchart").append("svg")
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .attr("class","barchart")
    .classed("center-svg-row2",true)
    .append('g')
    .attr("transform","translate(10,10)")

  var xScale = d3.scale.linear()
    .domain([0,d3.max(maxData(thought))])
    .range([0,width + margin.left + margin.right - left_width - 100])

  var yScale = d3.scale.ordinal()
    .domain(d3.range(maxData(thought).length))// - doesn't work
    .rangeRoundBands([0,height + margin.top + margin.bottom - 20], 0.2)

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("top")
    .ticks(5)



  body.selectAll('rect').data(processData(thought)).enter()
    .append('rect')
    .attr("width", function(d) { return xScale(d.size)})
    .attr('height', yScale.rangeBand())
    .attr('x', left_width)
    .attr('y', function(d,i) { return yScale(i) } )
    .style("fill", function(d,i) { return color(d.text)})

  body.selectAll("text").data(maxData(thought).reverse()).enter()
    .append("text")
    .attr("x", function(d,i) { return xScale(d) + left_width} )
    // .attr("x", function(d,i) {
    // 	if( d < 10) { return xScale(d) + left_width + 10}
    // 	else {return xScale(d) + left_width }
    // })
    .attr("y", function(d,i){ return yScale(i) + yScale.rangeBand()/2; } )
    .attr("dx", 25) //positions data Xpx to the right from end of xScale(d.size)
    //however using -Xpx can position data to the left
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .text(String)

  body.selectAll("text.name").data(textData(thought)).enter()
    .append("text")
    .attr("x", left_width / 2)
    .attr("y", function(d,i){ return yScale(i) + yScale.rangeBand()/2; } )
    .attr("dy", ".36em")
    .attr("text-anchor", "middle")//end moves text left...begin moves text right
    .attr('class', 'name')
    .style({ "font-family":'sans-serif'})
    .text(String)

  var hGuide = d3.select('.barchart').select('svg').append('g')

  xAxis(hGuide)

  hGuide.attr("transform", "translate(" + (left_width + 10) + "," + "20)")
  hGuide.selectAll('path').style({fill: 'none', stroke: "#000"})
  hGuide.selectAll('line').style({stroke: "#000"})
}

drawBarChart(thought)

 function maxData(data){
  var obj = data.thoughts
  var maxDataSet = []
   for(var i in obj) {
    maxDataSet.push( obj[i].count );
    maxDataSet.sort( function compareNumbers(a,b) { return a -b } )
    }
    return maxDataSet
 }

 function textData(data){
  var obj = data.thoughts
  var textDataSet = []
   for(var i in obj) {
    textDataSet.push( obj[i].word );
    }
  return textDataSet
 }

 function processData(data) {
  var obj = data.thoughts
  var sorted = obj.sort(function compareNumbers(a,b) { return a.count -b.count}).reverse()
  var newDataSet = [];
  for(var i in obj) {
    newDataSet.push( {text: obj[i].word,
        className: obj[i].word.toLowerCase(), size: obj[i].count});
  }
  return newDataSet;
}

var thought = {
  "thoughts" : [
    {"word" : "love",
    "count": 100
    },

    {"word" : "you",
    "count": 80
    },

    {"word" : "as",
    "count": 60
    },

    {"word" : "much",
    "count" : 40
    },
     {"word" : "about",
    "count": 100
    },

    {"word" : "friends",
    "count": 80
    },

    {"word" : "run",
    "count": 60
    },

    {"word" : "away",
    "count" : 11
    },

    {"word" : "carefree",
    "count": 10
    },

    {"word" : "appalacian",
    "count": 2
    },

    {"word" : "hypocritical",
    "count" : 3
    }
  ]
}

function drawBubbleChart(root){
  //console.log(root)
    var diameter = 960;
    var width = 200;
        height = 400;
    var color = d3.scale.category20();
    var bubble = d3.layout.pack().size([310,310]).padding(1.5).value( function(d) { return d.size})
    var svg = d3.select("body").select(".bubbles")
      .append("svg")
      .attr("width",300)
      .attr("height", 300)
      .attr("class","bubble")
      //This centers the div
      .style({ display: "block",
        "margin-left": "auto",
        "margin-right": "auto"
      })

    var node = svg.selectAll(".node")
      .data(bubble.nodes(processData(thought))
      .filter(function(d){ return !d.children;}))
      .enter()
      .append("g")
      .attr("class","node selected")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

   var circle = node.append("circle")
       .attr("r", function(d) { return d.r; })
       .on("click", function(d,i) { d3.selected(".selected",false)})
       .style("fill", function(d) { return color(d.name) })
       .style("opacity", ".02")
       .transition()
         .duration(2000)
         .style("fill", function(d) { return color(d.name)})
         .style("opacity","05")


   node.append("text")
        .style("color",function(d,i) { return color(i)})
        .style("opacity", ".02")
        .style("font-size","0px")
        .text(function(d) {
              return d.name;
        })
    .transition()
       .duration(2000)
       .style("opacity",1)
       .style("text-anchor", "middle")
       .style("font-size", function(d) {
            var len = d.name.substring(0, d.r / 3).length;
            var size = d.r/3;
            size *= 5 / len;
            size += 1;
            return Math.round(size)+'px';
        })
         .style({ "font-family":'Indie Flower'})
        .text(function(d) {
            if(d.r >= 10) { return d.name }
        });


}



drawBubbleChart(processData(thought))

function update(data) {
  d3.select(".selected")
    .classed("selected",false)
    .attr("opacity", .5)

  d3.select(this)
    .classed("selected",true)
    .attr("opacity", 1)
}

function processData(data) {
   var obj = data.thoughts
  // console.log(obj)
   var newDataSet = [];
   for(var i in obj) {
      //if( !(obj[i].count <= 10 && obj[i].word.length > 5)) {
      //console.log(obj[i])
      newDataSet.push( {name: obj[i].word,
         className: obj[i].word.toLowerCase(), size: obj[i].count});
      //}
    }
   return {children: newDataSet};
}



(function() {

  JSONData = [
  { "id": 3, "created_at": "Sun May 05 2013", "amount": 12000},
  { "id": 1, "created_at": "Mon May 13 2013", "amount": 2000},
  { "id": 2, "created_at": "Thu Jun 06 2013", "amount": 17000},
  { "id": 4, "created_at": "Thu May 09 2013", "amount": 15000},
  { "id": 5, "created_at": "Mon Jul 01 2013", "amount": 16000}
]

  var data = JSONData.slice()
  var format = d3.time.format("%a %b %d %Y")
  var amountFn = function(d) { return d.amount }
  console.log(amountFn)
  var dateFn = function(d) { return format.parse(d.created_at) }

  var x = d3.time.scale()
    .range([10, 280])
    .domain(d3.extent(data, dateFn))
      console.log(amountFn)

  var y = d3.scale.linear()
    .range([180, 10])
    .domain(d3.extent(data, amountFn))

  var svg = d3.select("#demo").append("svg:svg")
  .attr("width", 300)
  .attr("height", 200)

  svg.selectAll("circle").data(data).enter()
   .append("svg:circle")
   .attr("r", 4)
   .attr("cx", function(d) { return x(dateFn(d)) })
   .attr("cy", function(d) { return y(amountFn(d)) })
})();

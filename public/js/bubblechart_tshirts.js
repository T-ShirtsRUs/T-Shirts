function drawBubbleChart(root){
  //console.log(root)
    var diameter = 960;
    var width = 200;
        height = 400;
    var color = d3.scale.category20c();
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
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

   var circle = node.append("circle")
       .attr("r", function(d) { return d.r; })
      .attr("class","selected")
      .on("click", update)
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
            var size = d.r/2;
            size *= 5 / len;
            size += 1;
            return Math.round(size)+'px';
        })
         .style({ "font-family":'sans-serif'})
        .text(function(d) {
            if(d.r >= 10) { return d.name }
        });


}



drawBubbleChart(processData(thought))

function update(d) {
  var url = d.url
  var name = d.name.toUpperCase()
  console.log(d)

  d3.select(".most-popular").select("img").attr("src", url )
  d3.select(".most-popular").select("h2").html(name)
  d3.select(".selected")
    .classed("selected-false",true)
    .style("opacity",.2)

  d3.select(this)
    .classed("selected-true",true)
    .style("opacity", 1)
        console.log(this)

}

function processData(data) {
   var obj = data.thoughts
  // console.log(obj)
   var newDataSet = [];
   for(var i in obj) {
      //if( !(obj[i].count <= 10 && obj[i].word.length > 5)) {
      //console.log(obj[i])
      newDataSet.push( {
        name: obj[i].word,
        className: obj[i].word.toLowerCase(),
        size: obj[i].count,
        url: obj[i].url
      });
      //}
    }
   return {children: newDataSet};
}

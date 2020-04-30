let margins = { top: 60, bottom: 45, left: 60, right: 60 };
let outerWidth = 700;
let outerHeight = 450;
let innerWidth = outerWidth - margins.left - margins.right;
let innerHeight = outerHeight - margins.top - margins.bottom;

let svg = d3.select("#hail")
    .attr("width", outerWidth)
    .attr("height", outerHeight);

// border
svg
    .append("rect")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
    .attr("fill", "transparent")
    .attr("stroke", "#EAEDED")
    .attr("stroke-width", 3);

var updraft = "M630, 400 T600, 390 T500, 330";
var downdraft = "M215, 325 T180, 350 T110, 415";

// updraft (red)
svg
    .append("path")  
    .attr("d", updraft)  
    .attr("fill","transparent")  
    .attr("stroke","red")  
    .attr("stroke-width",4)
    .attr("marker-end","url(#r_arrow)");

//downdraft (blue)
svg
    .append("path")  
    .attr("d", downdraft)  
    .attr("fill","transparent")  
    .attr("stroke","blue")  
    .attr("stroke-width",4)
    .attr("marker-end","url(#b_arrow)");

// 0C dotted line
svg
    .append("path")
    .attr("d", "M0, 300 T700, 300")
    .attr("stroke", '#B3B6B7')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', 2.5);

// -40C dotted line
svg
    .append("path")
    .attr("d", "M0, 150 T700, 150")
    .attr("stroke", '#B3B6B7')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', 2.5);

// 0C text
svg
    .append("text")
    .text('0° C')
    .attr('x', 600)
    .attr('y', 295)
    .attr('font-size', 15 )
    .attr('fill','black');

// -40C text
svg
    .append("text")
    .text('-40° C')
    .attr('x', 600)
    .attr('y', 145)
    .attr('font-size', 15 )
    .attr('fill','black');

// anvil text
svg
    .append("text")
    .text("anvil")
    .attr('x', 150)
    .attr('y', 80)
    .attr('font-size', 15 )
    .attr('fill','black');

// embryo curtain
svg
    .append("ellipse")
    .attr('cx', 450)
    .attr('cy', 225)
    .attr('rx', 50)
    .attr('ry', 100)
    .attr('fill', "mediumpurple")
    .attr('fill-opacity', '.7')
    .attr('stroke', 'black')
    .attr('stroke-opacity', '.5')

// trajectory 0 
let trajectory_a = svg.append("path")
    .attr("fill", "transparent")
	.attr("stroke", "transparent")
    .attr("stroke-width", "6")
	.attr("d", d3.svg.diagonal()
                     .source( {"x":470, "y":350} )
                     .target( {"x":250, "y":80} ) 
         );

// trajectory 1,2,3
const curve = d3.line().curve(d3.curveNatural);
const points = [[550, 350], [460, 225],
    [475, 150], [510, 225], [475, 250],
    [375, 170], [275, 440]];
         
trajectory_b =  svg
    .append('path')
    .attr('d', curve(points))
    .attr('stroke', 'transparent')
    // with multiple points defined, if you leave out fill:none,
    // the overlapping space defined by the points is filled with
    // the default value of 'black'
    .attr('fill', 'none');
         

svg.append("circle")
    .attr("cx", 470) //Starting x
    .attr("cy", 350) //Starting y
    .attr('r', 4)
    .attr('fill','lightblue')
    .attr('fill-opacity', '.9')
    .attr('stroke', 'black')
    .attr('stroke-opacity', '.5')
    .transition()
    .delay(1000)
    .duration(3000)
    .ease("linear")
    .tween("pathTween", function(){return pathTween(trajectory_a)})
    .transition()
    .attr("cx", 200)
    .attr("cy", 70)
    .duration(500)
    // .tween("pathTween", pathTween); //Custom tween to set the cx and cy attributes

svg.append("circle")
    .attr("cx", 550) //Starting x
    .attr("cy", 350) //Starting y
    .attr('r', 4)
    .attr('fill','#ECF0F1')
    .attr('fill-opacity', '.9')
    .attr('stroke', 'black')
    .attr('stroke-opacity', '.5')
    .transition()
    .delay(5000)
    .duration(6000)
    .ease("linear")
    .tween("pathTween", function(){return altPathTween(trajectory_b)})

function pathTween(path){
    var length = path.node().getTotalLength(); // Get the length of the path
    var r = d3.interpolate(0, length); //Set up interpolation from 0 to the path length
    return function(t){
        var point = path.node().getPointAtLength(r(t)); // Get the next point along the path
        d3.select(this) // Select the circle
            .attr("cx", point.x) // Set the cx
            .attr("cy", point.y) // Set the cy
    }
};

function altPathTween(path){
    var length = path.node().getTotalLength(); // Get the length of the path
    var r = d3.interpolate(0, length); //Set up interpolation from 0 to the path length
    return function(t){
        var point = path.node().getPointAtLength(r(t)); // Get the next point along the path
        d3.select(this) // Select the circle
            .attr("cx", point.x) // Set the cx
            .attr("cy", point.y) // Set the cy
            .attr('r', this.r.baseVal.value + .007)
    }
};

    



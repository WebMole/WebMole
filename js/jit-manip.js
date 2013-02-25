/*
    WebMole, an automated explorer and tester for Web 2.0 applications
    Copyright (C) 2012-2013 Gabriel Le Breton, Fabien Maronnaud,
    Sylvain Hallé et al.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var labelType, useGradients, nativeTextSupport, animate;

(function()
{
	var ua = navigator.userAgent,
	iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
	typeOfCanvas = typeof HTMLCanvasElement,
	nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
	textSupport = nativeCanvasSupport 
	&& (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
	//I'm setting this based on the fact that ExCanvas provides text support for IE
	//and that as of today iPhone/iPad current text support is lame
	labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
	nativeTextSupport = labelType == 'Native';
	useGradients = nativeCanvasSupport;
	animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
	elem: false,
	write: function(text){
		$('#status').html(text);
	}
};

function handle_json_file(filename)
{
	var json
	
	// Assign handlers immediately after making the request,
	// and remember the jqxhr object for this request
	var jqxhr = $.getJSON(filename, function() {
	  alert("success");
	})
	.error(function() {
		alert("There was an error with the upload file");
	});

	return jqxhr;
}


function initialize_RGraph()
{
	//init RGraph
	var my_rgraph = new $jit.RGraph({
		'injectInto': 'infovis',
		//Optional: Add a background canvas
		//that draws some concentric circles.
		'background': {
			'CanvasStyles': {
				'strokeStyle': '#555',
				'shadowBlur': 50,
				'shadowColor': '#ccc'
			}
		},
		
		//Nodes and Edges parameters
		//can be overridden if defined in 
		//the JSON input data.
		//This way we can define different node
		//types individually.
		Node: {
			'overridable': true,
			'color': '#cc0000'
		},
		Edge: {
			'overridable': true,
			'color': '#cccc00'
		},
		//Set polar interpolation.
		//Default's linear.
		interpolation: 'linear',
		//Change the transition effect from linear
		//to elastic.
		transition: $jit.Trans.Cubic.easeOut,
		//Change other animation parameters.
		duration:1000,
		fps: 30,
		//Change father-child distance.
		levelDistance: 100,
		
		// Tips handling hover text!
		Tips: {  
			enable: true,  
			type: 'Native',  
			offsetX: 10,  
			offsetY: 10,  
			onShow: function(tip, node) {  
				tip.innerHTML = node.name + ' ' + node.data.$type;
			}  
		},

		//This method is called right before plotting
		//an edge. This method is useful to change edge styles
		//individually.
		onBeforePlotLine: function(adj){
		//Add some random lineWidth to each edge.
		if (!adj.data.$lineWidth) 
			adj.data.$lineWidth = Math.random() * 5 + 1;
		},

		onBeforeCompute: function(node){
			Log.write("centering " + node.name + "...");

			// Update node infomations
			data = node.data;
			$('#jit-data-id').html(node.id);
			$('#jit-data-name').html(node.name);
			
			if("$type" in data) {
		       $('#jit-data-type').html('<span class="label label-important">' + data.$type + '</span>');
		    }
			else
			{
				$('#jit-data-type').html('<span class="label">default</span>');
			}
			
			if("path" in data) {
				$('#jit-data-path').html('<span class="label label-info">' + data.path + '</span>');
			}
			else
		    {
		    	$('#jit-data-path').html('<span class="label">no data</span>');
		    }

			var adjanciesHtml;
			adjanciesHtml = '<ul class="thumblail">';
			node.eachAdjacency(function(adj)
			{
				var child = adj.nodeTo;
				adjanciesHtml += "<li>" + child.name + "</li>";
			});
			adjanciesHtml += "</ul>";
			$('#adjencies').html(adjanciesHtml);

		},
		
		//Add node click handler and some styles.
		//This method is called only once for each node/label crated.
		onCreateLabel: function(domElement, node){
			domElement.innerHTML = node.name;
			domElement.onclick = function () {
				my_rgraph.onClick(node.id, { 
					hideLabels: false,
					onComplete: function() {
						Log.write("done");
					}
				});
			};
			var style = domElement.style;
			style.cursor = 'pointer';
			style.fontSize = "0.8em";
			style.color = "#fff";
		},
		
		//This method is called when rendering/moving a label.
		//This is method is useful to make some last minute changes
		//to node labels like adding some position offset.
		onPlaceLabel: function(domElement, node){
			var style = domElement.style;
			var left = parseInt(style.left);
			var w = domElement.offsetWidth;
			style.left = (left - w / 2) + 'px';
		}
	}); // End RGraph

	return my_rgraph;
}

function initialize_RGraph_nodetypes() {
	$jit.RGraph.Plot.NodeTypes.implement({
		'homepage':
		{
			'render': function(node, canvas)
			{
				//print your custom node to canvas
				var pos = node.pos.getc(true);
				var img = $('#homepage-icon');
				var ctx = canvas.getCtx();
				//ctx.drawImage(img, pos.x, pos.y - img.height/2);
			},
			//optional  
			'contains': function(node, pos)
			{  
				//return true if pos is inside the node or false otherwise  
			}
		}
	});
}

/**
 * Create the graph with some JSON data. This function is
 * to be called only the *first* time something must be
 * displayed, as it wipes previous data; for remaining calls,
 * use update_graph.
 */
function create_graph(json_data) // {{{
{
	// create our graph
	var my_rgraph = initialize_RGraph()

	// Create our custom nodetypes
	initialize_RGraph_nodetypes()

  	//load the graph.
	my_rgraph.loadJSON(json_data, 1);

	//compute positions and plot
	my_rgraph.refresh();

	// Do something nasty?
	my_rgraph.controller.onBeforeCompute(my_rgraph.graph.getNode(my_rgraph.root));
	
	Log.write('Graph sucessfully created');
}

/**
 * Update the graph with some additional JSON data.
 * The graph is in the global variable my_rgraph
 */
function update_graph(json) // {{{
{
  synchronise_graphe(explored_id);
  my_rgraph.computeIncremental({
      iter: 20,
      property: 'end',
      onStep: function(perc) {
        //Log.write("loading " + perc + "%");
      },
      onComplete: function() {
        //Log.write("done");
        my_rgraph.animate();
      }
  });
} // }}}
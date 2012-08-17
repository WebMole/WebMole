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


function initialize_default_data()
{
	var json = [{  
		"id": "node0",  
		"name": "HomePage node!",  
		"data": {  
			"$dim": 13.077119090372014,  
			"$type": "homepage",
			"path": "blabla"
		},  
		"adjacencies": [{  
			"nodeTo": "node1",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node2",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node3",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node4",  
			"data": {  
				"$type":"arrow",  
				"$color":"#dd99dd",  
				"$dim":25,  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node5",  
			"data": {  
				"weight": 1  
			}  
		}]  
	}, {  
		"id": "node1",  
		"name": "Useless Star node",  
		"data": {  
			"$dim": 13.077119090372014,  
			"$type": "star",
			"path": "blah"
		},  
		"adjacencies": [{  
			"nodeTo": "node0",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node2",  
			"data": {  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node3",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node4",  
			"data": {  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node5",  
			"data": {  
				"weight": 1  
			}  
		}]  
	}, {  
		"id": "node2",  
		"name": "node2 name",  
		"data": {  
			"$dim": 24.937383149648717,  
			"$type": "triangle",  
			"some other key": "some other value"  
		},  
		"adjacencies": [{  
			"nodeTo": "node0",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node1",  
			"data": {  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node3",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node4",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node5",  
			"data": {  
				"weight": 1  
			}  
		}]  
	}, {  
		"id": "node3",  
		"name": "node3 name",  
		"data": {  
			"$dim": 10.53272740718869,  
			"some other key": "some other value"  
		},  
		"adjacencies": [{  
			"nodeTo": "node0",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node1",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node2",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node4",  
			"data": {  
				"$type":"arrow",  
				"$direction": ["node4", "node3"],  
				"$dim":25,  
				"$color":"#dd99dd",  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node5",  
			"data": {  
				"weight": 3  
			}  
		}]  
	}, {  
		"id": "node4",  
		"name": "node4 name",  
		"data": {  
			"$dim": 5.3754347037767345,  
			"$type":"triangle",  
			"path": "/javascript-information-visualization-toolkit/rUidNEMYMa0/SNAXHJtbsbMJ%5B1-25%5D"
		},  
		"adjacencies": [{  
			"nodeTo": "node0",  
			"data": {  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node1",  
			"data": {  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node2",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node3",  
			"data": {  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node5",  
			"data": {  
				"weight": 3  
			}  
		}]  
	}, {  
		"id": "node5",  
		"name": "node5 name",  
		"data": {  
			"$dim": 32.26403873194912,  
			"$type": "star",  
			"some other key": "some other value"  
		},  
		"adjacencies": [{  
			"nodeTo": "node0",  
			"data": {  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node1",  
			"data": {  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node2",  
			"data": {  
				"weight": 1  
			}  
		}, {  
			"nodeTo": "node3",  
			"data": {  
				"weight": 3  
			}  
		}, {  
			"nodeTo": "node4",  
			"data": {  
				"weight": 3  
			}  
		}]  
	}];
	return json;
}

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
	// if no data sent, use default json
	if(json_data == "")
		json_data = initialize_default_data();

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
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

var webExplorer_nodeId = 0;
var webExplorer_nodeList = new Array(); //Liste de tous les noeuds 
var webExplorer_urlStart; //Adresse du noeud d'origine
var webExplorer_nodeCurrentId, webExplorer_nodePreviousId; //Id du noeud en cours et du noeud précédent
var webExplorer_elementPath = null; //Chemin relatif au dernier élément DOM visité
var webExplorer_elementToExplore = "*";
var webExplorer_stylesToCompute = new Array();
var webExplorer_hasToComputeStyles = false;
var webExplorer_manualActiveColorType = new Array();
var webExplorer_manualActiveColorLink = new Array();
var webExplorer_manualActiveColorC = new Array();
var webExplorer_stop = false;
var webExplorer_iframeLoaded = false;
// Oracles
var webExplorer_useTestOracle = true;
var webExplorer_useStopOracle = true;
Array.prototype.clear = function ()
{
	this.splice(0, this.length)
}

function webExplorer_setNewNodeHtmlContent(nodeId, newNodeHtmlContent)
{
	for (var h = 0; h < webExplorer_nodeList.length; h++)
	{
		if (webExplorer_nodeList[h].id == nodeId)
		{
			webExplorer_nodeList[h].nodeHtmlContent = newNodeHtmlContent;
		}
	}
}

function webExplorer_manualGoToOriginalNode()
{
	webExplorer_elementPath = null;
	$('#sh_explorer_frame').attr('src', webExplorer_urlStart);
}

function webExplorer_reset()
{
	webExplorer_nodeId = 0;
	webExplorer_urlStart, webExplorer_nodeCurrentId, webExplorer_nodePreviousId, webExplorer_nodeCurrentId, webExplorer_nodePreviousId = '';
	webExplorer_elementPath = null;
	webExplorer_nodeList.clear();
	webExplorer_manualActiveColorType.clear();
	webExplorer_manualActiveColorLink.clear();
	webExplorer_manualActiveColorC.clear();
	webExplorer_iframeLoaded = false;
	$('#web-explorer-node-n-number').val(0);
	$('#web-explorer-node-j-number').val(0);
	$('#web-explorer-node-a-number').val(0);
	$('#web-explorer-el-number').val(0);
	$('#sh_explorer_frame').attr('src', '');
	$(".webExplorer_console").remove();
}

function webExplorer_setStop()
{
	webExplorer_stop = true;
}

function webExplorer_manualActiveColor(element)
{
	if ($('#web-explorer-manual-color-' + element + '-c').is(":checked"))
	{
		$('#web-explorer-manual-color-' + element).fadeIn('fast');
	}
	else
	{
		$('#web-explorer-manual-color-' + element).fadeOut('fast');
	}
	webExplorer_manualSetActiveColor();
}

function webExplorer_manualSetActiveColor()
{
	webExplorer_manualActiveColorType = new Array();
	webExplorer_manualActiveColorLink = new Array();
	webExplorer_manualActiveColorC = new Array();
	$('.web-explorer-manual-color-c').each(function (index, element)
	{
		if ($(this).is(':checked'))
		{
			webExplorer_manualActiveColorType.push($(this).attr('css-type'));
			webExplorer_manualActiveColorLink.push($(this).attr('link-type'));
			webExplorer_manualActiveColorC.push($('#web-explorer-manual-color-' + $(this).attr('css-type') + '-' + $(this).attr('link-type')).css('background-color'));
		}
	});
	if (webExplorer_iframeLoaded)
	{
		document.getElementById('sh_explorer_frame').contentWindow.webExplorer_manualSetColor(webExplorer_nodeCurrentId);
	}
}

function webExplorer_selectAllCheckbox(classC, how)
{
	$('.' + classC).each(function (index, element)
	{
		if (how == 'true')
		{
			$(this).attr('checked', true);
		}
		else
		{
			$(this).attr('checked', false);
		}
	});
}

function webExplorer_go(where)
{
	$(".web-explorer").hide(0);
	$("#web-explorer-" + where).fadeIn('fast');
}

function webExplorer_showComputeStyles()
{
	if ($('#web-explorer-compute-style').is(':checked'))
	{
		$('#web-explorer-compute-style-list').fadeIn('fast');
	}
	else
	{
		$('#web-explorer-compute-style-list').fadeOut('fast');
	}
}

function webExplorer_automaticOption(option)
{
	$(".web-explorer-automatic-option").fadeOut('fast');
	if (option == "specify")
	{
		$("#web-explorer-automatic-option-specify").fadeIn();
	}
	else if (option == "computed")
	{
		$("#web-explorer-automatic-option-computed").fadeIn();
	}
}

function webExplorer_specifyElements()
{
	var hasToSpecifyElements = false;
	var specifiedElements = new Array();
	$(".web-explorer-specify-element:not(:checked)").each(function (index, element)
	{
		hasToSpecifyElements = true;
		return false;
	});
	if (hasToSpecifyElements)
	{
		$(".web-explorer-specify-element:checked").each(function (index, element)
		{
			specifiedElements.push($(this).attr("element-name"));
		});
		var specifiedElementsList = specifiedElements.join(",");
		webExplorer_elementToExplore = specifiedElementsList;
	}
	else
	{
		webExplorer_elementToExplore = "*";
	}
}

function webExplorer_computeStyles()
{
	if ($("#web-explorer-compute-style").is(":checked"))
	{
		webExplorer_hasToComputeStyles = true;
		var computedStylesList = new Array();
		$(".web-explorer-compute-style:checked").each(function (index, element)
		{
			computedStylesList.push($(this).attr("style-name"));
		});
		webExplorer_stylesToCompute = computedStylesList;
	}
	else
	{
		webExplorer_hasToComputeStyles = false;
		webExplorer_stylesToCompute.clear();
	}
}
//Charge la page désirée dans l'iframe et injecte le script de cartographie javascript
function webExplorer_start(type)
{
	$('#sh_explorer_frame').remove();
	$('#sh_explorer_frame_container').html('<iframe id="sh_explorer_frame"></iframe>');
	$("#web-explorer-" + type + "-step1").fadeOut('fast', function ()
	{
		$("#web-explorer-" + type + "-step2").fadeIn('fast');
		$("#web-explorer-viewer").fadeIn('fast');
		webExplorer_reset();
		if (type == 'automatic')
		{
			webExplorer_specifyElements();
			webExplorer_computeStyles();
		}
		else
		{
			webExplorer_manualSetActiveColor();
		}
		webExplorer_urlStart = $("#web-explorer-" + type + "-url").val();
		$('#sh_explorer_frame').attr('src', webExplorer_urlStart);
		$('#sh_explorer_frame').load(function ()
		{
			var myf = document.getElementById("sh_explorer_frame");
			myf = myf.contentWindow.document || myf.contentDocument;
			var script = myf.createElement("script");
			script.type = "text/javascript";
			script.src = webExplorer_applicationDirectory + "/js/web-explorer-" + type + ".js?a=" + (Math.random()); // use this for linked script
			myf.head.appendChild(script);
			startTime = new Date().getTime();
		});
	});
}
// iFrame Generator, could be usefull.
function prepareFrame()
{
	ifrm = document.createElement("IFRAME");
	ifrm.setAttribute("src", "http://google.com/");
	ifrm.style.width = 640 + "px";
	ifrm.style.height = 480 + "px";
	document.body.appendChild(ifrm);
}
//Classe Noeud
function webExplorer_Node(nodeHtmlContent, nodeDomTreePath, nodeDomTreeText, nodeDocumentLocationHref, nodeType, domdocument)
{
	this.id = webExplorer_newNodeId();
	// // Traitement d'oracles
	if (webExplorer_useTestOracle)
	{
		var testResult = testOracleFunction(domdocument);
	}
	if (webExplorer_useStopOracle)
	{
		var stopResult = stopOracleFunction(domdocument);
	}
	// Ajout des éléments aux noeud
	this.nodeHtmlContent = nodeHtmlContent; //Contenu entier de la page HTML
	this.nodeDomTreePath = nodeDomTreePath; //Tableau des différents éléments DOM de la page
	this.nodeDomTreeText = nodeDomTreeText; //Tableau du texte des différents éléments DOM de la page
	this.nodeDocumentLocationHref = nodeDocumentLocationHref; //Url du noeud
	this.nodeDomTreeVisited = webExplorer_initDomTreeVisited(nodeDomTreePath); //Tableau relatifs aux chemin des éléments DOM visités ou non
	this.nodeType = nodeType;
	this.nodeExternalLink = new Array(); //Tableau des liens sortants
	webExplorer_nodeList.push(this);
	webExplorer_consoleAlertNewNode(this.id, this.nodeDocumentLocationHref, this.nodeType, testResult, stopResult);
	if (stopResult == true) webExplorer_stop = true;
}
//Fonction permettant d'instancier un nouveau noeud à partir du code javascript de l'iFrame
function webExplorer_newNode(nodeHtmlContent, nodeDomTreePath, nodeDomTreeText, nodeDocumentLocationHref, nodeType, domdocument)
{
	new webExplorer_Node(nodeHtmlContent, nodeDomTreePath, nodeDomTreeText, nodeDocumentLocationHref, nodeType, domdocument);
}
//Génère un nouvel identifiant unique pour un noeud
function webExplorer_newNodeId()
{
	webExplorer_nodeId = webExplorer_nodeId + 1;
	return webExplorer_nodeId;
}
//Instancie le tableau pour savoir si les éléments DOM du noeud ont été visités ou non (tout les enregistrements à faux)
function webExplorer_initDomTreeVisited(nodeDomTreePath)
{
	var nodeDomTreeVisited = new Array();
	for (var i = 0; i < nodeDomTreePath.length; i++)
	{
		nodeDomTreeVisited.push(false);
	}
	return nodeDomTreeVisited;
}
//Retourne vrai si l'élément du noeud passé en paramètre a été visité (et faux dans le cas échant)
function webExplorer_hasBeenVisitedElementPath(nodeId, elementPath)
{
	for (var h = 0; h < webExplorer_nodeList.length; h++)
	{
		if (webExplorer_nodeList[h].id == nodeId)
		{
			for (var i = 0; i < webExplorer_nodeList[h].nodeDomTreePath.length; i++)
			{
				if (webExplorer_nodeList[h].nodeDomTreePath[i] == elementPath)
				{
					if (webExplorer_nodeList[h].nodeDomTreeVisited[i] == true)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
			}
		}
	}
}
//Indique que l'élément du noeud a été visité
function webExplorer_setElementPathVisited(nodeId, elementPath)
{
	for (var h = 0; h < webExplorer_nodeList.length; h++)
	{
		if (webExplorer_nodeList[h].id == nodeId)
		{
			for (var i = 0; i < webExplorer_nodeList[h].nodeDomTreePath.length; i++)
			{
				if (webExplorer_nodeList[h].nodeDomTreePath[i] == elementPath && webExplorer_nodeList[h].nodeDomTreeVisited[i] == false)
				{
					webExplorer_nodeList[h].nodeDomTreeVisited[i] = true;
				}
			}
		}
	}
}
//Retourne vrai si l'élément du noeud correspondant a déja été visité (et faux dans le cas échant)
function webExplorer_nodeAlreadySeen(nodeHtmlContent, nodeDomTreePath, nodeDomTreeText)
{
	var process = true;
	var alreadySeen = false;
	for (var i = 0; i < webExplorer_nodeList.length; i++)
	{
		if (process)
		{
			if (nodeHtmlContent == webExplorer_nodeList[i].nodeHtmlContent)
			{
				alreadySeen = true;
				process = false;
			}
		}
	}
	return alreadySeen;
}
//Retourne l'id du noeud qui correspond au code html en paramètre
function webExplorer_getNodeId(nodeHtmlContent, nodeDomTreePath, nodeDomTreeText)
{
	var process = true;
	var alreadySeen = false;
	var nodeIdAlreadySeen;
	for (var i = 0; i < webExplorer_nodeList.length; i++)
	{
		if (process)
		{
			if (nodeHtmlContent == webExplorer_nodeList[i].nodeHtmlContent)
			{
				nodeIdAlreadySeen = webExplorer_nodeList[i].id;
				alreadySeen = true;
				process = false;
			}
		}
	}
	return nodeIdAlreadySeen;
}
//Retourne l'adresse du noeud d'origine
function getUrlStart()
{
	return webExplorer_urlStart;
}
//Retourne vrai si l'élément du noeud est également un lien sortant (et faux dans le cas échant)
function webExplorer_isExternalLink(nodeId, elementPath)
{
	for (var h = 0; h < webExplorer_nodeList.length; h++)
	{
		if (webExplorer_nodeList[h].id == nodeId)
		{
			for (var i = 0; i < webExplorer_nodeList[h].nodeExternalLink.length; i++)
			{
				if (webExplorer_nodeList[h].nodeExternalLink[i].elementPath == elementPath)
				{
					return true;
				}
			}
		}
	}
	return false;
}
//Classe lien sortant
function ExternalLink(nodeIdDest, elementPath)
{
	this.nodeIdDest = nodeIdDest; //Id du noeud de destination
	this.elementPath = elementPath; //Chemin du lien sortant du noeud relatif
}
//Ajout un lien sortant au noeud relatif
function webExplorer_setExternalLink(nodeId, nodeIdDest, elementPath)
{
	var exist = false;
	for (var h = 0; h < webExplorer_nodeList.length; h++)
	{
		if (webExplorer_nodeList[h].id == nodeId)
		{
			for (var i = 0; i < webExplorer_nodeList[h].nodeExternalLink.length; i++)
			{
				if (webExplorer_nodeList[h].nodeExternalLink[i].elementPath == elementPath)
				{
					exist = true;
				}
			}
			if (exist == false)
			{
				var externalLink = new ExternalLink(nodeIdDest, elementPath);
				webExplorer_nodeList[h].nodeExternalLink.push(externalLink);
				webExplorer_consoleAlertNewExternalLink(nodeId, nodeIdDest);
			}
		}
	}
}
//Indique que le lien sortant du noeud a été visité
function webExplorer_setExternalLinkVisited(nodeId, elementPath)
{
	for (var h = 0; h < webExplorer_nodeList.length; h++)
	{
		if (webExplorer_nodeList[h].id == nodeId)
		{
			for (var i = 0; i < webExplorer_nodeList[h].nodeExternalLink.length; i++)
			{
				if (webExplorer_nodeList[h].nodeExternalLink[i].elementPath == elementPath)
				{
					webExplorer_nodeList[h].nodeExternalLink[i].visited = true;
				}
			}
		}
	}
}
//Retourne vrai si le lien sortant du noeud passé en paramètre a été visité (et faux dans le cas échant)
function webExplorer_hasBeenVisitedExternalLink(nodeId, elementPath)
{
	for (var h = 0; h < webExplorer_nodeList.length; h++)
	{
		if (webExplorer_nodeList[h].id == nodeId)
		{
			for (var i = 0; i < webExplorer_nodeList[h].nodeExternalLink.length; i++)
			{
				if (webExplorer_nodeList[h].nodeExternalLink[i].elementPath == elementPath)
				{
					if (webExplorer_nodeList[h].nodeExternalLink[i].visited == true)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
			}
		}
	}
}

function webExplorer_consoleAlertNewNode(nodeId, nodeDocumentLocationHref, nodeType, isTestNode, isStopNode)
{
	var iconNodeType;
	var nodeColor = "alert-success";
	var testText = "<span class='label'>true</span>";
	var stopText = "<span class='label'>false</span>";
	isTestNode = typeof isTestNode !== 'undefined' ? isTestNode : true;
	isStopNode = typeof isStopNode !== 'undefined' ? isStopNode : false;
	// Flags
	if (!isTestNode)
	{
		nodeColor = "alert-warning";
		testText = "<span class='label label-warning'>False</span>";
	}
	if (isStopNode)
	{
		nodeColor = "alert-error";
		stopText = "<span class='label label-important'>True</span>";
	}
	if (!isTestNode && isStopNode)
	{
		nodeColor = "alert-teststop";
	}
	// node types
	if (nodeType == "javascript")
	{
		$('#web-explorer-node-j-number').val(parseInt($('#web-explorer-node-j-number').val()) + 1);
		iconNodeType = "icon-repeat";
	}
	else if (nodeType == "ajax")
	{
		$('#web-explorer-node-a-number').val(parseInt($('#web-explorer-node-a-number').val()) + 1);
		iconNodeType = "icon-cog";
	}
	else
	{
		$('#web-explorer-node-n-number').val(parseInt($('#web-explorer-node-n-number').val()) + 1);
		iconNodeType = "icon-certificate";
	}
	var consoleNodePopover = '<div id=\'NodePopovercontent' + nodeId + '\' style="display: none;">';
	consoleNodePopover += '<table class=\'table\'">';
	consoleNodePopover += '<tr>';
	consoleNodePopover += '<td>Type</td>';
	consoleNodePopover += '<td>' + nodeType + '</td>';
	consoleNodePopover += '</tr>';
	consoleNodePopover += '<tr>';
	consoleNodePopover += '<td>Document location</td>';
	consoleNodePopover += '<td><a href="' + nodeDocumentLocationHref + '" target="_blank">' + nodeDocumentLocationHref + '</a></td>';
	consoleNodePopover += '</tr>';
	consoleNodePopover += '<tr>';
	consoleNodePopover += '<td>External links</td>';
	consoleNodePopover += '<td>';
	consoleNodePopover += '<ul id=\'webExplorer_consoleNodeLinks' + nodeId + '\'></ul>';
	consoleNodePopover += '</td>';
	consoleNodePopover += '</tr>';
	consoleNodePopover += '<tr><td>Flags</td>';
	consoleNodePopover += '<td><ul>';
	if (webExplorer_useTestOracle)
	{
		consoleNodePopover += '<li>Test oracle: ' + testText + '</li>';
	}
	if (webExplorer_useStopOracle)
	{
		consoleNodePopover += '<li>Stop oracle: ' + stopText + '</li>';
	}
	consoleNodePopover += '</ul></td></tr>';
	consoleNodePopover += '</table>';
	consoleNodePopover += '</div>';
	var consoleNodeContent = '<div id="webExplorer_consoleNode' + nodeId + '" data-original-title="Node ' + nodeId + ' details :" class="alert ' + nodeColor + ' webExplorer_console" style="margin-bottom:2px;">';
	consoleNodeContent += '<a href="#">';
	consoleNodeContent += '<i class="' + iconNodeType + '"></i> <strong>Node ' + nodeId + '</strong>';
	consoleNodeContent += '</a>';
	consoleNodeContent += '</div>';
	$('#web-explorer-console').append(consoleNodeContent);
	$('#web-explorer-console').append(consoleNodePopover);
	$('#webExplorer_consoleNode' + nodeId).clickover(
	{
		html: true,
		trigger: 'click',
		content: function ()
		{
			return $('#NodePopovercontent' + nodeId).html();
		}
	});
}

function webExplorer_consoleAlertNewExternalLink(nodeId, nodeIdDest)
{
	$('#web-explorer-el-number').val(parseInt($('#web-explorer-el-number').val()) + 1);
	$("#web-explorer-console").append('<div class="alert alert-info webExplorer_console" style="margin-bottom:2px;"><button type="button" class="close" data-dismiss="alert">×</button><i class="icon-arrow-right icon-white"></i> <strong>External link </strong>from node ' + nodeId + ' to  node ' + nodeIdDest + '</div>');
	webExplorer_consolePopoverUpdate(nodeId);
}

function webExplorer_consolePopoverUpdate(nodeId)
{
	var nodeExternalLinks = "";
	for (var i = 0; i < webExplorer_nodeList.length; i++)
	{
		if (webExplorer_nodeList[i].id == nodeId)
		{
			var nodeType = webExplorer_nodeList[i].nodeType;
			var nodeDocumentLocationHref = webExplorer_nodeList[i].nodeDocumentLocationHref;
			for (var j = 0; j < webExplorer_nodeList[i].nodeExternalLink.length; j++)
			{
				nodeExternalLinks += '<li>Node ' + webExplorer_nodeList[i].nodeExternalLink[j].nodeIdDest + ' : ' + webExplorer_nodeList[i].nodeExternalLink[j].elementPath + '</li>';
			}
		}
	}
	$('#webExplorer_consoleNodeLinks' + nodeId).append(nodeExternalLinks);
}

function webExplorer_nodeToXml()
{
	var nodeToXml = '<urlset>';
	for (var i = 0; i < webExplorer_nodeList.length; i++)
	{
		nodeToXml += '<url>';
		nodeToXml += '<nodeid>' + webExplorer_nodeList[i].id + '</nodeid>';
		nodeToXml += '<href><![CDATA[' + webExplorer_nodeList[i].nodeDocumentLocationHref + ']]></href>';
		nodeToXml += '<dom><![CDATA[' + webExplorer_nodeList[i].nodeHtmlContent + ']]></dom>';
		nodeToXml += '<links>';
		for (j = 0; j < webExplorer_nodeList[i].nodeExternalLink.length; j++)
		{
			nodeToXml += '<link>';
			nodeToXml += '<path>' + webExplorer_nodeList[i].nodeExternalLink[j].elementPath + '</path>';
			nodeToXml += '<nodeid>' + webExplorer_nodeList[i].nodeExternalLink[j].nodeIdDest + '</nodeid>';
			for (h = 0; h < webExplorer_nodeList.length; h++)
			{
				if (webExplorer_nodeList[h].id == webExplorer_nodeList[i].nodeExternalLink[j].nodeIdDest)
				{
					nodeToXml += '<href><![CDATA[' + webExplorer_nodeList[i].nodeDocumentLocationHref + ']]></href>';
					nodeToXml += '<type><![CDATA[' + webExplorer_nodeList[i].nodeType + ']]></type>';
				}
			}
			nodeToXml += '</link>';
		}
		nodeToXml += '</links>';
		nodeToXml += '</url>';
	}
	nodeToXml += '</urlset>';
	return nodeToXml;
}

function webExplorer_nodeToJson()
{
	var nodeToJson = {
		"url": []
	};
	for (var i = 0; i < webExplorer_nodeList.length; i++)
	{
		nodeToJson.url.push(
		{
			"nodeid": webExplorer_nodeList[i].id,
			"href": webExplorer_nodeList[i].nodeDocumentLocationHref,
			"dom": webExplorer_nodeList[i].nodeHtmlContent,
			"links": []
		});
		for (var j = 0; j < webExplorer_nodeList[i].nodeExternalLink.length; j++)
		{
			for (h = 0; h < webExplorer_nodeList.length; h++)
			{
				if (webExplorer_nodeList[h].id == webExplorer_nodeList[i].nodeExternalLink[j].nodeIdDest)
				{
					nodeToJson.url[i].links.push(
					{
						"nodeid": webExplorer_nodeList[i].nodeExternalLink[j].nodeIdDest,
						"path": webExplorer_nodeList[i].nodeExternalLink[j].elementPath,
						"href": webExplorer_nodeList[h].nodeDocumentLocationHref,
						"type": webExplorer_nodeList[h].nodeType
					});
				}
			}
		}
	}
	mapViewerInput.getSession().setValue(JSON.stringify(nodeToJson, null, '\t'));
}
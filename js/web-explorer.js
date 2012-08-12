var webExplorer_nodeId = 0;
var webExplorer_nodeList = new Array();//Liste de tous les noeuds 
var webExplorer_urlStart;//Adresse du noeud d'origine
var webExplorer_nodeCurrentId,webExplorer_nodePreviousId;//Id du noeud en cours et du noeud précédent
var webExplorer_elementPath = null;//Chemin relatif au dernier élément DOM visité

//Charge la page désirée dans l'iframe et injecte le script de cartographie javascript
function webExplorer_start(){
	webExplorer_urlStart = $("#sh_url_start").val();
	$('#sh_explorer_frame').attr('src', webExplorer_urlStart);
	$('#sh_explorer_frame').load(function() 
    {
        var myf = document.getElementById("sh_explorer_frame");
		myf = myf.contentWindow.document || myf.contentDocument;	
		var script   = myf.createElement("script");
		script.type  = "text/javascript";
		script.src   = "http://localhost:8888/GabLeRoux-Urlset-Manager-Project-9990194/js/web-explorer-iframe.js?a="+(Math.random());// use this for linked script
		myf.head.appendChild(script);
		startTime = new Date().getTime();			
    });	
	
}

//Classe Noeud
function webExplorer_Node(nodeHtmlContent, nodeDomTreePath, nodeDomTreeText, nodeDocumentLocationHref, nodeType) {
	//console.log(nodeHtmlContent);
	this.id=webExplorer_newNodeId();
	this.nodeHtmlContent = nodeHtmlContent;//Contenu entier de la page HTML
	this.nodeDomTreePath = nodeDomTreePath;//Tableau des différents éléments DOM de la page
	this.nodeDomTreeText = nodeDomTreeText;//Tableau du texte des différents éléments DOM de la page
	this.nodeDocumentLocationHref = nodeDocumentLocationHref;//Url du noeud
	this.nodeDomTreeVisited = webExplorer_initDomTreeVisited(nodeDomTreePath);//Tableau relatifs aux chemin des éléments DOM visités ou non
	this.nodeType = nodeType;
	this.nodeExternalLink = new Array();//Tableau des liens sortants
	webExplorer_nodeList.push(this);
	webExplorer_consoleAlertNewNode(this.id,this.nodeDocumentLocationHref,this.nodeType);
	//console.log("Nouveau noeud"+this.id);
}

//Fonction permettant d'instancier un nouveau noeud à partir du code javascript de l'iFrame
function webExplorer_newNode(nodeHtmlContent, nodeDomTreePath, nodeDomTreeText, nodeDocumentLocationHref, nodeType){
	new webExplorer_Node(nodeHtmlContent, nodeDomTreePath,nodeDomTreeText, nodeDocumentLocationHref, nodeType);
	
}

//Génère un nouvel identifiant unique pour un noeud
function webExplorer_newNodeId(){
	webExplorer_nodeId = webExplorer_nodeId+1;
	return webExplorer_nodeId; 
}

//Instancie le tableau pour savoir si les éléments DOM du noeud ont été visités ou non (tout les enregistrements à faux)
function webExplorer_initDomTreeVisited(nodeDomTreePath){
	var nodeDomTreeVisited = new Array();
	for(var i=0;i<nodeDomTreePath.length;i++){
		nodeDomTreeVisited.push(false);
	}
	return nodeDomTreeVisited; 
}

//Retourne vrai si l'élément du noeud passé en paramètre a été visité (et faux dans le cas échant)
function webExplorer_hasBeenVisitedElementPath(nodeId,elementPath){
	for(var h=0;h<webExplorer_nodeList.length;h++){
		if(	webExplorer_nodeList[h].id == nodeId){
			for(var i=0;i<webExplorer_nodeList[h].nodeDomTreePath.length;i++){
				if(webExplorer_nodeList[h].nodeDomTreePath[i]==elementPath){
					if(webExplorer_nodeList[h].nodeDomTreeVisited[i]==true){
						return true;
					}
					else{
						return false;
					}
				}
			}
		}
	}	
}

//Indique que l'élément du noeud a été visité
function webExplorer_setElementPathVisited(nodeId,elementPath){
	for(var h=0;h<webExplorer_nodeList.length;h++){
		if(	webExplorer_nodeList[h].id == nodeId){
			for(var i=0;i<webExplorer_nodeList[h].nodeDomTreePath.length;i++){
				if(webExplorer_nodeList[h].nodeDomTreePath[i] == elementPath && webExplorer_nodeList[h].nodeDomTreeVisited[i]==false){
					webExplorer_nodeList[h].nodeDomTreeVisited[i]=true;
					//console.log("Dom "+webExplorer_nodeList[h].nodeDomTreePath[i]+" pour le noeud "+nodeId+" visité");
				}
			}
		}
	}	
}

//Retourne vrai si l'élément du noeud correspondant a déja été visité (et faux dans le cas échant)
function webExplorer_nodeAlreadySeen(nodeHtmlContent,nodeDomTreePath,nodeDomTreeText){
	var process = true;
	var alreadySeen = false;
	for(var i=0;i<webExplorer_nodeList.length;i++){
		if(process){
			if(nodeHtmlContent==webExplorer_nodeList[i].nodeHtmlContent){
				alreadySeen = true;
				process=false;
			}
		}
	}
	return alreadySeen;	
}

//Retourne l'id du noeud qui correspond au code html en paramètre
function webExplorer_getNodeId(nodeHtmlContent,nodeDomTreePath,nodeDomTreeText){
	var process = true;
	var alreadySeen = false;
	var nodeIdAlreadySeen;
	for(var i=0;i<webExplorer_nodeList.length;i++){
		if(process){
			if(nodeHtmlContent==webExplorer_nodeList[i].nodeHtmlContent){
				nodeIdAlreadySeen = webExplorer_nodeList[i].id;
				alreadySeen = true;
				process=false;
			}
		}
	}
	return nodeIdAlreadySeen;	
}

//Retourne l'adresse du noeud d'origine
function getUrlStart(){
	return webExplorer_urlStart;
}

//Retourne vrai si l'élément du noeud est également un lien sortant (et faux dans le cas échant)
function webExplorer_isExternalLink(nodeId,elementPath){
	for(var h=0;h<webExplorer_nodeList.length;h++){
		if(	webExplorer_nodeList[h].id == nodeId){
			for(var i=0;i<webExplorer_nodeList[h].nodeExternalLink.length;i++){
				if(webExplorer_nodeList[h].nodeExternalLink[i].elementPath==elementPath){
					return true;
				}
			}
		}
	}
	return false;
}

//Classe lien sortant
function ExternalLink(nodeIdDest,elementPath){
	this.nodeIdDest=nodeIdDest;//Id du noeud de destination
	this.elementPath=elementPath;//Chemin du lien sortant du noeud relatif
	//console.log("Nouveau lien sortant : "+elementPath +"|"+nodeIdDest);
}





//Ajout un lien sortant au noeud relatif
function webExplorer_setExternalLink(nodeId,nodeIdDest,elementPath){
	var exist = false;
	for(var h=0;h<webExplorer_nodeList.length;h++){
		if(	webExplorer_nodeList[h].id == nodeId){
			for(var i=0;i<webExplorer_nodeList[h].nodeExternalLink.length;i++){
				if(webExplorer_nodeList[h].nodeExternalLink[i].elementPath==elementPath){
					exist = true;
				}
			}
			if(exist==false){
				var externalLink = new ExternalLink(nodeIdDest,elementPath);
				webExplorer_nodeList[h].nodeExternalLink.push(externalLink);
				webExplorer_consoleAlertNewExternalLink(nodeId,nodeIdDest)
				//console.log("Lien sortant ajouté de "+nodeId+" vers "+nodeIdDest+" | element path : "+elementPath);
			}
			
		}
	}
}

//Indique que le lien sortant du noeud a été visité
function webExplorer_setExternalLinkVisited(nodeId,elementPath){
	for(var h=0;h<webExplorer_nodeList.length;h++){
		if(	webExplorer_nodeList[h].id == nodeId){
			for(var i=0;i<webExplorer_nodeList[h].nodeExternalLink.length;i++){
				if(webExplorer_nodeList[h].nodeExternalLink[i].elementPath==elementPath){
					webExplorer_nodeList[h].nodeExternalLink[i].visited=true;
					//console.log("Lien sortant '"+elementPath+"' pour le noeud "+nodeId+" visité");
				}
			}
		}
	}	
}

//Retourne vrai si le lien sortant du noeud passé en paramètre a été visité (et faux dans le cas échant)
function webExplorer_hasBeenVisitedExternalLink(nodeId,elementPath){
	for(var h=0;h<webExplorer_nodeList.length;h++){
		if(	webExplorer_nodeList[h].id == nodeId){
			for(var i=0;i<webExplorer_nodeList[h].nodeExternalLink.length;i++){
				if(webExplorer_nodeList[h].nodeExternalLink[i].elementPath==elementPath){
					if(webExplorer_nodeList[h].nodeExternalLink[i].visited==true){
						return true;
					}
					else{
						return false;
					}
				}
			}
		}
	}	
}


function webExplorer_consoleAlertNewNode(nodeId,nodeDocumentLocationHref,nodeType){
	var iconNodeType = "icon-certificate";
	if(nodeType=="javascript"){
		iconNodeType = "icon-repeat";
	}
	else if(nodeType == "ajax"){
		iconNodeType = "icon-cog";		
	}
	var consoleNodePopover = '<table class=\'table\'>';
	consoleNodePopover += '<tr>';
	consoleNodePopover += '<td>Type</td>';
	consoleNodePopover += '<td>'+nodeType+'</td>';
	consoleNodePopover += '</tr>';
	consoleNodePopover += '<tr>';
	consoleNodePopover += '<td>Document location href</td>';
	consoleNodePopover += '<td>'+nodeDocumentLocationHref+'</td>';
	consoleNodePopover += '</tr>';
	consoleNodePopover += '<tr>';
	consoleNodePopover += '<td>External links</td>';
	consoleNodePopover += '<td>';
	consoleNodePopover += '<ul></ul>';
	consoleNodePopover += '</td>';
	consoleNodePopover += '</tr>';
	consoleNodePopover += '</table>';
		
	var consoleNodeContent = '<div id="webExplorer_consoleNode'+nodeId+'" class="alert alert-success" style="margin-bottom:2px;">';
	consoleNodeContent += '<button type="button" class="close" data-dismiss="alert">×</button>';
	consoleNodeContent += '<a href="#" rel="popover" data-original-title="Node '+nodeId+' details :" data-content="'+consoleNodePopover+'">';
	consoleNodeContent += '<i class="'+iconNodeType+' icon-white"></i> <strong>Node '+nodeId+'</strong>';
	consoleNodeContent += '</a>';
	consoleNodeContent += '</div>';
	$('#web-explorer-console').append(consoleNodeContent);
	$('#webExplorer_consoleNode'+nodeId).popover();
}

function webExplorer_consoleAlertNewExternalLink(nodeId,nodeIdDest){
	$("#web-explorer-console").append('<div class="alert alert-info" style="margin-bottom:2px;"><button type="button" class="close" data-dismiss="alert">×</button><i class="icon-arrow-right icon-white"></i> <strong>External link </strong>from node '+nodeId+' to  node '+nodeIdDest+'</div>');
	webExplorer_consolePopoverUpdate(nodeId);
	$("[rel=popover]").popover();
}

function webExplorer_consolePopoverUpdate(nodeId){
	var consoleNodePopover;
	for(var i=0;i<webExplorer_nodeList.length;i++){
		if(webExplorer_nodeList[i].id==nodeId){			
			var nodeType = webExplorer_nodeList[i].nodeType;
			var nodeDocumentLocationHref = webExplorer_nodeList[i].nodeDocumentLocationHref;
			var consoleNodePopover = '<table class=\'table\'>';
			consoleNodePopover += '<tr>';
			consoleNodePopover += '<td>Type</td>';
			consoleNodePopover += '<td>'+nodeType+'</td>';
			consoleNodePopover += '</tr>';
			consoleNodePopover += '<tr>';
			consoleNodePopover += '<td>Document location href</td>';
			consoleNodePopover += '<td>'+nodeDocumentLocationHref+'</td>';
			consoleNodePopover += '</tr>';
			consoleNodePopover += '<tr>';
			consoleNodePopover += '<td>External links</td>';
			consoleNodePopover += '<td>';
			consoleNodePopover += '<ul>';
			for(var j=0;j<webExplorer_nodeList[i].nodeExternalLink.length;j++){
				consoleNodePopover += '<li>Node '+webExplorer_nodeList[i].nodeExternalLink[j].nodeIdDest+' : '+webExplorer_nodeList[i].nodeExternalLink[j].elementPath+'</li>';
			}
			consoleNodePopover += '</ul>';
			consoleNodePopover += '</td>';
			consoleNodePopover += '</tr>';
			consoleNodePopover += '</table>';
		}
		
	}
	
	$('#webExplorer_consoleNode'+nodeId+' > a').attr('data-content',consoleNodePopover);
}


function webExplorer_nodeToXml(){
	var nodeToXml = '<urlset>';
	for(var i=0;i<webExplorer_nodeList.length;i++){
		nodeToXml += '<url>';
		nodeToXml += '<nodeid>'+webExplorer_nodeList[i].id+'</nodeid>';
		nodeToXml += '<href><![CDATA['+webExplorer_nodeList[i].nodeDocumentLocationHref+']]></href>';
		nodeToXml += '<dom><![CDATA['+webExplorer_nodeList[i].nodeHtmlContent+']]></dom>';
		nodeToXml += '<links>';
		for(j=0;j<webExplorer_nodeList[i].nodeExternalLink.length;j++){
			nodeToXml += '<link>';
			nodeToXml += '<path>'+webExplorer_nodeList[i].nodeExternalLink[j].elementPath+'</path>';
			nodeToXml += '<nodeid>'+webExplorer_nodeList[i].nodeExternalLink[j].nodeIdDest+'</nodeid>';
			for(h=0;h<webExplorer_nodeList.length;h++){
				if(webExplorer_nodeList[h].id == webExplorer_nodeList[i].nodeExternalLink[j].nodeIdDest){
					nodeToXml += '<href><![CDATA['+webExplorer_nodeList[i].nodeDocumentLocationHref+']]></href>';
					nodeToXml += '<type><![CDATA['+webExplorer_nodeList[i].nodeType+']]></type>';
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

	











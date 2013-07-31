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

function MuCrawler() // {{{
{
  this.wsm = null;
  this.next_click = new WsmEdge();
  this.last_el_color = "";
  this.last_el = null;
  this.step_count = 0;
  this.pause_interval = 500;
  this.app_prefix = "";
  this.crawler_prefix = document.URL.substring(0, document.URL.lastIndexOf("/") + 1);
  
  this.load_url = function(url)
  {
    if (url[0] == "/" || url.substring(0, 5) == "http:")
    {
      // Absolute URL
      var without_c_p = url.substring(this.crawler_prefix.length);
      this.app_prefix = without_c_p.substring(0, without_c_p.lastIndexOf("/") + 1);
      ifr.src = url;
      $("#starturl").val(url);
    }
    else
    {
      // Relative URL
      var new_url = this.app_prefix + url
      this.app_prefix = new_url.substring(0, new_url.lastIndexOf("/") + 1);
      ifr.src = new_url;
      $("#starturl").val(this.crawler_prefix + new_url);
    }
  };
  
  this.dot_refresh = function()
  {
    $("#nodecontents").html(this.wsm.m_domTree.toString(true));
  };
  
  this.instantiate_wsm = function(wsmtype) // {{{
  {
    if (wsmtype === "vanilla")
      this.wsm = new VanillaWsm();
    else if (wsmtype === "nobacktrack")
      this.wsm = new NoBacktrackWsm();
    else if (wsmtype === "onepointoh")
      this.wsm = new WebOnePointOhWsm();
    else if (wsmtype === "backtrack")
      this.wsm = new BacktrackWsm();
    else if (wsmtype === "tansuo")
      this.wsm = new TansuoWsm(); 
    $("#elpath").html("Start exploration");
    $("#stats-panel").show();
    this.step_count = 0;
    this.refresh_stats();
    $("#no-stats-panel").hide();
  }; // }}}
  
  this.refresh_stats = function()
  {
    $("#wsm-size-nodes").html(this.wsm.countNodes());
    $("#wsm-size-bytes").html(this.wsm.getByteSize());
    $("#wsm-size-edges").html(this.wsm.countEdges());
    $("#stepid").html(this.step_count);
  };
  
  this.next_step = function() // {{{
  {
    // If no WSM is instantiated, create one based on user's choice
    if (this.wsm === null)
    {
      alert("No WSM instantiated. Instantiate a WSM first.");
      return;
    }
    //$("#navwindow").ready(iframeReady);
    var doc = ifr.contentDocument || ifr.contentWindow.document;
    // Attempt click at element in iframe
    if (this.next_click === null)
    {
      $("#elpath").html("I SAID we are done!");
      $("#dot-contents").val(this.wsm.toDot());
      return; // We are done
    }
    if (this.next_click.getContents() !== "")
    {
      var el = get_element_from_path(doc, new PathExpression(this.next_click.getContents()));
      if (el === undefined)
        console.error("Element should not be undefined");
      if (el.nodeName === "A" || el.nodeName === "a")
      {
        // Manually set the iframe source
        this.load_url($(el).attr('href'));
      }
      else
      {
        $(el).click(); // jQuery trickery to provoke click
      }
    }
    else
    {
      // We jump to the said URL
      var dest = this.next_click.getDestination();
      var node = this.wsm.getNodeFromId(dest);
      if (node !== null)
      {
        var dom = node.getContents();
        var url = dom.getAttribute("url");
        this.load_url(url);
      }
    }
    this.step_count++;
    // We manually call the callback after waiting
    setTimeout(iframeReady, this.pause_interval);
  } // }}}
  
  this.iframeReady = function(mc) // {{{
  {
    var doc = ifr.contentDocument || ifr.contentWindow.document;
    var dom = DomNode.parseFromDom(doc);
    // Add URL
    dom.setAttribute("url", ifr.src);
    this.wsm.setCurrentDom(dom, this.next_click.getContents());
    $("#nodeid").html(this.wsm.m_currentNodeId);
    this.next_click = this.wsm.getNextClick();
    if (this.next_click === null)
    {
      $("#elpath").html("We are done!");
    }
    else if (this.next_click.getContents() === "")
    {
      $("#elpath").html("Jump to state " + this.next_click.getDestination());
    }
    else
    {
      $("#elpath").html(this.next_click.getContents());
      // Highlight next click in iframe
      if (this.last_el !== null && this.last_el_color !== "")
      {
        this.last_el.style.border = this.last_el_color;
      }
      var el = get_element_from_path(doc, new PathExpression(this.next_click.getContents()));
      this.last_el = el;
      this.last_el_color = el.style.border;
      if (this.last_el_color === "")
          this.last_el_color = "none";
      el.style.border = 'dashed 1px red';
    }
    $("#nodecontents").html(this.wsm.m_domTree.toString(true));
    $("#wsm-size-nodes").html(this.wsm.countNodes());
    $("#wsm-size-bytes").html(this.wsm.getByteSize());
    $("#wsm-size-edges").html(this.wsm.countEdges());
    $("#stepid").html(this.step_count);
    if ($("#automode").prop("checked"))
      this.next_step();
  } // }}}

} // }}}

function iframeReady()
{
  mucrawler.iframeReady();
}

function define_oracles()
{
  eval($("#stop-oracle").val());
  eval($("#test-oracle").val());
}

function poll_interval_slide_change(event, ui)
{
  var out = "0.25 s";
  if (ui.value == 1)
  {
    out = "0.1 s";
    mucrawler.pause_interval = 100;
  }
  else if (ui.value == 2)
  {
    out = "0.25 s";
    mucrawler.pause_interval = 250;
  }
  else if (ui.value == 3)
  {
    out = "0.5 s";
    mucrawler.pause_interval = 500;
  }
  else if (ui.value == 4)
  {
    out = "1 s";
    mucrawler.pause_interval = 1000;
  }
  else if (ui.value == 5)
  {
    out = "2 s";
    mucrawler.pause_interval = 2000;
  }
  $("#poll-interval").html(out);
}

$(document).ready(function() {
    
    mucrawler = new MuCrawler();
    
    // Get global handle to iframe
    ifr = document.getElementById("navwindow");
    
    // Assign handler to button "load"
    $("#btn-load").click(function () {
        mucrawler.load_url($("#starturl").val());
    });
    $("#starturl").keyup(function (e) {
        if (e.keyCode == 13)
        {
          mucrawler.load_url($("#starturl").val());
        }
    });
    
    // Assign handler to button "move on"
    //$("#btn-moveon").click(next_step);
    $("#elpath").click(function () {
        mucrawler.next_step();
        return false;
    });
    
    // Assign handler to button "DOT refresh"
    $("#btn-dot-refresh").click(mucrawler.dot_refresh);
    
    // Assign handler to button "instantiate"
    $("#btn-instantiate-wsm").click(function () {
        mucrawler.instantiate_wsm($("#wsmtype").val());
    });
    
    // Assign handler to button "define oracles"
    $("#btn-define-oracles").click(function () {
        define_oracles();
    });
    
    $("#poll-interval-slider").slider({"min": 1, "max": 5, "value" : 3, "change": poll_interval_slide_change});
    
    define_oracles();
});

/* :folding=explicit:wrap=none: */

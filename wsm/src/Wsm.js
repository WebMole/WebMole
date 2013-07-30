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

/**
 * Representation of a vertex in a web state machine. A vertex stores the
 * following elements:
 * <ul>
 *   <li>An ID. This numerical value is nonsensical and is only used to
 *     refer uniquely to any vertex stored in the WSM.</li>
 *   <li>A DOM tree, representing the contents of some page in a browser.
 *     This tree is a nested hierarchy of {@link DomNode}s. Node that
 *     DOM nodes themselves can recall whether they have been clicked or
 *     not, through the {@link DomNode#setMark}/{@link DomNode#getMark}</li>
 *     methods.</li>
 * </ul>
 * @constructor
 * @this {WsmNode}
 */
function WsmNode(id) // {{{
{
  /**
   * Unique ID given to each node
   * @type {number}
   */
  this.m_id = id;
  
  /**
   * Node contents
   * @type {DomNode}
   */
  this.m_contents = 0;
  
  /**
   * Whether the node is completely visited
   * @type {boolean}
   */
  this.m_exhausted = false;
  
  /**
   * A path to the next element of the node that should be clicked.
   * Should be refactored to be a {@link PathExpression} instead of its
   * string rendition.
   * @type {string}
   */
  this.m_nextElementToClick = "";
  
  /**
   * List of animation steps concerned with that node
   * @type {array}
   */
  this.m_animationSteps = [];
  
  /**
   * Get the node's id
   * @return {number} The node's id
   */
  this.getId = function() // {{{
  {
    return this.m_id;
  }; // }}}
  
  /**
   * Returns whether the node is completely visited
   * @return {boolean} true or false, depending on whether the node still
   *   has elements that have not been clicked
   */
  this.isExhausted = function(is_acceptacle_click) // {{{
  {
    if (this.m_exhausted === true)
    {
      // Since a node that is exhausted remains so, return true right
      // away
      return true;
    }
    // Otherwise, check if the next click member field is empty
    if (this.m_nextElementToClick !== "")
    {
      // If not, then an element remains to be clicked
      return false;
    }
    // Otherwise, check if an element remains to be clicked
    this.computeNextElement(is_acceptacle_click);
    if (this.m_nextElementToClick !== "")
    {
      // This method produced a new next element to click,
      // so we are not exhausted
      return false;
    }
    return true; // If all else fails, we are exhausted
  }; // }}}
  
  /**
   * Sets the node's contents
   * @param {DomNode} contents The node's contents
   */
  this.setContents = function(contents) // {{{
  {
    this.m_contents = contents;
  }; // }}}

  /**
   * Returns the node's contents
   * @return {DomNode} The node's contents
   */
  this.getContents = function() // {{{
  {
    return this.m_contents;
  }; // }}}
  
  /**
   * Adds an animation step to the node. Each action performed in the
   * exploration is associated to an incrementing integer value. 
   * @param {number} The number of the animation step
   */
  this.addAnimationStep = function(step_no) // {{{
  {
    this.m_animationSteps.push(step_no);
  }; // }}}
  
  /**
   * Resets the click status of all element to "not clicked"
   */
  this.resetClicks = function() // {{{
  {
    this.m_exhausted = false;
    this.m_contents.setAllMarks(WsmNode.NOT_CLICKED);
    this.m_nextElementToClick = "";
  }; // }}}
  
  /**
   * 
   */
  this.getNextElement = function(is_acceptable_click) // {{{
  {
    // A next element to click has already been computed, but not
    // queried yet: return it and erase it from memory
    var out_edge = new WsmEdge(0);
    out_edge.setContents(this.m_nextElementToClick);
    this.m_nextElementToClick = "";
    return out_edge;
  }; // }}}
  
  /**
   * @param {function} is_acceptable_click The filtering function used to
   *   determine whether an element is candidate for the next click. If
   *   nothing is passed, the node will assume all elements can be clicked.
   */
  this.computeNextElement = function(is_acceptable_click) // {{{
  {
    // Otherwise, must compute new next element to click
    if (is_acceptable_click === undefined)
    {
      // No function passed: assume constant true
      is_acceptable_click = function(x, y) { return true; };
    }
    var path_to_next_elem = "dummy";
    var dom = this.m_contents;
    while (path_to_next_elem !== null && path_to_next_elem !== "")
    {
      path_to_next_elem = dom.prefixLookForMark(WsmNode.NOT_CLICKED);
      if (path_to_next_elem === null || path_to_next_elem === "")
      {
        // Node is exhausted
        this.m_exhausted = true;
        return;
      }
      // Mark that element with "clicked" (so we won't select it again)
      var element = dom.getElementFromPathString(path_to_next_elem);
      if (element === null)
      {
        // This should not happen: we got a path from the document itself
        console.error("No element at the end of path"); // Pretty cryptic
        return;
      }
      element.setMark(WsmNode.CLICKED);
      // If element does not pass the filter, do not return it and move on
      // to the next element
      if (is_acceptable_click(path_to_next_elem, dom))
      {
        // Update last click
        this.m_nextElementToClick = path_to_next_elem;
        return;
      }
    }
    // If we made it here, no next click: node is exhausted
    this.m_exhausted = true;
    return;
  }; // }}}
  
  /**
   * Computes the global size of the node, expressed as an
   * estimate in bytes.
   * @return {number} The estimated global byte size
   */
  this.getByteSize = function() // {{{
  {
    // We count four bytes for the ID, plus the size of the DOM
    return 4 + this.m_contents.getByteSize();
  }; // }}}
  
  /**
   * Computes the size of the DOM tree, expressed in the number of nodes
   * @return {number} The size of the DOM tree
   */
  this.countNodes = function() // {{{
  {
    return this.m_contents.countNodes();
  }; // }}}
  
  /**
   * Outputs the contents of the node as a string in the DOT language
   * @return {string} The output string in DOT
   */
  this.toDot = function() // {{{
  {
    var out = "";
    out += this.m_id + " [shape=circle,label=\"" + this.m_id + "\"]; ## ";
    for (var i = 0; i < this.m_animationSteps.length; i++)
    {
      if (i > 0)
      {
        out += ",";
      }
      out += this.m_animationSteps[i];
    }
    return out;
  }; // }}}
}

/**
 * Constants used to mark nodes; this one indicates that the node has not
 * been clicked
 * @constant
 * @type {number}
 */
WsmNode.NOT_CLICKED = 0;

/**
 * Constants used to mark nodes; this one indicates that the node has
 * been clicked
 * @constant
 * @type {number}
 */
WsmNode.CLICKED = 1;

// }}}

/**
 * Representation of an edge in a web state machine. An edge stores two
 * elements of information:
 * <ul>
 *  <li>The (x)path in the page leading to the element that was clicked;
 *    this is called the edge's <em>contents</em>. Currently, this
 *    contents is represented as a string version of a {@link
 *    PathExpression} (should be refactored to be a PathExpression
 *    itself)</li>
 *  <li>The node ID of the page one reaches after clicking that element;
 *    this is called the edge's <em>destination</em>. As node IDs in a WSM
 *    are integers, this destination is an integer too.</li>
 * </ul>
 * @constructor
 * @this {WsmEdge}
 */
function WsmEdge(id) // {{{
{
  /**
   * Unique ID given to each edge
   * @type {number}
   */
  this.m_id = id;
  
  /**
   * Edge contents
   * @type {string}
   */
  this.m_contents = "";
  
  /**
   * Edge destination. This should contain the ID of a WsmNode
   * @type {number}
   */
  this.m_destination = 0;
  
  /**
   * List of animation steps concerned with that edge
   * @type {array}
   */
  this.m_animationSteps = [];
  
  /**
   * Get the edge's id
   * @return {number} The edge's id
   */
  this.getId = function() // {{{
  {
    return this.m_id;
  }; // }}}
  
  /**
   * Sets the edge's contents
   * @param {string} contents The edge's contents
   */
  this.setContents = function(contents) // {{{
  {
    this.m_contents = contents;
  }; // }}}

  /**
   * Returns the edge's contents
   * @return {string} The edge's contents
   */
  this.getContents = function() // {{{
  {
    return this.m_contents;
  }; // }}}
  
  /**
   * Sets the edge's destination
   * @param {number} destination The edge's destination
   */
  this.setDestination = function(destination) // {{{
  {
    this.m_destination = destination;
  }; // }}}

  /**
   * Returns the edge's destination
   * @return {number} The edge's destination
   */
  this.getDestination = function() // {{{
  {
    return this.m_destination;
  }; // }}}

  /**
   * Adds an animation step to the edge. Each action performed in the
   * exploration is associated to an incrementing integer value. 
   * @param {number} The number of the animation step
   */
  this.addAnimationStep = function(step_no) // {{{
  {
    this.m_animationSteps.push(step_no);
  }; // }}}
  
  /**
   * Outputs the contents of the node as a string in the DOT language
   * @param {number} source_id The ID of the source node for that transition
   * @return {string} The output string in DOT
   */
  this.toDot = function(source_id) // {{{
  {
    var out = "";
    out += source_id + " -> " + this.m_destination + " [label=\"" + this.m_contents + "\"]; ## ";
    for (var i = 0; i < this.m_animationSteps.length; i++)
    {
      if (i > 0)
      {
        out += ",";
      }
      out += this.m_animationSteps[i];
    }
    return out;
  }; // }}}
  
  /**
   * Computes the global size of the EDGE, expressed as an
   * estimate in bytes.
   * @return {number} The estimated global byte size
   */
  this.getByteSize = function() // {{{
  {
    // We count four bytes for the ID, plus the size of the path
    return 4 + this.m_contents.length;
  }; // }}}
 
} // }}}

/**
 * Representation of a sequence of clicks on elements. A path sequence is
 * merely an ordered list of whatever objects one may wish to put (the
 * implemented methods are blind about they type of objects they
 * manipulate).
 * @constructor
 * @this {PathSequence}
 */
function PathSequence(ps) // {{{
{
  /**
   * The array containing the elements
   * @type {array}
   */
  this.m_elements = [];
  
  /**
   * Appends an element to the current path sequence
   * @param path_element The element to append
   */
  this.append = function(path_element) // {{{
  {
    this.m_elements.push(path_element);
  }; // }}}
  
  /**
   * Returns the <i>i</i>-th element of the path sequence
   * @param {number} The position of the element to look for
   * @return The first element
   */
  this.getElement = function(i) // {{{
  {
    if (i >= this.m_elements.length || i < 0)
    {
      console.error("Calling getElement outside of valid range");
      return;
    }
    return this.m_elements[i];
  }; // }}}
  
  /**
   * Returns the first element of the path sequence and removes it
   * from the sequence
   * @return The first element
   */
  this.popFirstElement = function() // {{{
  {
    if (this.m_elements.length === 0)
    {
      console.error("Calling popFirstElement on an empty sequence");
      return;
    }
    return this.m_elements.shift();
  }; // }}}
  
  /**
   * Returns the last element of the path sequence and removes it
   * from the sequence
   * @return The last element
   */
  this.popLastElement = function() // {{{
  {
    if (this.m_elements.length === 0)
    {
      console.error("Calling popLastElement on an empty sequence");
      return;
    }
    return this.m_elements.pop();
  }; // }}}
  
  /**
   * Returns the last element of the path sequence
   * @return The last element
   */
  this.peekLastElement = function() // {{{
  {
    if (this.m_elements.length === 0)
    {
      console.error("Calling peekLastElement on an empty sequence");
      return;
    }
    return this.m_elements[this.m_elements.length - 1];
  }; // }}}
  
  /**
   * Determines whether the path sequence is empty
   * @return true if empty, false otherwise
   */
  this.isEmpty = function() // {{{
  {
    return this.m_elements.length === 0;
  }; // }}}
  
  /**
   * Computes the length of the path
   * @return {number} The length of the path
   */
  this.getLength = function() // {{{
  {
    return this.m_elements.length;
  }; // }}}
  
  /**
   * Clears the path sequence
   */
  this.clear = function() // {{{
  {
    this.m_elements = [];
  }; // }}}
  
  /**
   * Outputs a path sequence as a string
   * @return The path sequence represented as a string
   */
  this.toString = function() // {{{
  {
    var out = "";
    for (var i = 0; i < this.m_elements.length; i++)
    {
      if (i > 0)
      {
        out += ",";
      }
      var path_element = this.m_elements[i];
      out += path_element.toString();
    }
    return out;
  }; // }}}
  
  // If a path sequence is passed to the constructor, use it to instantiate
  // a clone of the argument
  if (ps !== undefined && ps instanceof PathSequence)
  {
    for (var i = 0; i < ps.m_elements.length; i++)
    {
      var path_element = ps.m_elements[i];
      this.m_elements.push(path_element);
    }
  }
} // }}}

/**
 * A web state machine (WSM) is a directed graph whose nodes are "pages" and
 * whose labelled edges indicate elements of pages whose click induces a
 * transition to a new page. In addition, the WSM also handles the process
 * of determining where a given page lies in the graph, appropriately record 
 * the transitions between them, and suggest what the next click should be.
 * <p>
 * The way in which this is accomplished, as well as the precise definition
 * of page and edge is left to the particular
 * sub-instance of WSM that performs the exploration. Indeed, this class is
 * intended to be "abstract", as a number of methods are left undefined:
 * <ul>
 *   <li>{@link isAcceptableClick}</li>
 *   <li>{@link nodesEqual}</li>
 *   <li>{@link processReset}</li>
 *   <li>{@link abstractNode}</li>
 * </ul>
 * Therefore, one is expected to construct <em>extensions</em> of this class
 * that implement those methods in various ways, effectively creating
 * different types of crawlers. {@link VanillaWsm} is a dummy example of
 * such an extension that can be used as scaffolding for custom WSMs.
 * @constructor
 * @this {WebStateMachine}
 */
function WebStateMachine() // {{{
{
  /**
   * Array containing the WSM's nodes
   * @type {array}
   */
  this.m_nodes = [];
  
  /**
   * Array containing the WSM's edges
   * @type {array}
   */
  this.m_edges = [];
  
  /**
   * The current DOM tree being explored
   * @type {DomNode}
   */
  this.m_domTree = new DomNode();
  
  /**
   * The auto-incrementing value of the animation steps
   * @type {number}
   */
  this.m_animationStepCounter = 0;
  
  /**
   * The numerical ID of the current WSM vertex being explored
   * @type {number}
   */
  this.m_currentNodeId = 0;
  
  /**
   * The expected ID of the next node to be sent to setCurrentDom.
   * This is used when the WSM follows a predefined path, to make sure that
   * the nodes visited are indeed those that were computed when building
   * the path. This value should be null when no particular ID is
   * expected.
   * @type {number}
   */
  this.m_expectedNextNodeId = null;
  
  /**
   * A counter, used to give each node a different ID
   * @type {number}
   */
  this.m_idNodeCounter = 0;
  
  /**
   * A counter, used to give each edge a different ID
   * @type {number}
   */
  this.m_idEdgeCounter = 0;
  
  /**
   * A path sequence through exhausted nodes that the state machine is
   * forced to follow to get to a non-exhausted node
   * @type {PathSequence}
   */
  this.m_pathToFollow = new PathSequence();
  
  /**
   * The complete history of navigation since the beginning of the
   * exploration.
   * @type {PathSequence}
   */
  this.m_pathSinceBeginning = new PathSequence();
  
  /**
   * Whether to evaluate the stop oracle on each node
   * @type {boolean}
   */
  this.m_evaluateStopOracle = true;
  
  /**
   * Whether to evaluate the test oracle on each node
   * @type {boolean}
   */
  this.m_evaluateTestOracle = true;
  
  /**
   * Whether the stop oracle decided we should treat the present page
   * as a dead-end
   * @type {boolean}
   */
  this.m_oracleMustStop = false;
  
  /**
   * Determines if two DOM nodes should be considered equal for the
   * purposes of the exploration. This method is used for two purposes:
   * <ol>
   * <li>To check if the exploration returned to a page that was already
   *   visited</li>
   * <li>To decide whether a new node should be created in the WSM</li>
   * </ol>
   * <p>
   * This function must be implemented by subclasses of WebStateMachine.
   * @param {DomNode} n1 The first node
   * @param {DomNode} n2 The second node
   * @return {boolean} <tt>true</tt> if the two nodes should be considered
   *   equal, <tt>false</tt> otherwise
   */
  this.nodesEqual = function() // {{{
  {
    console.error("nodesEqual must be overridden by WSM subclasses");
  }; // }}}
  
  /**
   * The <em>function</em> that is used to decide whether the path
   * to an element is an acceptable candidate for a click. Passing
   * different functions will preform various forms of filtering on which
   * elements to click in pages.
   * <p>
   * This function must be implemented by subclasses of WebStateMachine.
   * @param {PathExpression} path A path to the element in the DOM tree that
   *    would be clicked
   * @param {DomNode} The DOM tree of the current page
   */
   this.isAcceptableClick = function(path, dom_node) // {{{
   {
     console.error("isAcceptableClick must be overridden by WSM subclasses");
   }; // }}}
  
  /**
   * Handles the situation where the WSM has reached a dead end and is
   * sent back to its initial state; generally, this involves computing
   * a path in the application (i.e. a sequence of clicks on elements of
   * various pages) that the WSM should follow before resuming its normal
   * exploration. This path is stored in the {@link
   * WebStateMachine}'s <code>m_pathToFollow</code> member field, which,
   * when not empty, forces the WSM's {@link WebStateMachine.getNextClick}
   * method to follow what is dictated by that path.
   * <p>
   * This function must be implemented by subclasses of WebStateMachine.
   * @param {number} node_id The ID of the node in the WSM wher the
   *   exploration resumes at
   * @return {boolean} <tt>true</tt> if the exploration must continue,
   *   <tt>false</tt> if there is no unvisited page
   */
   this.processReset = function(node_id) // {{{
   {
     console.error("processReset must be overridden by WSM subclasses");
   }; // }}}
   
  /**
   * Processes a DOM node before saving it to the WSM. This is used to
   * implement <em>abstraction</em>, where not the whole contents of a DOM
   * tree are handled by a WSM.
   * <p>
   * This function must be implemented by subclasses of WebStateMachine.
   * @param {DomNode} The original DOM tree
   * @return {DomNode} The processed DOM tree
   */
   this.abstractNode = function(dom) // {{{
   {
     console.error("abstractNode must be overridden by WSM subclasses");
   }; // }}}
   
  /**
   * Computes the global size of the WSM, expressed as an estimate in bytes.
   * This is done by summing the estimated byte size of each WSM node and
   * of each transition.
   * @return {number} The estimated global byte size of the WSM
   */
  this.getByteSize = function() // {{{
  {
    var byte_size = 0, i = 0;
    for (i = 0; i < this.m_nodes.length; i++)
    {
      var node = this.m_nodes[i];
      byte_size += node.getByteSize();
    }
    for (i = 0; i < this.m_edges.length; i++)
    {
      var edge_list = this.m_edges[i];
      if (edge_list === undefined)
      {
        continue;
      }
      for (var j = 0; j < edge_list.length; j++)
      {
        var edge = edge_list[j];
        byte_size += edge.getByteSize();
      }
    }
    return byte_size;
  }; // }}}
  
  /**
   * Computes the number of nodes currently stored in the WSM
   * @return {number} The number of nodes in the WSM
   */
  this.countNodes = function() // {{{
  {
    return this.m_nodes.length;
  }; // }}}
  
  /**
   * Computes the number of edges (i.e. transitions) currently stored
   * in the WSM
   * @return {number} The number of edges in the WSM
   */
  this.countEdges = function() // {{{
  {
    return this.m_edges.length;
  }; // }}}
  
  /**
   * Resets the click status on all elements of the current DOM node
   * (marks them as unclicked). This should not have to be called, except
   * for debugging.
   */
  this.resetClicks = function() // {{{
  {
    var node = this.getNodeFromId(this.m_currentNodeId);
    node.resetClicks();
  }; // }}}
  
  /**
   * Tells the WSM what the state of the current page is
   * @param {DomNode} d The DOM tree of the current page
   * @param {string} click_path A string indicating the path in the DOM tree
   *   of the <em>previous</em> document that was clicked (thus leading to
   *   the current DOM tree). This argument is optional. When not specified
   *   (or empty), indicates one has "jumped" to the present page, or that
   *   the current page is the start state of the WSM.
   */
  this.setCurrentDom = function(d, click_path) // {{{
  {
    var dom = null, node = null, tree_id = null;
    if (d instanceof Document)
    {
      dom = DomNode.parseFromDom(d);
    }
    else if (d instanceof DomNode)
    {
      dom = d;
    }
    else
    {
      console.error("Argument of setCurrentDom is neither a document nor a DomNode");
      return;
    }
    // Send DOM to stop and test oracles
    if (this.m_evaluateStopOracle && WebStateMachine.stop_oracle !== undefined)
    {
      this.m_oracleMustStop = WebStateMachine.stop_oracle(dom);
    }
    if (this.m_evaluateTestOracle && WebStateMachine.test_oracle !== undefined)
    {
      var test_result = WebStateMachine.test_oracle(dom);
      // At the moment, merely report the failure on the console
      if (!test_result)
      {
        console.log("Test oracle returned false!");
      }
    }
    // Process the DOM contents with the abstraction method
    dom = this.abstractNode(dom);
    if (this.m_nodes.length === 0)
    {
      // This is the first node we register; simply add it and do no
      // further processing
      this.m_idNodeCounter++;
      node = new WsmNode(this.m_idNodeCounter);
      node.setContents(dom);
      node.addAnimationStep(this.m_animationStepCounter++);
      this.m_nodes.push(node);
      this.m_currentNodeId = this.m_idNodeCounter;
      this.m_domTree = dom;
      var new_pe = new WsmEdge();
      new_pe.setDestination(this.m_idNodeCounter);
      this.m_pathSinceBeginning.append(new_pe);
      return;
    }
    if (this.m_expectedNextNodeId !== null)
    {
      var nfd = this.getNodeFromDom(dom);
      if (nfd === null)
      {
        // Not much to do apart from warning of the discrepancy
        console.error("Sanity check fail: according to computed path, expected node ID was " + this.m_expectedNextNodeId + "; we are rather in a NEW node");
        return;
      }
      var obtained_id = nfd.getId();
      // Sanity check: make sure that the node we are supposed to land
      // is indeed the one we are in
      if (this.m_expectedNextNodeId != obtained_id)
      {
        // Not much to do apart from warning of the discrepancy
        console.error("Sanity check fail: according to computed path, expected node ID was " + this.m_expectedNextNodeId + "; we are rather in node " + obtained_id);
        return;
      }
    }
    if (this.nodesEqual(this.m_domTree, dom))
    {
      // The page has not changed at all after last click.
      // Nothing to do! (Except add animation step to current node)
      var a_node = this.getNodeFromId(this.m_currentNodeId);
      return;
    }
    // We have a different tree; check if it is already present in the graph
    node = this.getNodeFromDom(dom);
    if (node === null)
    {
      // Tree was not present in the graph; create new node
      node = new WsmNode(++this.m_idNodeCounter);
      node.setContents(dom);
      this.m_nodes.push(node);
    }
    tree_id = node.getId();
    if (click_path !== undefined && click_path !== "" && click_path !== null)
    {
      // Register a transition from the current tree to the new one, only
      // if it is not empty
      var trans = new WsmEdge(++this.m_idEdgeCounter);
      trans.setContents(click_path);
      trans.setDestination(tree_id);
      trans.addAnimationStep(this.m_animationStepCounter++);
      if (this.m_edges[this.m_currentNodeId] === undefined)
      {
        // Create an array if the slot for source node does not yet exist
        this.m_edges[this.m_currentNodeId] = [];
      }
      this.m_edges[this.m_currentNodeId].push(trans);
      this.m_pathSinceBeginning.append(trans);
    }
    // Update ID of current node
    this.m_domTree = node.getContents();
    this.m_currentNodeId = tree_id;
    node.addAnimationStep(this.m_animationStepCounter++);
  }; // }}}
  
  /**
   * Looks for a node in the graph based on its DOM contents
   * @param {DomNode} dom_node The DomNode to look for
   * @return {WsmNode} The graph's node whose DOM contents is equal to the
   *   node passed as an argument, null otherwise
   */
  this.getNodeFromDom = function(dom_node) // {{{
  {
    for (var i = 0; i < this.m_nodes.length; i++)
    {
      var node = this.m_nodes[i];
      var node_dom = node.getContents();
      if (this.nodesEqual(dom_node, node_dom))
      {
        return node;
      }
    }
    return null;
  }; // }}}
  
  /**
   * Looks for a node in the graph based on its ID
   * @param {number} id The ID to look for
   * @return {WsmNode} The graph's node with given ID if present, null
   *    otherwise
   */
  this.getNodeFromId = function(id) // {{{
  {
    for (var i = 0; i < this.m_nodes.length; i++)
    {
      var node = this.m_nodes[i];
      if (node.getId() == id)
      {
        return node;
      }
    }
    return null;
  }; // }}}
  
  /**
   * Returns the next element to be clicked in the current DOM, according
   * to the WSM's exploration algorithm. The method returns a
   * {@link WsmEdge}, whose contents must be interpreted as follows:
   * <ul>
   *   <li>When the edge's contents are not empty, they indicate the path
   *     to the element that must be clicked in the current page. In that
   *     scenario, the edge's target member field contains a dummy value
   *     that must be ignored.</li>
   *   <li>When the edge's contents are empty, this indicates that one is to
   *     <em>jump</em> to the next page (i.e. not access it through a click
   *     from the current page). In such a case, the page to jump to is
   *     specified in the edge's target, which yields the node ID of that
   *     page. Additional contents from the page (its contents, URL, etc.)
   *     can then be obtained by retrieving the {@link WsmNode} using
   *     {@link getNodeFromId}. In general, a jump is a reset of the
   *     explored application's state, or the direct invoking of a page
   *     using its URL.
   * </ul>
   * @return {WsmEdge} The edge indicating the next step in the exploration,
   *   null if the exploration is completed
   */
  this.getNextClick = function() // {{{
  {
    if (!this.m_pathToFollow.isEmpty())
    {
      // If we are on a forced path, simply follow it by returning
      // the next element dictated by the path
      var path_element = this.m_pathToFollow.popFirstElement();
      this.m_expectedNextNodeId = path_element.getDestination();
      return path_element;
    }
    // Otherwise, we don't expect any particular ID
    this.m_expectedNextNodeId = null;
    var out = "";
    var cur_node = this.getNodeFromId(this.m_currentNodeId);
    if (cur_node === undefined || cur_node === null)
    {
      console.error("Current node is undefined");
      return null;
    }
    // Otherwise, look for next element we haven't marked as clicked
    var dom = cur_node.getContents();
    if (cur_node.isExhausted(this.isAcceptableClick) || this.m_oracleMustStop)
    {
      this.m_oracleMustStop = false;
      // Nothing else to visit in the current node. Compute path to follow
      if (!this.processReset())
      {
        return null;
      }
      // Then return first bit of that path
      var first_bit = this.m_pathToFollow.popFirstElement();
      this.m_expectedNextNodeId = first_bit.getDestination();
      if (this.m_expectedNextNodeId == this.m_currentNodeId)
      {
        // If we must jump to where we already are, indicates we finished
        // the exploration (stop oracles can cause this)
        return null;
      }
      return first_bit;
    }
    // Otherwise, ask node what is the next element to click; we pass to it
    // the filtering function to use
    var path_to_next_elem = cur_node.getNextElement(this.isAcceptableClick);
    return path_to_next_elem;
  }; // }}}
  
  /**
   * Outputs the contents of the WSM as a string in the DOT language
   * @return {string} The output string in DOT
   */
  this.toDot = function() // {{{
  {
    var i = 0;
    var out = "";
    out += "digraph G {\n";
    for (i = 0; i < this.m_nodes.length; i++)
    {
      var node = this.m_nodes[i];
      var node_id = node.getId();
      out += "  " + node.toDot() + "\n";
      var transitions = this.m_edges[node_id];
      if (transitions === undefined)
      {
        continue;
      }
      for (var j = 0; j < transitions.length; j++)
      {
        var edge = transitions[j];
        var dest_id = edge.getDestination();
        var edge_label = edge.getContents();
        out += "  " + edge.toDot(node_id) + "\n";
      }
    }
    // By convention, node 0 never exists and node 1 is the initial state
    out += "  0 [shape=none,label=\"\"]; ## 0\n";
    out += "  0 -> 1; ## 0\n";
    out += "}";
    return out;
  }; // }}}
  
} // }}}

/* :folding=explicit:wrap=none: */

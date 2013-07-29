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
 * Dummy instantiation of a {@link WebStateMachine}, where each
 * implemented method is kept as simple as possible. This represents
 * the most generic form of a WSM. Developers are encouraged to use this
 * class as a template to create their own WSMs.
 * @constructor
 * @this {VanillaWsm}
 */
function VanillaWsm() // extends WebStateMachine {{{
{
  // Used to extend the prototype of WSM
  this.WebStateMachine = WebStateMachine;
  this.WebStateMachine();
  
  /**
   * Filters elements to click in a page.
   * @param {string} path A path string
   * @param {DomNode} dom_node Node corresponding to the contents of the
   *   current page
   * @return {boolean} <tt>true</tt> when the element at the end of that
   *   path can be clicked, <tt>false</tt> otherwise
   */
  this.isAcceptableClick = function(path, dom_node) // {{{
  {
    // We only click on elements inside <body>, and not <script> elements
    if (!path.contains("BODY") && !path.contains("body"))
    {
      return false;
    }
    if (path.contains("SCRIPT"))
    {
      return false;
    }
    return true;
  }; // }}}
  
  /**
   * Determines if two DOM nodes should be considered equal for the
   * purposes of the exploration. This method is used for two purposes:
   * <ol>
   * <li>To check if the exploration returned to a page that was already
   *   visited</li>
   * <li>To decide whether a new node should be created in the WSM</li>
   * </ol>
   * @param {DomNode} n1 The first node
   * @param {DomNode} n2 The second node
   * @return {boolean} <tt>true</tt> if the two nodes should be considered
   *   equal, <tt>false</tt> otherwise
   */
  this.nodesEqual = function(n1, n2) // {{{
  {
    if (n1 === undefined || n1 === null || n2 === undefined || n2 === null)
    {
      return false;
    }
    return n1.equals(n2);
  }; // }}}
  
  /**
   * Handles the situation where the WSM has reached a dead end and is
   * sent back to its initial state. See {@link WebStateMachine#processReset}
   * for detailed info.
   * <p>
   * In the case of the VanillaWsm, we simply jump to the first page we find
   * that still has unvisited links.
   * @return {boolean} <tt>true</tt> if the exploration must continue,
   *   <tt>false</tt> if there is no unvisited page
   */
  this.processReset = function() // {{{
  {
    for (var i = 0; i < this.m_nodes.length; i++)
    {
      var node = this.m_nodes[i];
      if (!node.isExhausted())
      {
        var edge = new WsmEdge(0); // Dummy ID, don't care
        edge.setDestination(node.getId());
        edge.setContents(""); // Empty click path, indicating we jump to that page
        var ps = new PathSequence();
        ps.append(edge);
        this.m_pathToFollow = ps;
        return true;
      }
    }
    // If we are here, we are done
    return false;
  }; // }}}
  
  /**
   * Processes the DOM tree before saving it to the WSM. See
   * {@link WebStateMachine#abstractNode} for detailed info.
   * <p>
   * In the case of VanillaWsm, no abstraction whatsoever is performed
   * on the tree; it is returned as is.
   * @param {DomNode} The original DOM tree
   * @return {DomNode} The processed DOM tree
   */
  this.abstractNode = function(dom) // {{{
  {
    return dom;
  }; // }}}
  
} // }}}

/* :folding=explicit:wrap=none: */

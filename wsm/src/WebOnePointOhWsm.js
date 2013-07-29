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
 * Implementation of a "Web 1.0" crawler. This means that:
 * <ul>
 *  <li>Pages are only compared with their URLs</li>
 *  <li>Only &lt;a&gt; links are considered as transitions</li>
 *  <li>We don't care where we reset when reaching a dead-end (since
 *    Web 1.0 crawlers disregard links between pages anyway)</li>
 * </ul>
 * @constructor
 * @this {WebOnePointOhWsm}
 */
function WebOnePointOhWsm() // extends VanillaWsm {{{
{
  // Used to extend the prototype of VanillaWsm
  this.VanillaWsm = VanillaWsm;
  this.VanillaWsm();
  
  /**
   * Filters elements to click in a page. See
   * {@link WebStateMachine#isAcceptableClick} for details.
   */
  this.isAcceptableClick = function(path, dom_node) // {{{
  {
    // We only say yes if the element is an anchor ("a")
    var pe = new PathExpression(path);
    var ps = pe.getLastSegment();
    return ps.getName().toLowerCase() === "a";
  }; // }}}
  
  /**
   * Determines if two DOM nodes should be considered equal for the
   * purposes of the exploration. See {@link WebStateMachine.nodesEqual}
   * for details.
   */
  this.nodesEqual = function(n1, n2) // {{{
  {
    return n1.getAttribute("url") == n2.getAttribute("url");
  }; // }}}
  
  /**
   * Processes the DOM tree before saving it to the WSM. See
   * {@link WebStateMachine#abstractNode} for detailed info.
   * <p>
   * In the case of WebPointOhWsm, we only keep:
   * <ol>
   *   <li>The top-level node (&lt;#document&gt;), because it has an
   *     attribute containing the page's URL</li>
   *   <li>The path leading to any anchor elements (&lt;a&gt;), to know
   *     what to click</li>
   * </ol>
   * @param {DomNode} The original DOM tree
   * @return {DomNode} The processed DOM tree
   */
  this.abstractNode = function(dom) // {{{
  {
    this.purgeChildren(dom);
    return dom;
  }; // }}}
  
  /**
   * Removes from the tree all elements that do not lead to an anchor.
   * @param {DomNode} dom The parent DOM node
   * @return {DomNode} The "purged" DOM tree, null if nothing remains from
   *   that operation
   */
  this.purgeChildren = function(dom) // {{{
  {
    var out_children = [];
    for (var i = 0; i < dom.m_children.length; i++)
    {
      var child = dom.m_children[i];
      var from_purge = this.purgeChildren(child);
      if (from_purge !== null)
      {
        out_children.push(child);
      }
    }
    dom.m_children = out_children;
    if (dom.m_children.length > 0 || dom.m_name == "A" || dom.m_name == "a")
    {
      return dom;
    }
    return null;
  }; // }}}
  
} // }}}

/* :folding=explicit:wrap=none: */

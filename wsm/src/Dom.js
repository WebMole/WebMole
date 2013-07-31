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
 * Basic building block of a path expression. A path segment consists of a
 * single element name, followed by an index indicating its relative
 * positioning with respect to sibilings <em>of the same name</em>. That is,
 * the expression <code>E[i]</code> does not denote the <i>i</i>-th sibling,
 * but rather the <i>i</i>-th sibling <em>of name <code>E</code></em>.
 * @constructor
 * @this {PathSegment}
 */
function PathSegment() // {{{
{
  this.m_name = "";
  this.m_position = 0;
  
  this.getName = function() // {{{
  {
    return this.m_name;
  }; // }}}
  
  this.getPosition = function() // {{{
  {
    return this.m_position;
  }; // }}}
  
  this.toString = function() // {{{
  {
    return this.m_name + "[" + this.m_position + "]";
  }; // }}}
  
  this.parseFromString = function(s) // {{{
  {
    var bits = s.split("[");
    if (bits.length == 1)
    {
      this.m_name = s;
    }
    else
    {
      this.m_name = bits[0];
      this.m_position = parseInt(bits[1].substring(0, bits[1].length - 1));
    }
  }; // }}}
} // }}}

/**
 * Representation of a path inside a DOM document. This path is a sequence
 * of {@link PathSegment}s. A path expression can be represented by a string
 * like this:
 * <pre>
 * HTML[0]/BODY[0]/P[1]/I[0]
 * </pre>
 * denoting the first <code>I</code> element inside the second
 * <code>P</code> of the page's (only) <code>BODY</code> element within its
 * (only) <code>HTML</code> element.
 * @constructor
 * @this {PathExpression}
 * @param {string} contents If specified, instantiates a path expression by
 *   parsing the contents of the string passed as an argument
 */
function PathExpression(contents) // {{{
{
  /**
   * The list of path segments contained in the expression
   */
  this.m_pieces = [];
  
  /**
   * Returns the length of the path expression (i.e. its number of
   * path segments)
   * @return {number} The length of the path expression
   */
  this.getLength = function() // {{{
  {
    return this.m_pieces.length;
  }; // }}}
  
  /**
   * Outputs a string representation of the path expression. This
   * representation is a slash-separated list of path segments.
   * @return {string} The path expression as a string
   */
  this.toString = function() // {{{
  {
    var out = "";
    for (var i = 0; i < this.m_pieces.length; i++)
    {
      var piece = this.m_pieces[i];
      out += "/" + piece.toString();
    }
    return out;
  }; // }}}
  
  /**
   * Parses a path expression from a string.
   * @param {string} s The string to parse
   */
  this.parseFromString = function(s) // {{{
  {
    var pieces = s.split("/");
    for (var i = 0; i < pieces.length; i++)
    {
      var piece = pieces[i];
      var segment = new PathSegment();
      segment.parseFromString(piece);
      this.m_pieces.push(segment);
    }
  }; // }}}
  
  /**
   * Returns a particular path segment of the expression.
   * @param {number} pos The position of the path segment to obtain
   * @return {PathSegment} The path segment to look for, null if position
   *   is out of bounds
   */
  this.getSegment = function(pos) // {{{
  {
    if (pos < 0 || pos >= this.m_pieces.length)
    {
      console.error("Index out of bounds in PathExpression.getSegment");
      return null;
    }
    return this.m_pieces[pos];
  }; // }}}

  /**
   * Returns the last path segment of the expression.
   * @return {PathSegment} The last path segment, null if path is empty
   */
  this.getLastSegment = function() // {{{
  {
    if (this.m_pieces.length >= 1)
    {
      return this.getSegment(this.m_pieces.length - 1);
    }
    return null;
  }; // }}}
  
  /**
   * Determines if the path contains a segment of given name.
   * @param {string} The name to look for
   * @return {boolean} true or false depending on whether the path contains
   *   the name
   */
  this.contains = function(s) // {{{
  {
    for (var i = 0; i < this.m_pieces.length; i++)
    {
      var piece = this.m_pieces[i];
      if (piece.getName() === s)
      {
        return true;
      }
    }
    return false;
  }; // }}}
  
  // If something was passed to the constructor, use it to instantiate the
  // DOM node
  if (contents !== undefined)
  {
    this.parseFromString(contents);
  }

} // }}}

/**
 * Attribute-value pair that can be contained in a DOM node.
 * This object is intended to store DOM element attributes and their
 * respective values.
 * @constructor
 * @this {DomNodeAttribute}
 * @param {string} name The attribute's name
 * @param {string} value The attribute's value
 */
function DomNodeAttribute(name, value) // {{{
{
  this.m_name = name;
  this.m_value = value;
} // }}}

/**
 * Basic building block for a nested structure of HTML-like elements.
 * @constructor
 * @this {DomNode}
 * @param {Document} contents If specified, instantiates a DOM node by
 *   traversing the current Document object (e.g.
 *   <code>window.document</code> and cloning its contents
 */
function DomNode(contents) // {{{
{
  
  this.m_isLeaf = false;
  
  this.m_name = "";
  
  this.m_attributes = [];
  
  this.m_handlers = [];
  
  this.m_children = [];
  
  /**
   * Arbitrary data field that can be associated to a node. Can be used,
   * e.g. to memorize whether a DOM node has already been clicked or not
   */
  this.m_mark = 0;
  
  this.toString = function(to_escape) // {{{
  {
    var tag_beg = "<";
    var tag_end = ">";
    if (to_escape === true)
    {
      tag_beg = "&lt;";
      tag_end = "&gt;";
    }
    var out = "";
    if (this.m_isLeaf === true)
    {
      // Leaf (i.e. text) node
      return this.m_name;
    }
    out += tag_beg + this.m_name + " mark=" + this.m_mark;
    for (var i = 0; i < this.m_attributes.length; i++)
    {
      var dna = this.m_attributes[i];
      out += " " + dna.m_name + "=\"" + dna.m_value + "\"";
    }
    out += tag_end + "\n";
    for (i = 0; i < this.m_children.length; i++)
    {
      var child = this.m_children[i];
      out += child.toString(to_escape);
    }
    out += "&lt;/" + this.m_name + "&gt;\n";
    return out;
  }; // }}}
  
  /**
   * Sets a value to the mark field
   * @param m The value to set
   */
  this.setMark = function(m) // {{{
  {
    this.m_mark = m;
  }; // }}}
  
  /**
   * Returns the value of the mark field
   * @return The mark value
   */
  this.getMark = function() // {{{
  {
    return this.m_mark;
  }; // }}}
  
  /**
   * Sets the mark back to some default value
   */
  this.resetMark = function() // {{{
  {
    this.m_mark = 0;
  }; // }}}
  
  /**
   * Recursively sets the mark for all nodes
   * @param m The mark to set
   */
  this.setAllMarks = function(m) // {{{
  {
    this.m_mark = m;
    for (var i = 0; i < this.m_children.length; i++)
    {
      var child = this.m_children[i];
      child.setAllMarks(m);
    }
  }; // }}}
  
  /**
   * Returns the name of the node
   * @return {string} The node name
   */
  this.getName = function() // {{{
  {
    return this.m_name;
  }; // }}}
  
  /**
   * Looks for first DOM node with mark value m, using a prefix
   * traversal of the tree. <strong>Leaf nodes are ignored.</strong>
   * @param m The value of mark to look for
   * @param path Should not be defined when called
   * @return The <em>path</em> leading to the node (as a string), empty
   *    string otherwise
   */
  this.prefixLookForMark = function(m, path) // {{{
  {
    if (this.m_name == "#document")
    {
      // We ignore the top-level element, which should always be "#document"
      if (this.m_children !== undefined && this.m_children.length > 0)
      {
        return this.m_children[0].prefixLookForMark(m);
      }
      return null;
    }
    if (this.m_isLeaf)
    {
      // We ignore leaf (i.e. text) nodes
      return null;
    }
    if (path === undefined)
    {
      path = this.m_name;
    }
    if (this.m_mark == m)
    {
      return path;
    }
    var child_count = [];
    for (var i = 0; i < this.m_children.length; i++)
    {
      var child = this.m_children[i];
      var child_name = child.m_name;
      if (child_count[child_name] === undefined)
      {
        child_count[child_name] = 0;
      }
      else
      {
        child_count[child_name]++;
      }
      var new_path = path + "/" + child_name + "[" + child_count[child_name] + "]";
      var answer = child.prefixLookForMark(m, new_path);
      if (answer !== null)
      {
        return answer;
      }
    }
    return null;
  }; // }}}

  /**
   * Returns an element of the DOM tree based on a path expression written
   * as a string. This is a front-end to {@link getElementFromPath}.
   * @param {string} path_string The path expression
   * @param {number} index Should not be defined when called
   * @return {DomNode} The DOM node at the end of the path, null if not
   *    found
   */
  this.getElementFromPathString = function(path_string) // {{{
  {
    var path = new PathExpression(path_string);
    return this.getElementFromPath(path);
  }; // }}}

  /**
   * Returns an element of the DOM tree based on a path expression.
   *
   * @param {PathExpression} path The path expression
   * @param {number} index Should not be specified
   * @return {DomNode} The DOM node at the end of the path, null if not
   *    found
   */
  this.getElementFromPath = function(path, index) // {{{
  {
    if (index === undefined)
    {
      index = 0;
    }
    if (index > path.getLength())
    {
      console.error("Error processing path");
      return null;
    }
    if (index == path.getLength())
    {
      return this;
    }
    var piece = path.getSegment(index);
    var pos = piece.getPosition();
    var name = piece.getName();
    var good_name_count = 0;
    for (var i = 0; i < this.m_children.length; i++)
    {
      var child = this.m_children[i];
      var c_name = child.m_name;
      if (name == c_name)
      {
        if (good_name_count == pos)
        {
          return child.getElementFromPath(path, index + 1);
        }
        good_name_count++;
      }
    }
    return null;
  }; // }}}
  
  /**
   * Sets/adds an attribute to the node. If the attribute already exists,
   * its value is overwritten. Otherwise, the attribute is added to the
   * node.
   * @param {string} The attribute name
   * @param {string} The value to assign to the attribute
   */
  this.setAttribute = function(name, value) // {{{
  {
    for (var i = 0; i < this.m_attributes.length; i++)
    {
      var avp = this.m_attributes[i];
      var avp_name = avp.m_name;
      if (name === avp_name)
      {
        avp.m_value = value;
        return;
      }
    }
    var new_avp = new DomNodeAttribute(name, value);
    this.m_attributes.push(new_avp);
  }; // }}}
  
  /**
   * Checks for equality between the current DOM node and another one.
   * If DomNode.IGNORE_ATTRIBUTES is set to true, the equality check will
   * not take care of elements' attributes (only name and content).
   * In any case, the mark associated to the node is not part of the
   * comparison.
   * @param {DomNode} other_node The other node to check for equality
   * @return {boolean} true or false
   */
  this.equals = function(other_node) // {{{
  {
    var i = 0;
    if (other_node === undefined)
    {
      return false;
    }
    if (!DomNode.prototype.isPrototypeOf(other_node))
    {
      return false;
    }
    if (this.m_name !== other_node.m_name)
    {
      return false;
    }
    if (this.m_isLeaf !== other_node.m_isLeaf)
    {
      return false;
    }
    if (this.m_children.length !== other_node.m_children.length)
    {
      return false;
    }
    if (!DomNode.IGNORE_ATTRIBUTES)
    {
      // Compare attributes one by one; should appear in the same
      // order and have the same values
      if (this.m_attributes.length !== other_node.m_attributes.length)
      {
        return false;
      }
      for (i = 0; i < this.m_attributes.length; i++)
      {
        var at_left = this.m_attributes[i];
        var at_right = other_node.m_attributes[i];
        if (at_right === undefined)
        {
          // Should not happen anyway
          return false;
        }
        if (at_left.m_name !== at_right.m_name)
        {
          return false;
        }
        if (at_left.m_value !== at_right.m_value)
        {
          return false;
        }
      }
    }
    // Recursively, children on both sides should be equal
    for (i = 0; i < this.m_children.length; i++)
    {
      var ch_left = this.m_children[i];
      var ch_right = other_node.m_children[i];
      if (ch_right === undefined)
      {
        // Should not happen anyway
        return false;
      }
      if (!ch_left.equals(ch_right))
      {
        return false;
      }
    }
    // If we made it here, everything we checked was equal; return true
    return true;
  }; // }}}
  
  /**
   * Computes the global size of the node and its children, expressed as an
   * estimate in bytes.
   * @return {number} The estimated global byte size
   */
  this.getByteSize = function() // {{{
  {
    // We count four bytes for the ID, plus the size of all strings
    // (name, attributes and values)
    var count = 4;
    for (var i = 0; i < this.m_children.length; i++)
    {
      var child = this.m_children[i];
      count += child.getByteSize();
    }
    for (var j = 0; j < this.m_attributes.length; j++)
    {
      var avp = this.m_attributes[j];
      count += avp.m_name.length + avp.m_value.length;
    }
    return count;
  }; // }}}
  
  /**
   * Computes the size of the DOM tree, expressed in the number of nodes
   * @return {number} The size of the DOM tree
   */
  this.countNodes = function() // {{{
  {
    var count = 1;
    for (var i = 0; i < this.m_children.length; i++)
    {
      var child = this.m_children[i];
      count += child.countNodes();
    }
    return count;
  }; // }}}
  
  /**
   * Fetches the value of the node's attribute
   * @param {string} The attribute to look for
   * @return {string} The attribute value, null if not found
   */
  this.getAttribute = function(name) // {{{
  {
    for (var i = 0; i < this.m_attributes.length; i++)
    {
      var avp = this.m_attributes[i];
      if (avp.m_name == name)
      {
        return avp.m_value;
      }
    }
    return null;
  }; // }}}
  
  /**
   * Clones the current node (i.e. performs a deep copy)
   * @param {DomNode} other_node The DomNode to clone from
   */
  this.clone = function(other_node) // {{{
  {
    var i = 0;
    if (!(other_node instanceof DomNode))
    {
      console.error("Trying to clone DomNode from an object that is not a DomNode");
      return;
    }
    this.m_name = other_node.m_name;
    this.m_isLeaf = other_node.m_isLeaf;
    this.m_attributes = [];
    for (i = 0; i < other_node.m_attributes; i++)
    {
      var avp = other_node.m_attributes[i];
      this.m_attributes.push(new DomNodeAttribute(avp.m_name, avp.m_value));
    }
    this.m_handlers = [];
    {
      if (other_node.m_handlers["onclick"] === true)
      {
        this.m_handlers["onclick"] = true;
      }
    }
    this.m_children = [];
    for (i = 0; i < other_node.m_children.length; i++)
    {
      var child = other_node.m_children[i];
      this.m_children.push(new DomNode(child));
    }
  }; // }}}
  
  // If something was passed to the constructor, use it to instantiate the
  // DOM node
  if (contents !== undefined)
  {
    if (contents instanceof DomNode)
    {
      this.clone(contents);
    }
  }
}

/**
 * Instantiates the DomNode by traversing a <code>Document</code>
 * object. This is intended to make a clone of the current state of the
 * <code>window.document</code> object into a persistent DOMNode
 * structure.
 *
 * @param {document} e The document to parse
 */
DomNode.parseFromDom = function(e) // {{{
{
  var i = 0;
  var out = new DomNode();
  out.m_name = e.nodeName;
  if (out.m_name == "#text")
  {
    // Leaf (i.e. text) node
    out.m_name = e.nodeValue;
    out.m_isLeaf = true;
  }
  else
  {
    if (e.attributes !== undefined && !DomNode.IGNORE_ATTRIBUTES)
    {
      for (i = 0; i < e.attributes.length; i++)
      {
        var attval = e.attributes[i];
        var dna = new DomNodeAttribute(attval.nodeName, attval.nodeValue);
        out.m_attributes.push(dna);
      }
    }
    if (!DomNode.IGNORE_HANDLERS)
    {
      // For handlers, we only record whether an element has a handler
      // attached to it --not the contents of that handler
      // TODO: this doesn't work. When a page has handlers attached
      // with jQuery, onclick is always null regardless. Find a way to
      // detect handlers when attached with jQuery.
      if (e.onclick !== undefined && e.onclick !== null)
      {
        out.m_handlers["onclick"] = true;
      }
    }
    for (i = 0; i < e.childNodes.length; i++)
    {
      var child = e.childNodes[i];
      var dn = DomNode.parseFromDom(child);
      out.m_children.push(dn);
    }
  }
  return out;
}; // }}}

/**
 * Internal function that parses lists of child nodes. Used by {@link
 * parseFromString, but should not be called directly
 */
DomNode.parseFromStringChildren = function(s) // {{{
{
  var children = [];
  var sc = s;
  sc = sc.trim();
  var dn = null;
  while (sc.length > 0)
  {
    dn = new DomNode();
    var left_tag_close = sc.indexOf(">");
    if (left_tag_close == -1)
    {
      dn.m_isLeaf = true;
      dn.m_name = sc;
      children.push(dn);
      break;
    }
    var tag_name = sc.substring(1, left_tag_close);
    dn.m_name = tag_name;
    var right_tag_open = sc.indexOf("</" + tag_name + ">");
    if (right_tag_open == -1)
    {
      console.error("Error parsing DOM from string: end of tag " + tag_name + " not found");
      return;
    }
    var right_tag_close = right_tag_open + tag_name.length + 2;
    if (right_tag_close >= sc.length)
    {
      console.error("Error parsing DOM from string: end of tag " + tag_name + " past end of string");
      return;
    }
    var inside = sc.substring(left_tag_close + 1, right_tag_open);
    dn.m_children = DomNode.parseFromStringChildren(inside);
    children.push(dn);
    sc = sc.substring(right_tag_close + 1).trim();
  }
  return children;
}; // }}}

/**
 * Instantiates the DomNode by parsing an HTML string.
 * <strong>NOTE:</strong> this method is a very simple implementation of
 * HTML parsing intended for debugging purposes. Attributes are ignored
 * and recursive schemas (i.e. an element &lt;e&gt; within another
 * &lt;e&gt; will yield unexpected results. To create a faithful copy of
 * the current page, use {@link parseFromDom}.
 *
 * @param {string} s The string to parse from
 */
DomNode.parseFromString = function(s) // {{{
{
  var el = DomNode.parseFromStringChildren(s);
  if (el.length >= 1)
  {
    return el[0];
  }
  return null;
}; // }}}

/**
 * Checks for equality between two DOM nodes. This is a static binary
 * front-end to the {@link DomNode#equals} method
 * 
 * @param {DomNode} n1 The first node to compare
 * @param {DomNode} n2 The second node to compare
 * @return true or false, depending on whether <code>n1.equals(n2)</code>
 */
DomNode.are_equal = function(n1, n2) // {{{
{
  if (!DomNode.prototype.isPrototypeOf(n1))
  {
    return false;
  }
  return n1.equals(n2);
}; // }}}

/**
 * Whether to ignore attributes when comparing nodes
 * @constant
 * @type {boolean}
 */
DomNode.IGNORE_ATTRIBUTES = true;

/**
 * Whether to ignore event handlers when comparing nodes
 * @constant
 * @type {boolean}
 */
DomNode.IGNORE_HANDLERS = false;
// }}}


/**
 * Returns an element of the browser's <code>window.document</code> object
 * based on a path expression
 *
 * @param {Document} dom The document object. Should always be
 *    <code>window.document</code>
 * @param {PathExpression} path The path to look for
 * @param {number} index Should not be defined when called
 * @return {Node} The element in the document at the end of the path; null
 *    if could not be found
 */
function get_element_from_path(dom, path, index) // {{{
{
  if (index === undefined)
  {
    index = 0;
  }
  if (index > path.getLength())
  {
    console.error("Error processing path");
    return;
  }
  if (index == path.getLength())
  {
    return dom;
  }
  var piece = path.getSegment(index);
  var pos = piece.getPosition();
  var name = piece.getName();
  var good_name_count = 0;
  for (var i = 0; i < dom.childNodes.length; i++)
  {
    var child = dom.childNodes[i];
    var c_name = child.nodeName;
    if (name == c_name)
    {
      if (good_name_count == pos)
      {
        return get_element_from_path(child, path, index + 1);
      }
      good_name_count++;
    }
  }
  return null;
} // }}}

/* :folding=explicit:wrap=none: */

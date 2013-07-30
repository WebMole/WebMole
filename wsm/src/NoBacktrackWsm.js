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
 * Implementation of a Web State Machine using the WebMole exploration
 * algorithm with no backtracking.
 * @constructor
 * @this {NoBacktrackWsm}
 */
function NoBacktrackWsm() // extends VanillaWsm {{{
{
  // Used to extend the prototype of VanillaWsm
  this.VanillaWsm = VanillaWsm;
  this.VanillaWsm();
  
  /**
   * Upper bound to the number of iterations of the shortest path algorithm.
   * It should be safe to set it to a high value in production context.
   * @constant
   * @type {number}
   */
  this.SAFE_COUNT = 50;
  
  /**
   * Handles the situation where the WSM has reached a dead end and is
   * sent back to its initial state. See {@link WebStateMachine#processReset}
   * for detailed info.
   * <p>
   * In the case of WebMole, the procedure
   * is to calculate the shortest path from the initial state to the closest
   * node that has not been completely exhausted (i.e. that still has
   * unclicked elements.
   * @param {number} The ID of the node in the WSM wher the exploration
   *   resumes at
   * @return {boolean} <tt>true</tt> if the exploration must continue,
   *   <tt>false</tt> if there is no unvisited page
   */
  this.processReset = function(node_id) // {{{
  {
    // Flush the visited path, as we don't need it
    this.m_pathSinceBeginning.clear();
    // If no ID is passed, we assume we reset the application, i.e.
    // go back to its initial state (the one with ID=1)
    if (node_id === undefined)
    {
      node_id = 1;
    }
    // Determine a path to the closest node that is not exhausted
    var node = this.getNodeFromId(node_id);
    var paths_queue = [];
    var new_edge = new WsmEdge();
    new_edge.setDestination(node_id);
    var new_ps = new PathSequence();
    new_ps.append(new_edge);
    paths_queue.push(new_ps);
    // ...and launch breadth-first exploration on that list
    var path = this.findPath(paths_queue);
    if (path === null)
    {
      return false; // No path returned: exploration is over
    }
    this.m_pathToFollow = path;
    return true;
  }; // }}}
  
  /**
   * Performs a breadth-first search of the WSM to look for the first
   * encountered node that is not exhausted
   * @param paths_queue {WsmEdge} A list of edge
   *   objects used as the starting point for the search
   * @return {PathSequence} A PathSequence giving the sequence of elements
   *  to click to reach a node that is not exhausted
   */
  this.findPath = function(paths_queue) // {{{
  {
    // Keep trace of node IDs that have already been visited, to avoid
    // endless looping through cycles
    var visited_ids = [];
    
    // This is actually a "while" loop that is guaranteed to terminate,
    // but for safety we use a dummy for loop with a bound on iterations
    for (var safe_count = 0; safe_count < this.SAFE_COUNT && paths_queue.length > 0; safe_count++)
    {
      for (var i = 0; i < paths_queue.length; i++)
      {
        var pseq = paths_queue[i];
        // Check if destination is exhausted
        var pseg = pseq.peekLastElement();
        var node_dest_id = pseg.getDestination();
        visited_ids[node_dest_id] = true; // Mark node as visited
        var node_dest = this.getNodeFromId(node_dest_id);
        if (!node_dest.isExhausted())
        {
          // Yes, we are done: return sequence leading to that node
          return pseq;
        }
      }
      // If we reach this point, no path in the queue ends in an exhausted
      // node: append to each all possible next-step transitions
      var new_paths_queue = [];
      while (paths_queue.length > 0)
      {
        var path_el = paths_queue.shift();
        var last_el = path_el.peekLastElement();
        var target_id = last_el.getDestination();
        var transitions = this.m_edges[target_id];
        if (transitions === undefined)
        {
          transitions = [];
        }
        for (var j = 0; j < transitions.length; j++)
        {
          var transition = transitions[j];
          var dest = transition.getDestination();
          if (visited_ids[dest] === true)
          {
            continue;
          }
          var ps = new PathSequence(path_el);
          ps.append(transition);
          new_paths_queue.push(ps);
        }
      }
      paths_queue = new_paths_queue;
    }
    // If we are here, we are done
    return null;
  }; // }}}

} // }}}

/* :folding=explicit:wrap=none: */

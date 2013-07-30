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
 * Implementation of a Web State Machine using the Tansuo exploration
 * algorithm that simulates backtracking.
 * @constructor
 * @this {TansuoWsm}
 */
function TansuoWsm() // extends NoBacktrackWsm {{{
{
  // Used to extend the prototype of VanillaWsm
  this.NoBacktrackWsm = NoBacktrackWsm;
  this.NoBacktrackWsm();
  
  /**
   * Internal member field to store the ID of the node we want to reach
   * @type {number}
   */
  this.m_targetId = null;
  
  /**
   * Handles the situation where the WSM has reached a dead end and is
   * sent back to its initial state. See {@link WebStateMachine#processReset}
   * for detailed info.
   * <p>
   * In the case of Tansuo, the procedure
   * is to return the last suffix that starts with the initial state.
   * @param {number} The ID of the node in the WSM wher the exploration
   *   resumes at
   * @return {boolean} <tt>true</tt> if the exploration must continue,
   *   <tt>false</tt> if there is no unvisited page
   */
  this.processReset = function(node_id) // {{{
  {
    // Pop last state in the state stack and peek next-to-last
    if (this.m_pathSinceBeginning.getLength() === 0)
    {
      // Not supposed to happen, but anyway, means we are done
      return false;
    }
    var dummy = this.m_pathSinceBeginning.popLastElement();
    if (this.m_pathSinceBeginning.getLength() === 0)
    {
      // Finished backtracking: we are done
      return false;
    }
    // If no ID is passed, we assume we reset the application, i.e.
    // go back to its initial state (the one with ID=1)
    if (node_id === undefined)
    {
      node_id = 1;
    }
    var len = this.m_pathSinceBeginning.getLength();
    for (var i = len - 1; i >= 0; i--)
    {
      // Go backwards until we find the initial state
      var pseg = this.m_pathSinceBeginning.getElement(i);
      var dest_id = pseg.getDestination();
      if (dest_id == node_id)
      {
        // We found it
        break;
      }
    }
    // Assert: i = position of last occurrence of node_id in sequence
    // Path to follow = suffix of sequence from that position
    var out_ps = new PathSequence();
    for (var j = i; j < len; j++)
    {
      var segment = this.m_pathSinceBeginning.getElement(j);
      out_ps.append(segment);
    }
    this.m_pathToFollow = out_ps;
    return true;
  }; // }}}
  
} // }}}

/* :folding=explicit:wrap=none: */

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

// We ignore JSLint's eval warning: see in the code for the reason
/*jslint evil: true */

// Constants used by the monitors to return their verdict
MONITOR_FALSE = 0;
MONITOR_TRUE = -1;
MONITOR_INCONCLUSIVE = 1;

// Define the string.trim method if the browser does not provide it
if (!String.prototype.trim) // {{{
{
  String.prototype.trim = function()
  {
    return this.replace(/^\s+|\s+$/g, '');
  };
} // }}}

// Define an empty console.log method if none is present
if (typeof console === "undefined") // {{{
{
  console = { log: function() { } };
} // }}}

/**
 * Monitor for the <b>G</b> temporal operator
 */
function MonitorG(phi) // {{{
{
  // The internal monitor for the inside property
  this.m_phi = phi;
  
  // An array of monitors, one for each state of the trace to read
  this.m_mons = [];
  
  // The monitor's verdict, by default "inconclusive"; once
  // the monitor concludes either true or false, it keeps its value forever
  this.m_verdict = MONITOR_INCONCLUSIVE;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var m_phi_clone = this.m_phi.clone();
    var out = new MonitorG(m_phi_clone);
    return out;
  };
  
  /**
   * Processes a new event.
   * @param e The event to process. This can be any JavaScript object;
   *   the monitor merely passes the event to its internal monitors.
   */
  this.processEvent = function(e)
  {
    // Optimization: if we already reached a verdict,
    // don't care about new events
    if (this.m_verdict != MONITOR_INCONCLUSIVE)
    {
      return;
    }
    var new_mon = this.m_phi.clone();
    this.m_mons.push(new_mon);
    for (var i = 0; i < this.m_mons.length; i++)
    {
      var mon = this.m_mons[i];
      mon.processEvent(e);
    }
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    // If we already reached a verdict, return it
    if (this.m_verdict != MONITOR_INCONCLUSIVE)
    {
      return this.m_verdict;
    }
    for (var i = 0; i < this.m_mons.length; i++)
    {
      var mon = this.m_mons[i];
      var verd = mon.getVerdict();
      if (verd != MONITOR_INCONCLUSIVE)
      {
        // We remove this monitor from the array, as it
        // will never change the verdict from now on
        this.m_mons.splice(i, 1);
        i--; // Decrement i, as the positions in the array shifted
      }
      if (verd == MONITOR_FALSE)
      {
        this.m_verdict = MONITOR_FALSE;
        // We don't break right away, so that the monitor can
        // continue its housekeeping on its internal monitors
      }
    }
    return this.m_verdict;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    this.m_phi.setValue(a, v);
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return "G (" + this.m_phi.toString() + ")";
  };
} // }}}

/**
 * Monitor for the <b>F</b> temporal operator
 */
function MonitorF(phi) // {{{
{
  // The internal monitor for the inside property
  this.m_phi = phi;
  
  // An array of monitors, one for each state of the trace to read
  this.m_mons = [];
  
  // The monitor's verdict, by default "inconclusive"; once
  // the monitor concludes either true or false, it keeps its value forever
  this.m_verdict = MONITOR_INCONCLUSIVE;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var m_phi_clone = this.m_phi.clone();
    var out = new MonitorF(m_phi_clone);
    return out;
  };
  
  /**
   * Processes a new event.
   * @param e The event to process. This can be any JavaScript object;
   *   the monitor merely passes the event to its internal monitors.
   */
  this.processEvent = function(e)
  {
    // Optimization: if we already reached a verdict,
    // don't care about new events
    if (this.m_verdict != MONITOR_INCONCLUSIVE)
    {
      return;
    }
    var new_mon = this.m_phi.clone();
    this.m_mons.push(new_mon);
    for (var i = 0; i < this.m_mons.length; i++)
    {
      var mon = this.m_mons[i];
      mon.processEvent(e);
    }
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    // If we already reached a verdict, return it
    if (this.m_verdict != MONITOR_INCONCLUSIVE)
    {
      return this.m_verdict;
    }
    for (var i = 0; i < this.m_mons.length; i++)
    {
      var mon = this.m_mons[i];
      var verd = mon.getVerdict();
      if (verd != MONITOR_INCONCLUSIVE)
      {
        // We remove this monitor from the array, as it
        // will never change the verdict from now on
        this.m_mons.splice(i, 1);
        i--; // Decrement i, as the positions in the array shifted
      }
      if (verd == MONITOR_TRUE)
      {
        this.m_verdict = MONITOR_TRUE;
        // We don't break right away, so that the monitor can
        // continue its housekeeping on its internal monitors
      }
    }
    return this.m_verdict;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    this.m_phi.setValue(a, v);
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return "F (" + this.m_phi.toString() + ")";
  };
} // }}}

/**
 * Monitor for the <b>X</b> temporal operator
 */
function MonitorX(phi) // {{{
{
  this.m_phi = phi;
  this.m_first_event = true;
  
  // The monitor's verdict, by default "inconclusive"; once
  // the monitor concludes either true or false, it keeps its value forever
  this.m_verdict = MONITOR_INCONCLUSIVE;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var m_phi_clone = this.m_phi.clone();
    var out = new MonitorX(m_phi_clone);
    return out;
  };
  
  /**
   * Processes a new event.
   * @param e The event to process. This can be any JavaScript object;
   *   the monitor merely passes the event to its internal monitors.
   */
  this.processEvent = function(e)
  {
    // We pass all events to the internal monitor, except the first
    if (this.m_first_event === true)
    {
      //this.m_first_event = false;
      return;
    }
    this.m_phi.processEvent(e);
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    // If we already reached a verdict or we are not at next state, return it
    if (this.m_verdict != MONITOR_INCONCLUSIVE || this.m_first_event === true)
    {
      this.m_first_event = false;
      return this.m_verdict;
    }
    var verd = this.m_phi.getVerdict();
    if (verd != MONITOR_INCONCLUSIVE)
    {
      this.m_verdict = verd;
    }
    return this.m_verdict;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    this.m_phi.setValue(a, v);
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return "X (" + this.m_phi.toString() + ")";
  };
} // }}}

/**
 * Monitor for the logical conjunction
 */
function MonitorAnd(phi, psi) // {{{
{
  // The internal monitors for the inside properties
  this.m_phi = phi;
  this.m_psi = psi;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var m_phi_clone = this.m_phi.clone();
    var m_psi_clone = this.m_psi.clone();
    var out = new MonitorAnd(m_phi_clone, m_psi_clone);
    return out;
  };
  
  /**
   * Processes a new event.
   * @param e The event to process. This can be any JavaScript object;
   *   the monitor merely passes the event to its internal monitors.
   */
  this.processEvent = function(e)
  {
    this.m_phi.processEvent(e);
    this.m_psi.processEvent(e);
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    var verd_left = this.m_phi.getVerdict();
    var verd_right = this.m_psi.getVerdict();
    if (verd_left == MONITOR_FALSE || verd_right == MONITOR_FALSE)
    {
      return MONITOR_FALSE;
    }
    if (verd_left == MONITOR_TRUE && verd_right == MONITOR_TRUE)
    {
      return MONITOR_TRUE;
    }
    return MONITOR_INCONCLUSIVE;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    this.m_phi.setValue(a, v);
    this.m_psi.setValue(a, v);
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return "(" + this.m_mon_left.toString() + ")" + "∧ (" + this.m_mon_right.toString() + ")";
  };
} // }}}

/**
 * Monitor for the logical disjunction
 */
function MonitorOr(phi, psi) // {{{
{
  // The internal monitors for the inside properties
  this.m_phi = phi;
  this.m_psi = psi;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var m_phi_clone = this.m_phi.clone();
    var m_psi_clone = this.m_psi.clone();
    var out = new MonitorOr(m_phi_clone, m_psi_clone);
    return out;
  };
  
  /**
   * Processes a new event.
   * @param e The event to process. This can be any JavaScript object;
   *   the monitor merely passes the event to its internal monitors.
   */
  this.processEvent = function(e)
  {
    this.m_phi.processEvent(e);
    this.m_psi.processEvent(e);
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    var verd_left = this.m_phi.getVerdict();
    var verd_right = this.m_psi.getVerdict();
    if (verd_left == MONITOR_TRUE || verd_right == MONITOR_TRUE)
    {
      return MONITOR_TRUE;
    }
    if (verd_left == MONITOR_FALSE && verd_right == MONITOR_FALSE)
    {
      return MONITOR_FALSE;
    }
    return MONITOR_INCONCLUSIVE;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    this.m_phi.setValue(a, v);
    this.m_psi.setValue(a, v);
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return "(" + this.m_mon_left.toString() + ")" + "∨ (" + this.m_mon_right.toString() + ")";
  };
} // }}}

/**
 * Monitor for the logical implication
 */
function MonitorImplies(phi, psi) // {{{
{
  // The internal monitors for the inside properties
  this.m_phi = phi;
  this.m_psi = psi;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var m_phi_clone = this.m_phi.clone();
    var m_psi_clone = this.m_psi.clone();
    var out = new MonitorImplies(m_phi_clone, m_psi_clone);
    return out;
  };
  
  /**
   * Processes a new event.
   * @param e The event to process. This can be any JavaScript object;
   *   the monitor merely passes the event to its internal monitors.
   */
  this.processEvent = function(e)
  {
    this.m_phi.processEvent(e);
    this.m_psi.processEvent(e);
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    var verd_left = this.m_phi.getVerdict();
    var verd_right = this.m_psi.getVerdict();
    if (verd_left == MONITOR_FALSE || verd_right == MONITOR_TRUE)
    {
      return MONITOR_TRUE;
    }
    if (verd_left == MONITOR_TRUE && verd_right == MONITOR_FALSE)
    {
      return MONITOR_FALSE;
    }
    return MONITOR_INCONCLUSIVE;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    this.m_phi.setValue(a, v);
    this.m_psi.setValue(a, v);
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return "(" + this.m_mon_left.toString() + ")" + "→ (" + this.m_mon_right.toString() + ")";
  };
} // }}}

/**
 * Monitor for the logical negation
 */
function MonitorNot(phi) // {{{
{
  // The internal monitor for the inside property
  this.m_phi = phi;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var m_phi_clone = this.m_phi.clone();
    var out = new MonitorNot(m_phi_clone);
    return out;
  };
  
  /**
   * Processes a new event.
   * @param e The event to process. This can be any JavaScript object;
   *   the monitor merely passes the event to its internal monitors.
   */
  this.processEvent = function(e)
  {
    this.m_phi.processEvent(e);
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    var verd = this.m_phi.getVerdict();
    if (verd == MONITOR_TRUE)
    {
      return MONITOR_FALSE;
    }
    if (verd == MONITOR_FALSE)
    {
      return MONITOR_TRUE;
    }
    return MONITOR_INCONCLUSIVE;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    this.m_phi.setValue(a, v);
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return "¬ (" + this.m_mon.toString() + ")";
  };
} // }}}

/**
 * Monitor for the <b>U</b> temporal operator
 */
function MonitorU(phi, psi) // {{{
{
  // The internal monitors for the inside properties
  this.m_phi = phi;
  this.m_psi = psi;
  
  // Array of monitors, one for each state of the trace to read
  this.m_mons_left = [];
  this.m_mons_right = [];
  
  // The monitor's verdict, by default "inconclusive"; once
  // the monitor concludes either true or false, it keeps its value forever
  this.m_verdict = MONITOR_INCONCLUSIVE;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var m_phi_clone = this.m_phi.clone();
    var m_psi_clone = this.m_psi.clone();
    var out = new MonitorU(m_phi_clone, m_psi_clone);
    return out;
  };
  
  /**
   * Processes a new event.
   * @param e The event to process. This can be any JavaScript object;
   *   the monitor merely passes the event to its internal monitors.
   */
  this.processEvent = function(e)
  {
    // Optimization: if we already reached a verdict,
    // don't care about new events
    if (this.m_verdict != MONITOR_INCONCLUSIVE)
    {
      return;
    }
    for (var i = 0; i < this.m_mons_left.length; i++)
    {
      var mon = this.m_mons_left[i];
      mon.processEvent(e);
      mon = this.m_mons_right[i];
      mon.processEvent(e);
    }
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    // If we already reached a verdict, return it
    if (this.m_verdict != MONITOR_INCONCLUSIVE)
    {
      return this.m_verdict;
    }
    var verd_left = this.m_phi.getVerdict();
    var verd_right = this.m_psi.getVerdict();
    if (verd_left == MONITOR_FALSE && verd_right == MONITOR_FALSE)
    {
      this.m_verdict = MONITOR_FALSE;
    }
    else if (verd_right == MONITOR_TRUE)
    {
      this.m_verdict = MONITOR_TRUE;
    }
    return this.m_verdict;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    this.m_phi.setValue(a, v);
    this.m_psi.setValue(a, v);
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return "(" + this.m_mon_left.toString() + ") U (" + this.m_mon_right.toString() + ")";
  };
} // }}}

/**
 * Monitor for a JavaScript expression. This is the monitor that actually
 * computes things against a given event (all other monitors merely
 * combine the result of other, nested monitors). The monitor can be
 * instantiated with any valid JavaScript expression, which will be
 * evaluated using JS's internal eval() function.
 * @param exp The expression that will be evaluated
 * @param evaluate (Optional) Set to true so that the expression will be
 *   tentatively evaluated at instantiation (used to check syntax errors)
 * @return Normally nothing; perhaps false if evaluation of the expression
 *   creates an error
 */
function MonitorJS(exp, evaluate) // {{{
{
  // The JavaScript expression to evaluate, stored as a string
  this.m_exp = null;
  if (evaluate === true)
  {
    try
    {
      eval(exp);
    }
    catch (err)
    {
      // We return right away if evaluating exp creates a syntax error;
      // this is used to notify the parser that instantiation of the
      // monitor failed. We don't return for other errors, as some
      // expressions contain quantified variables that are not yet defined
      // (this causes a ReferenceError that won't occur during normal
      // execution).
      if (err.name == "SyntaxError")
      {
        return;
      }
    }
  }
  this.m_exp = exp;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var out = new MonitorJS(this.m_exp);
    return out;
  };
  
  /**
   * Processes a new event. In the case of a MonitorJS, one should then
   * evaluate the verdict as soon as possible afterwards, as the expression
   * (probably) refers to the current document
   * and this document may change.
   * @param e The event to process. This can be any JavaScript object,
   *   except null.
   */
  this.processEvent = function(e)
  {
    // Nothing to do
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    // Yes, we use eval. We *do* want arbitrary JS to be executed here.
    // Eventually, we'd like to replace it by an interpreter for jQuery-like
    // expressions. Caveat emptor!
    var verd = null;
    try
    {
      var verd = eval(this.m_exp);
    }
    catch (err)
    {
      console.log("Error evaluating " + this.m_exp);
      return MONITOR_INCONCLUSIVE;
    }
    if (verd === true)
    {
      return MONITOR_TRUE;
    }
    if (verd === false)
    {
      return MONITOR_FALSE;
    }
    return MONITOR_INCONCLUSIVE;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    // Escape the "?" symbol so it won't be interpreted by regex
    var regex, new_exp = this.m_exp;
    var a_escaped = a.replace('?', '\\?');
    regex = new RegExp('(^|[\\(\\)\\[\\],\\s]+)' + a_escaped + '([\\(\\)\\[\\],\\s]+|$)', 'g');
    new_exp = new_exp.replace(regex, "$1" + v + "$2");
    regex = new RegExp('([\'"])' + a_escaped + '([\'"])', 'g');
    new_exp = new_exp.replace(regex, "$1" + this.escapeString(v) + "$2");
    this.m_exp = new_exp;
  };
  
  /**
   * Escapes a string for common control characters
   * @param str The string to escape
   * @return The escaped string
   */
  this.escapeString = function(str)
  {
    return (str+'').replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/'/g, "\\'");
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return this.m_exp;
  };
} // }}}

/**
 * Monitor for the universal quantifier
 */
function MonitorForAll(phi, a, p) // {{{
{
  // The internal monitor for the inside property
  this.m_phi = phi;
  
  // The quantified variable
  this.m_a = a;
  
  // The JavaScript expression that fetches values for the quantified
  // variable in the current page. This expression must return an array.
  this.m_p = p;
  
  // An array of monitors, one for each value of a
  this.m_mons = [];
  
  // Process only the first event
  this.m_first_event = true;
  
  // The monitor's verdict, by default "inconclusive"; once
  // the monitor concludes either true or false, it keeps its value forever
  this.m_verdict = MONITOR_INCONCLUSIVE;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var m_phi_clone = this.m_phi.clone();
    var out = new MonitorForAll(m_phi_clone, a, p);
    return out;
  };
  
  /**
   * Processes a new event.
   * @param e The event to process. This can be any JavaScript object;
   *   the monitor merely passes the event to its internal monitors.
   */
  this.processEvent = function(e)
  {
    // Optimization: if we already reached a verdict,
    // don't care about new events
    if (this.m_verdict != MONITOR_INCONCLUSIVE)
    {
      return;
    }
    // Fetch domain for quantified variable
    var i = 0;
    var domain = eval(this.m_p);
    if (this.m_first_event === true)
    {
      this.m_first_event = false;
      for (i = 0; i < domain.length; i++)
      {
        // For each value, instantiate inner monitor, replacing the variable
        // by this value
        var value = domain[i];
        var new_mon = this.m_phi.clone();
        new_mon.setValue(this.m_a, value);
        new_mon.processEvent(e);
        this.m_mons.push(new_mon);
      }
    }
    else
    {
      for (i = 0; i < this.m_mons.length; i++)
      {
        var mon = this.m_mons[i];
        mon.processEvent(e);
      }
    }
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    // If we already reached a verdict, return it
    if (this.m_verdict != MONITOR_INCONCLUSIVE)
    {
      return this.m_verdict;
    }
    for (var i = 0; i < this.m_mons.length; i++)
    {
      var mon = this.m_mons[i];
      var verd = mon.getVerdict();
      if (verd != MONITOR_INCONCLUSIVE)
      {
        // We remove this monitor from the array, as it
        // will never change the verdict from now on
        this.m_mons.splice(i, 1);
        i--; // Decrement i, as the positions in the array shifted
      }
      if (verd == MONITOR_FALSE)
      {
        this.m_verdict = MONITOR_FALSE;
        // We don't break right away, so that the monitor can
        // continue its housekeeping on its internal monitors
      }
    }
    // If no internal monitor exists in the list, verdict is false
    if (this.m_mons.length === 0 && this.m_verdict != MONITOR_FALSE)
    {
      this.m_verdict = MONITOR_TRUE;
    }
    return this.m_verdict;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    this.m_phi.setValue(a, v);
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return "∀ " + this.m_a + " ∈ " + this.m_p + " : (" + this.m_phi.toString() + ")";
  };
} // }}}

/**
 * Monitor for the existential quantifier
 */
function MonitorExists(phi, a, p) // {{{
{
  // The internal monitor for the inside property
  this.m_phi = phi;
  
  // The quantified variable
  this.m_a = a;
  
  // The JavaScript expression that fetches values for the quantified
  // variable in the current page. This expression must return an array.
  this.m_p = p;
  
  // An array of monitors, one for each value of a
  this.m_mons = [];
  
  // The monitor's verdict, by default "inconclusive"; once
  // the monitor concludes either true or false, it keeps its value forever
  this.m_verdict = MONITOR_INCONCLUSIVE;
  
  // Process only the first event
  this.m_first_event = true;
  
  /**
   * Performs a deep clone of the object
   * @return A clone of the object
   */
  this.clone = function()
  {
    var m_phi_clone = this.m_phi.clone();
    var out = new MonitorExists(m_phi_clone, a, p);
    return out;
  };
  
  /**
   * Processes a new event.
   * @param e The event to process. This can be any JavaScript object;
   *   the monitor merely passes the event to its internal monitors.
   */
  this.processEvent = function(e)
  {
    // Optimization: if we already reached a verdict,
    // don't care about new events
    if (this.m_verdict != MONITOR_INCONCLUSIVE)
    {
      return;
    }
    // Fetch domain for quantified variable
    var i = 0;
    var domain = eval(this.m_p);
    if (this.m_first_event === true)
    {
      this.m_first_event = false;
      for (i = 0; i < domain.length; i++)
      {
        // For each value, instantiate inner monitor, replacing the variable
        // by this value
        var value = domain[i];
        var new_mon = this.m_phi.clone();
        new_mon.setValue(this.m_a, value);
        new_mon.processEvent(e);
        this.m_mons.push(new_mon);
      }
    }
    else
    {
      for (i = 0; i < this.m_mons.length; i++)
      {
        var mon = this.m_mons[i];
        mon.processEvent(e);
      }
    }
  };
  
  /**
   * Computes the verdict of the monitor.
   * @return The verdict. The return value can be either
   *   true, false, or inconclusive, according to the constants
   *   defined earlier in this file.
   */
  this.getVerdict = function()
  {
    // If we already reached a verdict, return it
    if (this.m_verdict != MONITOR_INCONCLUSIVE)
    {
      return this.m_verdict;
    }
    for (var i = 0; i < this.m_mons.length; i++)
    {
      var mon = this.m_mons[i];
      var verd = mon.getVerdict();
      if (verd != MONITOR_INCONCLUSIVE)
      {
        // We remove this monitor from the array, as it
        // will never change the verdict from now on
        this.m_mons.splice(i, 1);
        i--; // Decrement i, as the positions in the array shifted
      }
      if (verd == MONITOR_TRUE)
      {
        this.m_verdict = MONITOR_TRUE;
        // We don't break right away, so that the monitor can
        // continue its housekeeping on its internal monitors
      }
    }
    // If no internal monitor exists in the list, verdict is false
    if (this.m_mons.length === 0 && this.m_verdict != MONITOR_TRUE)
    {
      this.m_verdict = MONITOR_FALSE;
    }
    return this.m_verdict;
  };
  
  /**
   * Replaces the occurrence of a quantified variable by some value
   * @param a The variable to look for
   * @param v The value to replace it by
   */
  this.setValue = function(a, v)
  {
    this.m_phi.setValue(a, v);
  };
  
  /**
   * Displays the monitor as a string
   * @return A (UTF-8) string representing the LTL expression
   *   that is being monitored
   */
  this.toString = function()
  {
    return "∃ " + this.m_a + " ∈ " + this.m_p + " : (" + this.m_phi.toString() + ")";
  };
} // }}}

/**
 * Instantiates a chain of monitors based on a string representation of
 * some LTL formula. You should call the parseFromString(s) method to
 * obtain the desired monitor. All other methods should be considered
 * "private" and do not need to be called from the outside of that
 * object.
 */
function LTLStringParser() // {{{
{
  /**
   * Parses an LTL formula from an input string.
   * @param s A well-formed input formula
   * @return An instance of monitor for the given formula
   */
  this.parseFromString = function(s) // {{{
  {
    // Removes all empty lines and those that begin with
    // the comment (#) character
    var lines = s.split("\n");
    var out = "";
    for (var i = 0; i < lines.length; i++)
    {
      var line = lines[i];
      line = line.trim();
      if (line.length === 0 || line[0] == "#")
      {
        continue;
      }
      out += line + " ";
    }
    out = out.trim();
    return this.parse(s);
  }; // }}}
  
  /**
   * Internal parser. You should not call this method directly,
   * and rather use parseFromString().
   */
  this.parse = function(s) // {{{
  {
    s = s.trim();
    var out = null;
    var c = s[0];
    if (this.isQuantifierStart(c))
    {
      // Quantifier: get end
      var end_quantif = s.indexOf(":");
      if (end_quantif == -1)
      {
        console.log("Parse exception");
        return null;
      }
      // Process quantifier
      var inside_quantif = s.substring(1, end_quantif).trim();
      var parts = inside_quantif.split("∈");
      if (parts.length != 2)
      {
        console.log("Parse exception");
        return null;
      }
      var a = parts[0].trim(); // a contains the quantified variables
      var p = parts[1].trim(); // p contains the domain function
      p = this.processDomainFunction(p);
      s = s.substr(end_quantif + 1).trim();
      s = this.trimSurroundingPars(s);
      var m_in_quantif = this.parse(s);
      if (m_in_quantif === null)
      {
        console.log("Parse exception");
        return null;
      }
      if (c == "∃")
      {
        out = new MonitorExists(m_in_quantif, a, p);
      }
      else if (c == "∀")
      {
        out = new MonitorForAll(m_in_quantif, a, p);
      }
    }
    else if (this.isUnaryOperator(c))
    {
      // Unary operator
      s = s.substr(1).trim();
      s = this.trimSurroundingPars(s);
      var m_in_unary = this.parse(s);
      if (m_in_unary === null)
      {
        console.log("Parse exception");
        return null;
      }
      if (c == "F")
      {
        out = new MonitorF(m_in_unary);
      }
      else if (c == "G")
      {
        out = new MonitorG(m_in_unary);
      }
      else if (c == "X")
      {
        out = new MonitorX(m_in_unary);
      }
      else if (c == "¬")
      {
        out = new MonitorNot(m_in_unary);
      }
      else
      {
        console.log("Parse exception");
        return null;
      }
    }
    else if (this.containsBinaryOperator(s))
    {
      // Here, we know s contains either a binary operator or is
      // an atom. We discriminate by checking for the presence of
      // a binary operator
      var left = this.getLeft(s);
      var right = this.getRight(s);
      if (left.length === 0 || right.length === 0)
      {
        console.log("Parse exception");
        return null;
      }
      var pars_left = s.indexOf(left);
      var pars_right = s.length - s.lastIndexOf(right) - right.length;
      if (pars_left < 0 || pars_right < 0)
      {
        console.log("Parse exception");
        return null;
      }
      var op = this.getOperator(s, left.length + pars_left * 2, right.length + pars_right * 2);
      var o_left = this.parse(left);
      var o_right = this.parse(right);
      if (o_left === null || o_right === null)
      {
        console.log("Parse exception: failed to parse operand from binary operator");
        return null;
      }
      if (op === "∧")
      {
        out = new MonitorAnd(o_left, o_right);
      }
      else if (op === "∨")
      {
        out = new MonitorOr(o_left, o_right);
      }
      else if (op === "→")
      {
        out = new MonitorImplies(o_left, o_right);
      }
      else if (op === "U")
      {
        out = new MonitorU(o_left, o_right);
      }
      else
      {
        console.log("Parse exception: unrecognized binary operator '" + c + "'");
        return null;
      }
    }
    else
    {
      // Atom or XPathAtom, last remaining case
      out = new MonitorJS(s, true);
      if (out.m_exp === null)
      {
        console.log("Parse exception: error when interpreting JavaScript '" + s + "'");
        return null;
      }
    }
    return out;
  }; // }}}
  
  this.trimSurroundingPars = function(s)
  {
    if (s[0] == "(")
    {
      s = s.substring(1, s.length - 1).trim();
    }
    return s;
  };
  
  this.isQuantifierStart = function(c)
  {
    return c == "∃" || c == "∀";
  };
  
  this.isUnaryOperator = function(c)
  {
    return c == "F" || c == "G" || c == "X" || c == "¬";
  };
  
  this.containsBinaryOperator = function(s)
  {
    return s.indexOf("∧") != -1 || s.indexOf("∨") != -1 || s.indexOf("→") != -1 || s.indexOf(" U ") != -1;
  };
  
  this.getLeft = function(s)
  {
    if (s[0] == "(")
    {
      // Find matching right parenthesis
      var paren_level = 1; 
      for (var i = 1; i < s.length; i++)
      {
        var c = s[i];
        if (c == "(")
        {
          paren_level++;
        }
        if (c == ")")
        {
          paren_level--;
        }
        if (paren_level === 0)
        {
          return s.substring(1, i);
        }
      }
    }
    else
    {
      // Loop until operator or space found
      for (var j = 1; j < s.length; j++)
      {
        var d = s[j];
        if (d == "(" || d == ")" || d == "∧" || d == "∨" || d == "→" || d == "U")
        {
          return s.substring(0, j);
        }
      }
    }
    return "";
  };
  
  this.getRight = function(s)
  {
    if (s[s.length - 1] == ")")
    {
      // Find matching right parenthesis
      var paren_level = 1; 
      for (var i = s.length - 1; i >= 0; i--)
      {
        var c = s[i];
        if (c == ")")
        {
          paren_level++;
        }
        if (c == "(")
        {
          paren_level--;
        }
        if (paren_level === 1)
        {
          return s.substring(i + 1, s.length - 1);
        }
      }
    }
    else
    {
      // Loop until operator or space found
      for (var j = s.length - 1; j >= 0; j--)
      {
        var d = s[j];
        if (d == "(" || d == ")" || d == "∧" || d == "∨" || d == "→" || d == "U")
        {
          return s.substr(j + 1);
        }
      }
    }
    return "";
  };
  
  this.getOperator = function(s, size_left, size_right)
  {
    if (size_left + size_right >= s.length)
    {
      console.log("Parse exception");
      return null;
    }
    return s.substring(size_left, s.length - size_right).trim();
  };
  
  /**
   * Processes the domain function. As a shorthand notation, the string
   * version of a universal quantifier accepts something like
   * <code>
   * $("li")/.width()
   * </code>
   * to denote the set of values containing the width of each "li" element.
   * This notation is not standard jQuery (or JavaScript for that matter),
   * and is internally expanded as the following expression:
   * <code>
   * $("li").map(function() { return $(this).width(); }).get()
   * </code>
   * which indeed returns an array of widths that can be quantified on.
   * (NOTE: the slash notation is derived from APL, which uses it to
   * map the following operator on a list of operands.)
   */
  this.processDomainFunction = function(p)
  {
    p = p.replace("/.", ".map(function() { return $(this).");
    p += "; }).get()";
    return p;
  };
} // }}}

/* :folding=explicit:wrap=none: */

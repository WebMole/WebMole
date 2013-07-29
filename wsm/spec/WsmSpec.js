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
 * Unit testing of WSM manipulation
 */
describe("WSM manipulation", function() {
    
    beforeEach(function() {
        pages = [];
        pages[1] = DomNode.parseFromString("<#document><html><h1>Page 1</h1><p><a>To page 2</a><a>To page 3</a></p></html></#document>");
        pages[2] = DomNode.parseFromString("<#document><html><h1>Page 2</h1><a>To page 3</a><a>To page 4</a></html></#document>");
        wsm = new WebStateMachine();
        wsm.abstractNode = function(dom) { return dom; }
    });
    
    it("Setting the initial node", function() {
        wsm.setCurrentDom(pages[1]);
        expect(wsm.m_nodes.length).toEqual(1);
        expect(wsm.m_domTree.equals(pages[1])).toEqual(true);
        expect(wsm.m_pathToFollow.isEmpty()).toEqual(true);
    });
});

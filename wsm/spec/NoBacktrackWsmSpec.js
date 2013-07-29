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
 * Unit testing of NoBacktrackWsm
 */
describe("NoBacktrackWsm behaviour", function() {
    
    beforeEach(function() {
        pages = [];
        pages[1] = DomNode.parseFromString("<#document><html><h1>Page 1</h1><p><a>To page 2</a><a>To page 3</a></p></html></#document>");
        pages[2] = DomNode.parseFromString("<#document><html><h1>Page 2</h1><a>To page 3</a><a>To page 4</a></html></#document>");
        pages[3] = DomNode.parseFromString("<#document><html><h1>Page 3</h1><a>To page 3</a><a>To page 4</a></html></#document>");
        pages[4] = DomNode.parseFromString("<#document><html><h1>Page 4</h1><a>To page 3</a><a>To page 4</a></html></#document>");
        wsm = new NoBacktrackWsm();
    });
    
    it("Computing the reset path", function() {
        var p = null, el = null, el_to_click = null;
        p = new DomNode(pages[1]);
        p.setAllMarks(WsmNode.CLICKED);
        wsm.setCurrentDom(p);
        
        p = new DomNode(pages[2]);
        p.setAllMarks(WsmNode.CLICKED);      
        wsm.setCurrentDom(p, "html/p[0]/a[0]");
        
        p = new DomNode(pages[3]);
        p.setAllMarks(WsmNode.CLICKED);
        el = p.getElementFromPathString("html/a[1]");
        el.setMark(WsmNode.NOT_CLICKED); // Leave a node unclicked in this page     
        wsm.setCurrentDom(p, "html/a[0]");
        
        p = new DomNode(pages[4]);
        p.setAllMarks(WsmNode.CLICKED);        
        wsm.setCurrentDom(p, "html/p[0]/a[0]");    
        
        // Ask for next click: should be empty
        el_to_click = wsm.getNextClick();
        var path_to_click = el_to_click.getContents();
        var page_to_click = el_to_click.getDestination();
        expect(page_to_click).not.toEqual(wsm.m_currentNodeId);
        var ptf = wsm.m_pathToFollow;
        expect(ptf.getLength()).toEqual(2);
        // Jump back to initial state
        wsm.setCurrentDom(pages[1]);
    });
});

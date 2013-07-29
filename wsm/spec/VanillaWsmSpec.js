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
 * Unit testing of VanillaWsm
 */
describe("VanillaWsm behaviour", function() {
    
    beforeEach(function() {
        pages = [];
        pages[1] = DomNode.parseFromString("<#document><html><body><h1>Page 1</h1><p><a>To page 2</a><a>To page 3</a></p></body></html></#document>");
        pages[2] = DomNode.parseFromString("<#document><html><body><h1>Page 2</h1><a>To page 3</a><a>To page 4</a></body></html></#document>");
        wsm = new VanillaWsm();
        expect(WsmNode.CLICKED).toBeDefined();
        expect(WsmNode.NOT_CLICKED).toBeDefined();
    });
    
    it("Recording a transition to a new node", function() {
        wsm.setCurrentDom(pages[1]);
        wsm.setCurrentDom(pages[2], "html/body/p/a[0]");
        expect(wsm.m_nodes.length).toEqual(2);
        var n = wsm.getNodeFromDom(pages[1]);
        var id = n.getId();
        expect(wsm.m_edges[id].length).toEqual(1);
        expect(wsm.m_domTree.equals(pages[2])).toEqual(true);
        expect(wsm.m_pathToFollow.isEmpty()).toEqual(true);
    });
    
    it("Returning the next click", function() {
        var new_page = new DomNode(pages[1]);
        new_page.setAllMarks(WsmNode.CLICKED);
        var el = new_page.getElementFromPathString("html/body[0]/p[0]/a[1]");
        el.setMark(WsmNode.NOT_CLICKED);
        wsm.setCurrentDom(new_page);
        var next_click = wsm.getNextClick();
        var next_path = next_click.getContents();
        expect(next_path).toEqual("html/body[0]/p[0]/a[1]");
    });
    
    it("Recognizing a dead end", function() {
        var new_page = new DomNode(pages[1]);
        new_page.setAllMarks(WsmNode.CLICKED);
        wsm.setCurrentDom(new_page);
        var next_click = wsm.getNextClick();
        expect(next_click).toEqual(null);
    });
});

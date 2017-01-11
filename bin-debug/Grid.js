var Grid = (function () {
    function Grid(numCols, numRows) {
        this._numCols = numCols;
        this._numRow = numRows;
        this._points = new Array();
        for (var i = 0; i < this._numCols; i++) {
            this._points[i] = new Array();
            for (var j = 0; j < this._numRow; j++) {
                this._points[i][j] = new Point(i, j);
            }
        }
    }
    var d = __define,c=Grid,p=c.prototype;
    p.getPoint = function (x, y) {
        return this._points[x][y];
    };
    p.setStartPoint = function (x, y) {
        // this.StartPoint = new Point(this._points[x], this._points[x].Point[y]);
        // this._points[x].Point[y] as Point;
        this.StartPoint = this._points[x][y];
    };
    p.setEndPoint = function (x, y) {
        this.EndPoint = this._points[x][y];
        //new Point(this._points[x], this._points[x].Point[y]);
        // this._points[x][y] as Point;
    };
    p.setWalkable = function (x, y, value) {
        this._points[x][y].Walkable = value; /////////////
    };
    return Grid;
}());
egret.registerClass(Grid,'Grid');
//# sourceMappingURL=Grid.js.map
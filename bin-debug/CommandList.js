var CommandList = (function () {
    function CommandList() {
        this._list = [];
        this._frozen = false;
        this.isFinishedFlag = true;
    }
    var d = __define,c=CommandList,p=c.prototype;
    p.addCommand = function (command) {
        this._list.push(command);
    };
    p.cancel = function () {
        var _this = this;
        this._frozen = true;
        var command = this.currentCommand;
        egret.setTimeout(function () {
            if (_this._frozen) {
                _this._frozen = false;
            }
        }, this, 2000);
        if (command) {
            command.cancel(function () {
                console.log("cancel");
                _this._frozen = false;
            });
            this._list = [];
        }
    };
    p.execute = function () {
        var _this = this;
        this.isFinishedFlag = false;
        if (this._frozen) {
            egret.setTimeout(this.execute, this, 100);
            return;
        }
        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command);
            command.execute(function () {
                _this.execute();
            });
        }
        else {
            console.log("全部命令执行完毕");
            this.isFinishedFlag = true;
        }
    };
    return CommandList;
}());
egret.registerClass(CommandList,'CommandList');
//# sourceMappingURL=CommandList.js.map
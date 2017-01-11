var SenceService = (function () {
    function SenceService() {
        this.observerList = [];
        SenceService.count++;
        if (SenceService.count > 1) {
            throw 'singleton!!';
        }
    }
    var d = __define,c=SenceService,p=c.prototype;
    SenceService.getInstance = function () {
        if (SenceService.instance == null) {
            SenceService.instance = new SenceService();
        }
        return SenceService.instance;
    };
    p.addObserver = function (_observer) {
        this.observerList.push(_observer);
    };
    p.notify = function (_monsterId) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(_monsterId);
        }
    };
    SenceService.count = 0;
    return SenceService;
}());
egret.registerClass(SenceService,'SenceService');
var KillMonsterButton = (function (_super) {
    __extends(KillMonsterButton, _super);
    function KillMonsterButton(_monsterId, _monsterMapPosX, _monsterMapPosY) {
        _super.call(this);
        this.monsterId = _monsterId;
        this.button = this.createBitmapByName("Kill_png");
        this.addChild(this.button);
        this.onButtonClick(_monsterId);
        this.monsterMapPosX = _monsterMapPosX;
        this.monsterMapPosY = _monsterMapPosY;
    }
    var d = __define,c=KillMonsterButton,p=c.prototype;
    p.onChange = function () {
    };
    p.onButtonClick = function (_monsterId) {
        var _this = this;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("Monster Kill Tap");
            if (GameScene.commandList.isFinishedFlag) {
                _this.getWalkCommand();
            }
            else {
                GameScene.commandList.cancel();
                _this.getWalkCommand();
            }
        }, this);
    };
    p.getWalkCommand = function () {
        GameScene.sceneFindRoad(this.monsterMapPosX, this.monsterMapPosY);
        for (var i = 0; i < GameScene.sceneRoad.length; i++) {
            GameScene.commandList.addCommand(new WalkCommand(GameScene.sceneRoad[i].x * GameScene.TILESIZE + GameScene.TILESIZE / 2, GameScene.sceneRoad[i].y * GameScene.TILESIZE + GameScene.TILESIZE / 2));
        }
        GameScene.commandList.addCommand(new FightCommand(this.monsterId));
        GameScene.commandList.execute();
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return KillMonsterButton;
}(egret.DisplayObjectContainer));
egret.registerClass(KillMonsterButton,'KillMonsterButton',["Observer"]);
//# sourceMappingURL=SenceService.js.map
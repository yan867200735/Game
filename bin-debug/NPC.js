var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(_id, _npcMapPosX, _npcMapPosY) {
        _super.call(this);
        this.id = _id;
        this.npcMapPosX = _npcMapPosX;
        this.npcMapPosY = _npcMapPosY;
        this.emoji = this.createBitmapByName(_id + "_nullIcon_png");
        console.log("Building " + _id);
        this.addChild(this.emoji);
        this.dialoguePanel = new DialoguePanel(this.id);
        this.addChild(this.dialoguePanel);
        this.dialoguePanel.alpha = 0;
        this.dialoguePanel.x = this.x - this.width / 5; //-108 , 300
        this.dialoguePanel.y = this.y + 300;
        this.onNpcClick();
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onChange = function (_task) {
        //var changeTask = _task;  ///changeTask 可以获取外部变化的task
        if (_task.fromNpcId == this.id && _task.toNpcId != this.id) {
            if (_task.status == 2) {
                this.npcStatus = NpcStatus.NULLICON;
                this.removeChild(this.emoji);
                this.changeImage();
            }
        }
        else if (_task.toNpcId == this.id) {
            if (_task.status == TaskStatus.DURING) {
                this.npcStatus = NpcStatus.DURING;
                this.removeChild(this.emoji);
                this.changeImage();
            }
            if (_task.status == TaskStatus.CAN_SUBMIT) {
                this.npcStatus = NpcStatus.READY_FOR_SUBMITTED;
                this.removeChild(this.emoji);
                this.changeImage();
            }
            if (_task.status == TaskStatus.SUBMITTED) {
                this.npcStatus = NpcStatus.NULLICON;
                this.removeChild(this.emoji);
                this.changeImage();
            }
            if (_task.nextTask != null) {
                if (_task.status == TaskStatus.SUBMITTED && _task.nextTask.status == TaskStatus.ACCEPTABLE) {
                    this.npcStatus = NpcStatus.READY_FOR_ACCEPT;
                    this.removeChild(this.emoji);
                    this.changeImage();
                }
            }
        }
        else {
        }
        console.log(this.id + " change");
    };
    p.initNpcTask = function (_npc) {
        var menu = TaskService.getInstance();
        menu.getTaskByCustomRule(function sortForNpc(taskInfo) {
            for (var t in taskInfo) {
                //console.log(taskInfo[t].fromNpcId);
                //console.log(taskInfo[t].toNpcId);
                if (taskInfo[t].fromNpcId == _npc.id || taskInfo[t].toNpcId == _npc.id) {
                    if (taskInfo[t].fromNpcId == _npc.id && taskInfo[t].status == 1) {
                        _npc.npcStatus = NpcStatus.READY_FOR_ACCEPT;
                        _npc.changeImage();
                    }
                }
            }
        });
    };
    p.npcRespendCommand = function () {
        //var isNeed = GameScene.needMovetoNpc(this.npcMapPosX, this.npcMapPosY);
        //  if (isNeed) {
        GameScene.sceneFindRoad(this.npcMapPosX, this.npcMapPosY);
        for (var i = 0; i < GameScene.sceneRoad.length; i++) {
            GameScene.commandList.addCommand(new WalkCommand(GameScene.sceneRoad[i].x * GameScene.TILESIZE + GameScene.TILESIZE / 2, GameScene.sceneRoad[i].y * GameScene.TILESIZE + GameScene.TILESIZE / 2));
        }
        //}
        GameScene.commandList.addCommand(new TalkCommand(this.dialoguePanel));
        GameScene.commandList.execute();
    };
    p.onNpcClick = function () {
        var _this = this;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("Tap_" + _this.id);
            if (GameScene.commandList.isFinishedFlag) {
                _this.npcRespendCommand();
            }
            else {
                GameScene.commandList.cancel();
                _this.npcRespendCommand();
            }
        }, this);
    };
    p.changeImage = function () {
        if (this.npcStatus == NpcStatus.NULLICON) {
            this.emoji = this.createBitmapByName(this.id + "_nullIcon_png");
            this.addChild(this.emoji);
        }
        if (this.npcStatus == NpcStatus.READY_FOR_ACCEPT) {
            this.emoji = this.createBitmapByName(this.id + "_taskAcceptable_png");
            this.addChild(this.emoji);
        }
        if (this.npcStatus == NpcStatus.DURING) {
            this.emoji = this.createBitmapByName(this.id + "_taskDuring_png");
            this.addChild(this.emoji);
        }
        if (this.npcStatus == NpcStatus.READY_FOR_SUBMITTED) {
            this.emoji = this.createBitmapByName(this.id + "_taskFinish_png");
            this.addChild(this.emoji);
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
var NpcStatus;
(function (NpcStatus) {
    NpcStatus[NpcStatus["NULLICON"] = 0] = "NULLICON";
    NpcStatus[NpcStatus["READY_FOR_ACCEPT"] = 1] = "READY_FOR_ACCEPT";
    NpcStatus[NpcStatus["DURING"] = 2] = "DURING";
    NpcStatus[NpcStatus["READY_FOR_SUBMITTED"] = 3] = "READY_FOR_SUBMITTED";
})(NpcStatus || (NpcStatus = {}));
//# sourceMappingURL=NPC.js.map
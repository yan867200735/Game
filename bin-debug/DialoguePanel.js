var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(_npcid) {
        _super.call(this);
        this.endTalkFlag = false;
        this.visible = false;
        this.dialoguePanelBg = this.createBitmapByName("DialogueBg_png");
        this.addChild(this.dialoguePanelBg);
        this.btn_Accept = this.createBitmapByName("Accept_png");
        this.addChild(this.btn_Accept);
        this.btn_Accept.x = 140;
        this.btn_Accept.y = 100;
        this.btn_Accept.$setTouchEnabled(true);
        this.btn_Finish = this.createBitmapByName("Finish_png");
        this.addChild(this.btn_Finish);
        this.btn_Finish.x = 0;
        this.btn_Finish.y = 100;
        this.btn_Finish.$setTouchEnabled(true);
        this.btn_Close = this.createBitmapByName("Close_s_png");
        this.addChild(this.btn_Close);
        this.btn_Close.x = 220;
        this.btn_Close.y = 0;
        this.btn_Close.$setTouchEnabled(true);
        this.currentTask = new egret.TextField();
        this.initDialog(_npcid, this.currentTask);
        this.onDialogPanelClicked(_npcid);
        //this.dialoguePanelBg.x = this.x - this.width/5;  //-108 , 300
        //this.dialoguePanelBg.y = this.y + 300;
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.initDialog = function (_npcid, _currentText) {
        //_currentText.text = "Wait for init"
        _currentText.text = "";
        this.addChild(_currentText);
        _currentText.x = 0;
        var menu = TaskService.getInstance();
        menu.getTaskByCustomRule(function sortForNpc(taskInfo) {
            for (var t in taskInfo) {
                //console.log(taskInfo[t].fromNpcId);
                //console.log(taskInfo[t].toNpcId);
                if (taskInfo[t].fromNpcId == _npcid || taskInfo[t].toNpcId == _npcid) {
                    _currentText.text += "Task: " + taskInfo[t].id + "\n"; //+ " Status: " + taskInfo[t].status + "\n";
                }
            }
        });
    };
    p.onDialogPanelClicked = function (_npcid) {
        var _this = this;
        this.dialoguePanelBg.$setTouchEnabled(true);
        this.dialoguePanelBg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("DialogBGClick");
        }, this);
        this.btn_Close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("Close");
            _this.visible = false;
            _this.endTalkFlag = true;
        }, this);
        this.btn_Accept.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.initDialog(_npcid, _this.currentTask);
            var menu = TaskService.getInstance();
            menu.getTaskByCustomRule(function sortForNpc(taskInfo) {
                for (var t in taskInfo) {
                    //console.log(taskInfo[t].fromNpcId);
                    //console.log(taskInfo[t].toNpcId);
                    if (taskInfo[t].fromNpcId == _npcid && taskInfo[t].status == TaskStatus.ACCEPTABLE) {
                        TaskService.getInstance().accept(t); //////////////////////
                        console.log("Accept Successed");
                    }
                    else {
                        console.log(taskInfo[t].id + " is Unavaliable Now");
                    }
                }
            });
        }, this);
        this.btn_Finish.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.initDialog(_npcid, _this.currentTask);
            var menu = TaskService.getInstance();
            menu.getTaskByCustomRule(function sortForNpc(taskInfo) {
                for (var t in taskInfo) {
                    //console.log(taskInfo[t].fromNpcId);
                    //console.log(taskInfo[t].toNpcId);
                    /*
                                        if (taskInfo[t].toNpcId == _npcid && taskInfo[t].status == TaskStatus.DURING) {
                                            console.log("Task Unfinished");
                                        }
                    */
                    if (taskInfo[t].toNpcId == _npcid && taskInfo[t].status == TaskStatus.CAN_SUBMIT) {
                        TaskService.getInstance().finish(t); /////////////////////////
                        console.log("Finish Successed");
                    }
                    else {
                        console.log("Task Unfinished");
                    }
                }
            });
        }, this);
    };
    return DialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialoguePanel,'DialoguePanel');
//# sourceMappingURL=DialoguePanel.js.map
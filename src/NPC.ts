class NPC extends egret.DisplayObjectContainer implements Observer {

    private emoji: egret.Bitmap;

    public id: string;

    private npcStatus: NpcStatus;

    private dialoguePanel: DialoguePanel;

    private npcMapPosX;

    private npcMapPosY;

    constructor(_id: string, _npcMapPosX: number, _npcMapPosY: number) {

        super();

        this.id = _id;
        this.npcMapPosX = _npcMapPosX;
        this.npcMapPosY = _npcMapPosY;

        this.emoji = this.createBitmapByName(_id + "_nullIcon_png");
        console.log("Building " + _id)
        this.addChild(this.emoji);



        this.dialoguePanel = new DialoguePanel(this.id);

        this.addChild(this.dialoguePanel);
        this.dialoguePanel.alpha = 0;
        this.dialoguePanel.x = this.x - this.width / 5;  //-108 , 300
        this.dialoguePanel.y = this.y + 300;

        this.onNpcClick();

    }


    onChange(_task: Task) {
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



        } else {


        }
        console.log(this.id + " change");
    }

    public initNpcTask(_npc: NPC) {

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
    }





    private npcRespendCommand() {
        //var isNeed = GameScene.needMovetoNpc(this.npcMapPosX, this.npcMapPosY);
      //  if (isNeed) {
            GameScene.sceneFindRoad(this.npcMapPosX, this.npcMapPosY);
            for (var i = 0; i < GameScene.sceneRoad.length; i++) {

                GameScene.commandList.addCommand(new WalkCommand(
                    GameScene.sceneRoad[i].x * GameScene.TILESIZE + GameScene.TILESIZE / 2,
                    GameScene.sceneRoad[i].y * GameScene.TILESIZE + GameScene.TILESIZE / 2));
            }

        //}
        GameScene.commandList.addCommand(new TalkCommand(this.dialoguePanel))

        GameScene.commandList.execute();
    }


    private onNpcClick() {

        this.touchEnabled = true;
        
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            console.log("Tap_" + this.id);




            if (GameScene.commandList.isFinishedFlag) {
                this.npcRespendCommand();


            } else {
                GameScene.commandList.cancel();
                this.npcRespendCommand();

            }

        }, this);


    }

    private changeImage() {
        if (this.npcStatus == NpcStatus.NULLICON) {

            this.emoji = this.createBitmapByName(this.id + "_nullIcon_png");
            this.addChild(this.emoji)
        }

        if (this.npcStatus == NpcStatus.READY_FOR_ACCEPT) {
            this.emoji = this.createBitmapByName(this.id + "_taskAcceptable_png");
            this.addChild(this.emoji)
        }

        if (this.npcStatus == NpcStatus.DURING) {
            this.emoji = this.createBitmapByName(this.id + "_taskDuring_png");
            this.addChild(this.emoji)
        }

        if (this.npcStatus == NpcStatus.READY_FOR_SUBMITTED) {
            this.emoji = this.createBitmapByName(this.id + "_taskFinish_png");
            this.addChild(this.emoji)
        }
    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}

enum NpcStatus {
    NULLICON = 0,
    READY_FOR_ACCEPT = 1,
    DURING = 2,
    READY_FOR_SUBMITTED = 3
}
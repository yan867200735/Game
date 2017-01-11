
interface Command {

    execute(callback: Function): void;

    cancel(callback: Function): void;

}

class WalkCommand implements Command {
    private x;
    private y;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    execute(callback: Function): void {
        GameScene.getCurrentScene().moveTo(this.x, this.y, function () {
            callback();
        })
    }

    cancel(callback: Function) {
        GameScene.getCurrentScene().stopMove(function () {
            callback();
        })
    }
}

class FightCommand implements Command {
    /**
     * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
     */
    private monsterId: string;

    constructor(_monsterId) {

        this.monsterId = _monsterId;
    }
    private _hasBeenCancelled = false;

    execute(callback: Function): void {

        console.log("开始战斗");
        var atkMonsterId = this.monsterId
        var menu = TaskService.getInstance();
        menu.getTaskByCustomRule(function sortForMonster(taskInfo) {

            for (var t in taskInfo) {
                if (taskInfo[t].condition.tragetMonsterId == atkMonsterId && taskInfo[t].status == TaskStatus.DURING) {

                    SenceService.getInstance().notify(atkMonsterId);
                    taskInfo[t].condition.updateProgress(taskInfo[t]);

                }
            }
        }
        )
        console.log("结束战斗")
        callback();

    }

    cancel(callback: Function) {
        console.log("脱离战斗")
        this._hasBeenCancelled = true;
        egret.setTimeout(function () {
            callback();
        }, this, 100)

    }
}

class TalkCommand implements Command {
    private targetPanel: DialoguePanel;
    constructor(_targetPanel: DialoguePanel) {
        this.targetPanel = _targetPanel;
    }
    execute(callback: Function): void {
        if (this.targetPanel.endTalkFlag) {
            console.log("结束对话")
            this.targetPanel.endTalkFlag = false;
            callback();
            return
        }

        console.log("打开对话框")
        this.targetPanel.alpha = 0;
        this.targetPanel.visible = true;
        var panelTw = egret.Tween.get(this.targetPanel);
        panelTw.to({ "alpha": 1 }, 600);
        this.targetPanel.touchEnabled = true;





    }

    cancel(callback: Function) {
        this.targetPanel.visible = false;
        console.log("关闭对话框");
        
    }
}

class SenceService {

    private observerList: SenceObserver[] = [];

    private static instance;
    private static count = 0;



    constructor() {
        SenceService.count++;
        if (SenceService.count > 1) {
            throw 'singleton!!';
        }
    }



    public static getInstance() {
        if (SenceService.instance == null) {
            SenceService.instance = new SenceService();
        }
        return SenceService.instance;
    }

    public addObserver(_observer: SenceObserver): void {

        this.observerList.push(_observer);

    }



    private notify(_monsterId: string): void {

        for (var i = 0; i < this.observerList.length; i++) {

            this.observerList[i].onChange(_monsterId);
        }
    }

}


class KillMonsterButton extends egret.DisplayObjectContainer implements Observer {

    private monsterId: string;
    private button: egret.Bitmap;
    private monsterMapPosX: number;
    private monsterMapPosY: number;

    constructor(_monsterId: string, _monsterMapPosX: number, _monsterMapPosY) {

        super();

        this.monsterId = _monsterId;

        this.button = this.createBitmapByName("Kill_png");
        this.addChild(this.button);
        this.onButtonClick(_monsterId);

        this.monsterMapPosX = _monsterMapPosX;
        this.monsterMapPosY = _monsterMapPosY;
    }

    onChange() {


    }

    onButtonClick(_monsterId: string) {
        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {

            console.log("Monster Kill Tap");



            if (GameScene.commandList.isFinishedFlag) {
                this.getWalkCommand();


            } else {
                GameScene.commandList.cancel();
                this.getWalkCommand();

            }



        }, this);

    }

    private getWalkCommand() {
        GameScene.sceneFindRoad(this.monsterMapPosX, this.monsterMapPosY);

        for (var i = 0; i < GameScene.sceneRoad.length; i++) {

            GameScene.commandList.addCommand(new WalkCommand(
                GameScene.sceneRoad[i].x * GameScene.TILESIZE + GameScene.TILESIZE / 2,
                GameScene.sceneRoad[i].y * GameScene.TILESIZE + GameScene.TILESIZE / 2));
        }

        GameScene.commandList.addCommand(new FightCommand(this.monsterId));
        GameScene.commandList.execute();

    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}


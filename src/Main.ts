//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    private static TILESIZE = 64;
    private pointx: number;
    private pointy: number;

    /**
     * 加载进度界面
     * Process interface loading
     */




    private loadingView: LoadingUI;

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private initTaskSystem(stageH: number, stageW: number) {
        var task02 = new Task("002", "Kill 4 pigs", "Tap button",
            "npc_1", "npc_1", TaskStatus.UNACCEPTABLE, new KillMonsterTaskCondition("B27"), 4, null)

        var task01 = new Task("001", "Welcome to the World of Warcraft", "Click the whiteMan",
            "npc_0", "npc_1", TaskStatus.ACCEPTABLE, new NPCTalkTaskCondition(), 1, task02);

        var monster_0 = new KillMonsterButton("B27",0,stageH / 2);
        this.addChild(monster_0);
        monster_0.scaleX = 0.5;
        monster_0.scaleY = 0.5;
        monster_0.x = 0;
        monster_0.y = stageH / 2;

        TaskService.getInstance().addTask(task01);
        TaskService.getInstance().addTask(task02);
        var missionPanel = new TaskPanel();
        this.addChild(missionPanel);

        var npc_0 = new NPC("npc_0", stageW / 4, stageH / 2);
        this.addChild(npc_0);
        npc_0.scaleX = 0.5;
        npc_0.scaleY = 0.5;
        npc_0.x = stageW / 4;
        npc_0.y = stageH / 2;


        var npc_1 = new NPC("npc_1", stageW / 2.5, stageH / 4);
        this.addChild(npc_1);
        npc_1.scaleX = 0.5;
        npc_1.scaleY = 0.5;
        npc_1.x = stageW / 2.5;
        npc_1.y = stageH / 4;//在myMap 进行监听，如果点击位置位于NPC放置位置的周围，则在添加移动命令后，追加打开面板命令。

        TaskService.getInstance().addObserver(npc_0);
        TaskService.getInstance().addObserver(npc_1);
        TaskService.getInstance().addObserver(missionPanel);

        npc_0.initNpcTask(npc_0);
        npc_1.initNpcTask(npc_1);
        //missionPanel.initTaskPanel(missionPanel);


        var updateTaskPanel = new egret.Timer(500, 0)
        updateTaskPanel.start();

        updateTaskPanel.addEventListener(egret.TimerEvent.TIMER, () => {
            missionPanel.initTaskPanel(missionPanel);
        }, this);
    }

    private initUserPanel() {
        var user = new User();

        var skilledTechnician = new Technician(TechnicianQuality.SKILLED, 'Skilled - FireCtrl');

        var SKC34 = new Equipment(EquipmentType.CANNON, 'SKC34');

        var PrinzEugen = new Ship(ShipType.CA, 'PrinzEugen');



        user.ships.push(PrinzEugen);
        PrinzEugen.setInTeam(true);
        user.checkInTeam();

        PrinzEugen.equipments.push(SKC34);

        SKC34.technicians.push(skilledTechnician);

        console.log(user);
        console.log(user.calFightPower());
        var showPanel = new ShowPanel(this.stage.stageWidth, this.stage.stageHeight, PrinzEugen, SKC34, skilledTechnician);
        showPanel.x = 0;
        showPanel.y = 640;

        this.addChild(showPanel);
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {

        var myscene = new GameScene();
        GameScene.replaceScene(myscene);

        var myGrid = GameScene.sceneGrid;

        var myRoad = GameScene.sceneRoad;

        var myMap = GameScene.sceneMap;
        this.addChild(myMap);

        var player = new Player();
        this.addChild(player);
        player.x = 32;
        player.y = 32;
        GameScene.setPlayer(player);
        this.touchEnabled = true;

        //this.stage
        myMap.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {

            var disNpc_0 = Math.sqrt(Math.pow(e.stageX - 640 / 4, 2) + Math.pow(e.stageY - 1236 / 2, 2));
            var disNpc_1 = Math.sqrt(Math.pow(e.stageX - 640 / 2.5, 2) + Math.pow(e.stageY - 1236 / 4, 2));

            function getWalkCommand() {
                console.log("tap_px " + e.stageX + "," + e.stageY);
                myMap.grid.setEndPoint(Math.floor(e.stageX / Main.TILESIZE), Math.floor(e.stageY / Main.TILESIZE));
                myMap.grid.setStartPoint(Math.floor(player.x / Main.TILESIZE), Math.floor(player.y / Main.TILESIZE));
                myRoad = myMap.findPath();
                if (myRoad == null) {

                    console.log("error tap stay");
                    return
                }
                
                if (disNpc_0 <= 4) {

                    console.log("NPC_0 around")
                }

                if (disNpc_1 <= 4) {

                    console.log("NPC_1 around")

                }
                
                for (var i = 0; i < myRoad.length; i++) {

                    GameScene.commandList.addCommand(new WalkCommand(myRoad[i].x * Main.TILESIZE + Main.TILESIZE / 2,
                        myRoad[i].y * Main.TILESIZE + Main.TILESIZE / 2));
                }
                GameScene.commandList.execute();
            }


            if (GameScene.commandList.isFinishedFlag) {
                getWalkCommand();


            } else {
                GameScene.commandList.cancel();
                getWalkCommand();
                
            }


        }, this);

        this.initTaskSystem(this.stage.stageWidth, this.stage.stageHeight);
        this.initUserPanel();
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 切换描述内容
     * Switch to described content
     
    private changeDescription(textfield: egret.TextField, textFlow: Array<egret.ITextElement>): void {
        textfield.textFlow = textFlow;
    }
     */
}




var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/Animation.js",
	"bin-debug/Astar.js",
	"bin-debug/Command.js",
	"bin-debug/CommandList.js",
	"bin-debug/DialoguePanel.js",
	"bin-debug/Equipment.js",
	"bin-debug/Grid.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Map.js",
	"bin-debug/MissionPanel.js",
	"bin-debug/MoveCtrl.js",
	"bin-debug/NPC.js",
	"bin-debug/Observer.js",
	"bin-debug/Panel.js",
	"bin-debug/Player.js",
	"bin-debug/Point.js",
	"bin-debug/Property.js",
	"bin-debug/Sence.js",
	"bin-debug/SenceService.js",
	"bin-debug/Ship.js",
	"bin-debug/StateMachine.js",
	"bin-debug/Task.js",
	"bin-debug/TaskService.js",
	"bin-debug/Technician.js",
	"bin-debug/User.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1236,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};
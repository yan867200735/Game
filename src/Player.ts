var PLAYER_SPEED = 0.2;

class Player extends egret.DisplayObjectContainer {
    appearance: egret.Bitmap;
    fsm: StateMachine;

    _moveState:MoveState;
    _idelState:IdleState;

    posX: number;
    posY: number;
    curAnimation: Animation;
    
    isLeftFacing = false;
    animationList;

    /*
        PlayerIdle_Left: egret.Texture[] = new Array();
        PlayerIdle_Right: egret.Texture[] = new Array();
    
        PlayerWalk_Left: egret.Texture[] = new Array();
        PlayerWalk_Right: egret.Texture[] = new Array();
    */
    speed: number;


    constructor() {
        super();
        this.speed = PLAYER_SPEED;
        this.appearance = new egret.Bitmap();
        this.appearance.height = 93;
        this.appearance.width = 60;
        this.appearance.scaleX = 0.55;
        this.appearance.scaleY = 0.55;
        this.appearance.anchorOffsetX = 30;
        this.appearance.anchorOffsetY = 42;


        
        this.animationList = {
            "idle_left": ["idel1_L_png", "idel2_L_png", "idel3_L_png", "idel4_L_png"],
            "idle_right": ["idel1_R_png", "idel2_R_png", "idel3_R_png", "idel4_R_png"],
            "walk_left": ["move1_L_png", "move2_L_png", "move3_L_png", "move4_L_png"],
            "walk_right": ["move1_R_png", "move2_R_png", "move3_R_png", "move4_R_png"]
        };

        //this.LoadPlayer();
        this.fsm = new StateMachine(new IdleState(this));
        egret.startTick(this.fsm.runMachine, this.fsm);
        this.addChild(this.appearance);

    }

    move(location: Vector2) {
        this._moveState = new MoveState(this, location)
        this.fsm.switchState(this._moveState );
    }


    createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /*
        private LoadPlayer() {
            for (var i = 0; i < 4; i++) {
    
                this.PlayerIdle_Left[i] =
                    RES.getRes("idel" + (i + 1) + "_L_png");
            }
            for (var i = 0; i < 4; i++) {
    
                this.PlayerWalk_Left[i] =
                    RES.getRes("move" + (i + 1) + "_L_png");
    
            }
    
            for (var i = 0; i < 4; i++) {
    
                this.PlayerIdle_Right[i] =
                    RES.getRes("idel" + (i + 1) + "_R_png");
            }
            for (var i = 0; i < 4; i++) {
    
                this.PlayerWalk_Right[i] =
                    RES.getRes("move" + (i + 1) + "_R_png");
            }
        }
    
        public Animate(bit: egret.Bitmap, playMod: number, playerAnimation: egret.Texture[]) {
            var frame = 0;
            var animateFrame = 0;
            egret.Ticker.getInstance().register(() => {
    
                if (frame % 8 == 0) {
                    bit.texture = playerAnimation[animateFrame];
                    animateFrame++;
                    if (animateFrame >= playMod) {
    
                        animateFrame = 0;
    
                    }
                }
                frame++;
                if (frame >= playMod * 10) {
    
                    frame = 0;
                }
            }, this);
        }
        */
}
class IdleState implements State {

    private Onidel: boolean = true;
    player: Player;

    StateName = "Idle";

    public constructor(player: Player) {
        this.player = player;

    }

    EnterState() {

        this.Onidel = true;
        this.player.curAnimation = new Animation(this.player.animationList[this.player.isLeftFacing ? "idle_left" : "idle_right"],
            this.player.appearance,4);
    }


    DuringState(pass: number) {

        this.player.curAnimation.playCurcularly(pass);


    }

    ExitState() {
        this.Onidel = false;

    }

    GetState() {

        return this;
    }
}

class MoveState implements State {
    player: Player;
    private OnMove: boolean = false;
    playerlocation: Vector2;
    StateName = "Move";
    public isOnposition = false;

    constructor(player: Player, location: Vector2) {
        this.player = player;
        this.playerlocation = location;
        this.player.isLeftFacing = ((location.x - this.player.x) > 0 ? false : true);

    }
    EnterState() {
        this.isOnposition = false;
        GameScene.canMovetoNext = false;
        
        console.log("walk from:" + this.player.x.toFixed(1) + "  " + this.player.y.toFixed(1)
            + ", to:" + this.playerlocation.x.toFixed(1) + "  " + this.playerlocation.y.toFixed(1));
        //this.player.curAnimation
        //var nowFacing=this.player.isLeftFacing;

        this.player.curAnimation = new Animation(this.player
        .animationList[this.player.isLeftFacing ? "walk_left" : "walk_right"], this.player.appearance, 4);

        var funcChange = function (): void {
            //console.log(this.x);
        }
        var tween = egret.Tween.get(this.player, { onChange: funcChange, onChangeObj: this.player });

        tween.to({
            x: this.playerlocation.x,
            y: this.playerlocation.y
        }, Math.sqrt(
            Math.pow((this.playerlocation.x - this.player.x), 2) +
            Math.pow((this.playerlocation.y - this.player.y), 2)
        ) / this.player.speed, egret.Ease.sineInOut);

/*
        if (this.player.x == this.playerlocation.x && this.player.y == this.playerlocation.y) {
            this.isOnposition = true;
            console.log("Get Target Location");
        }
        */
    }


    DuringState(pass: number) {
        this.player.curAnimation.playCurcularly(pass);
    }

    ExitState() {
        this.OnMove = false;
        this.isOnposition = true;
        console.log("Get Target Location");
        GameScene.canMovetoNext = true;
       // egret.Tween.removeTweens(this.player);
    }

    GetState(): State {
        if (Math.abs(this.player.x - this.playerlocation.x) < 1) {
            return new IdleState(this.player);
        } else {
            return this;
        }
    }
}
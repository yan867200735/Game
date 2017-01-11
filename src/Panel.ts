class ShowPanel extends egret.DisplayObjectContainer {

    private role: egret.Bitmap;
    private equipment_1: egret.Bitmap;
    private equipment_2: egret.Bitmap;
    private equipment_3: egret.Bitmap;
    private equipment_4: egret.Bitmap;

    private equipmentInfo: egret.TextField;
    private allInfo: egret.TextField;
    
    public static all: egret.TextField = new egret.TextField();
    public static detailed: egret.TextField = new egret.TextField();

    constructor(_width: number, _height: number, owner: Ship, _equip: Equipment, _techni: Technician) {


        super();
        this.width = _width;
        this.height = _height;

        this.role = this.createBitmapByName("S_Prinz Eugen_jpg");
        this.addChild(this.role);
        //
        this.equipment_1 = this.createBitmapByName("S_SKC34_png");
        this.addChild(this.equipment_1);
        this.equipment_1.x = this.role.width;

        this.equipment_2 = this.createBitmapByName("S_Setuper_png");
        this.addChild(this.equipment_2);
        this.equipment_2.x = this.width - this.equipment_2.width;
        /*
              this.equipment_3 = this.createBitmapByName("S_Watcher_png");
              this.addChild(this.equipment_3);
              this.equipment_3.x = this.role.width;
              this.equipment_3.y = this.equipment_1.height;
              //
              this.equipment_4 = this.createBitmapByName("S_Setuper_png");
              this.addChild(this.equipment_4);
              this.equipment_4.x = this.width - this.equipment_2.width;
              this.equipment_4.y = this.equipment_1.height;
      */
        this.onClickEquipment_1(this.equipment_1, _equip);
        this.onClickEquipment_2(this.equipment_2, _techni);
        // this.onClickEquipment_3(this.equipment_3);
        // this.onClickEquipment_4(this.equipment_4);

        this.allInfo = new egret.TextField();
        this.allInfo.width = this.role.width;
        this.allInfo.y = this.role.height;
        this.addChild(this.allInfo);
        this.allInfo.text = ("All----------------------|");

        this.equipmentInfo = new egret.TextField();
        this.equipmentInfo.x = this.role.width;
        this.equipmentInfo.y = this.role.height;
        this.equipmentInfo.width = this.equipment_1.width * 2;
        this.addChild(this.equipmentInfo);
        this.equipmentInfo.text = ("Equiment------------------------|");

        this.updateAllInfo(owner)
    }

    private posConfirm(_isAll, _container: egret.DisplayObjectContainer) {
        if (_isAll) {

            _container.y = this.role.height + this.equipmentInfo.height;
        } else {
            _container.x = this.role.width;
            _container.y = this.role.height + this.equipmentInfo.height;
        }

    }

    private updateAllInfo(owner: Ship) {

        var container = owner.disPlayDetail();
        this.addChild(container);
        this.posConfirm(true, container);
    }

    public updateEquimentInfo(_equipmentNum: number, Equipment: any) {
        switch (_equipmentNum) {
            case 1:
                var container = Equipment.disPlayDetail();
                this.addChild(container);
                this.posConfirm(false, container);
                break;
            case 2:
                var container = Equipment.disPlayDetail();
                this.addChild(container);
                this.posConfirm(false, container);
                break;
            //case 3:
            //case 4:
        }
    }

    private onClickEquipment_1(Bitmap: egret.Bitmap, _equip: Equipment) {

        Bitmap.touchEnabled = true;

        Bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            
            this.updateEquimentInfo(1, _equip)
            console.log("Tap Equipment_1");
        }, this);


    }
    private onClickEquipment_2(Bitmap: egret.Bitmap, _techni: Technician) {

        Bitmap.touchEnabled = true;

        Bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {

            this.updateEquimentInfo(2, _techni)
            console.log("Tap Equipment_2");
        }, this);
    }
    /*
    private onClickEquipment_3(Bitmap: egret.Bitmap) {

        Bitmap.touchEnabled = true;

        Bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {


            console.log("Tap Equipment_3");
        }, this);


    }
    private onClickEquipment_4(Bitmap: egret.Bitmap) {

        Bitmap.touchEnabled = true;

        Bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {


            console.log("Tap Equipment_4");
        }, this);


    }
    */
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}
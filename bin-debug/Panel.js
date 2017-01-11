var ShowPanel = (function (_super) {
    __extends(ShowPanel, _super);
    function ShowPanel(_width, _height, owner, _equip, _techni) {
        _super.call(this);
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
        this.updateAllInfo(owner);
    }
    var d = __define,c=ShowPanel,p=c.prototype;
    p.posConfirm = function (_isAll, _container) {
        if (_isAll) {
            _container.y = this.role.height + this.equipmentInfo.height;
        }
        else {
            _container.x = this.role.width;
            _container.y = this.role.height + this.equipmentInfo.height;
        }
    };
    p.updateAllInfo = function (owner) {
        var container = owner.disPlayDetail();
        this.addChild(container);
        this.posConfirm(true, container);
    };
    p.updateEquimentInfo = function (_equipmentNum, Equipment) {
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
        }
    };
    p.onClickEquipment_1 = function (Bitmap, _equip) {
        var _this = this;
        Bitmap.touchEnabled = true;
        Bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.updateEquimentInfo(1, _equip);
            console.log("Tap Equipment_1");
        }, this);
    };
    p.onClickEquipment_2 = function (Bitmap, _techni) {
        var _this = this;
        Bitmap.touchEnabled = true;
        Bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.updateEquimentInfo(2, _techni);
            console.log("Tap Equipment_2");
        }, this);
    };
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
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    ShowPanel.all = new egret.TextField();
    ShowPanel.detailed = new egret.TextField();
    return ShowPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(ShowPanel,'ShowPanel');
//# sourceMappingURL=Panel.js.map
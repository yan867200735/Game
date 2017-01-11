var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Cache = function (target, propertyKey, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        console.log(target, propertyKey);
        var cacheKey = "__cache" + propertyKey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this);
        }
        return target[cacheKey];
    };
    return descriptor;
};
var EquipmentType;
(function (EquipmentType) {
    EquipmentType[EquipmentType["CANNON"] = 1.4] = "CANNON";
    EquipmentType[EquipmentType["RADAR"] = 1.1] = "RADAR";
})(EquipmentType || (EquipmentType = {}));
var Equipment = (function () {
    function Equipment(_equipmentType, _name) {
        this.technicians = [];
        this.name = _name;
        this.equipmentType = _equipmentType;
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.getAttack = function () {
        var result = 0;
        this.technicians.forEach(function (t) { return result += t.calFightPower(); });
        return result;
    };
    //@Cache
    p.getStatus = function () {
        return Properties.getInstance().equipmentProperty[EquipmentPropertyName.equipment_Status].value
            + Properties.getInstance().equipmentProperty[EquipmentPropertyName.equipment_Strengthen].value;
    };
    p.calFightPower = function () {
        return this.getAttack() + this.getStatus() * this.equipmentType;
    };
    p.disPlayDetail = function () {
        ShowPanel.detailed.text = "";
        ShowPanel.detailed.text = "Attack: + " + this.getAttack().toString() + "\n"
            + "Current_Status: + " + this.getStatus().toString() + "\n"
            + "FightPower: + " + this.calFightPower().toString() + "\n";
        return PropertiesDisplayFactory.createAllDescription(Properties.getInstance().equipmentProperty, ShowPanel.detailed);
    };
    __decorate([
        Cache
    ], p, "getAttack", null);
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
//# sourceMappingURL=Equipment.js.map
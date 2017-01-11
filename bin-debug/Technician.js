var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TechnicianQuality;
(function (TechnicianQuality) {
    TechnicianQuality[TechnicianQuality["GREEN_HAND"] = 1.2] = "GREEN_HAND";
    TechnicianQuality[TechnicianQuality["SKILLED"] = 1.4] = "SKILLED";
})(TechnicianQuality || (TechnicianQuality = {}));
var Technician = (function () {
    function Technician(_technicianQuality, _name) {
        this.name = _name;
        this.technicianQuality = _technicianQuality;
        // this.attack = this.getAttack();
    }
    var d = __define,c=Technician,p=c.prototype;
    p.getAttack = function () {
        return Properties.getInstance().technicianProperty[TechnicianPropertyName.technician_Status].value * this.technicianQuality;
    };
    //@Cache
    p.calFightPower = function () {
        return this.getAttack() * 1.4 + Properties.getInstance().technicianProperty[TechnicianPropertyName.technician_Level].value * 2;
    };
    p.disPlayDetail = function () {
        ShowPanel.detailed.text = "";
        ShowPanel.detailed.text = "Attack: + " + this.getAttack().toString() + "\n" + "FightPower: + " + this.calFightPower().toString() + "\n";
        return PropertiesDisplayFactory.createAllDescription(Properties.getInstance().technicianProperty, ShowPanel.detailed);
    };
    __decorate([
        Cache
    ], p, "getAttack", null);
    return Technician;
}());
egret.registerClass(Technician,'Technician');
//return property.name + ": + " + property.value + "\n"; 
//# sourceMappingURL=Technician.js.map
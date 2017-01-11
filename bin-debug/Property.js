var ShipPropertyName;
(function (ShipPropertyName) {
    ShipPropertyName[ShipPropertyName["ship_Level"] = 0] = "ship_Level";
    ShipPropertyName[ShipPropertyName["ship_Hp"] = 1] = "ship_Hp";
    ShipPropertyName[ShipPropertyName["ship_Speed"] = 2] = "ship_Speed";
    ShipPropertyName[ShipPropertyName["ship_Type_CA"] = 3] = "ship_Type_CA";
})(ShipPropertyName || (ShipPropertyName = {}));
var TechnicianPropertyName;
(function (TechnicianPropertyName) {
    ////
    TechnicianPropertyName[TechnicianPropertyName["technician_Level"] = 0] = "technician_Level";
    TechnicianPropertyName[TechnicianPropertyName["technician_Exp"] = 1] = "technician_Exp";
    TechnicianPropertyName[TechnicianPropertyName["technician_TotalExp"] = 2] = "technician_TotalExp";
    TechnicianPropertyName[TechnicianPropertyName["technician_Status"] = 3] = "technician_Status";
    TechnicianPropertyName[TechnicianPropertyName["technician_Quality_GREEN_HAND"] = 4] = "technician_Quality_GREEN_HAND";
    TechnicianPropertyName[TechnicianPropertyName["technician_Quality_SKILLED"] = 5] = "technician_Quality_SKILLED";
})(TechnicianPropertyName || (TechnicianPropertyName = {}));
var EquipmentPropertyName;
(function (EquipmentPropertyName) {
    ////
    EquipmentPropertyName[EquipmentPropertyName["equipment_Status"] = 0] = "equipment_Status";
    EquipmentPropertyName[EquipmentPropertyName["equipment_Strengthen"] = 1] = "equipment_Strengthen";
    EquipmentPropertyName[EquipmentPropertyName["equipment_EquipmentType_CANNON"] = 2] = "equipment_EquipmentType_CANNON";
    EquipmentPropertyName[EquipmentPropertyName["equipment_EquipmentType_RADAR"] = 3] = "equipment_EquipmentType_RADAR";
})(EquipmentPropertyName || (EquipmentPropertyName = {}));
var Property = (function () {
    function Property(name, value, isRate) {
        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }
    var d = __define,c=Property,p=c.prototype;
    return Property;
}());
egret.registerClass(Property,'Property');
var Properties = (function () {
    function Properties() {
        this.technicianProperty = [
            //Technician
            new Property("Level", 1, false),
            new Property("Exp", 0, false),
            new Property("TotalExp", 0, false),
            new Property("Basic_Status", 25, false),
            // new Property("technician_Quality_GREEN_HAND", TechnicianQuality.GREEN_HAND, false),
            new Property("Quality_SKILLED", TechnicianQuality.SKILLED, false),
        ];
        this.equipmentProperty = [
            //Equipment
            new Property("Basic_Status", 25, false),
            new Property("Strengthen", 1, false),
        ];
        this.shipProperty = [
            //new Property("ATK", 100, false),
            //new Property("DEF", 50, false),
            //new Property("BOOM", 501, true)
            //Ship
            new Property("Level", 1, false),
            new Property("Hp", 50, false),
            new Property("Speed", 10, false),
            new Property("Type_CA", ShipType.CA, false),
        ];
        Properties.count++;
        if (Properties.count > 1) {
            throw 'singleton!!';
        }
    }
    var d = __define,c=Properties,p=c.prototype;
    Properties.getInstance = function () {
        if (Properties.instance == null) {
            Properties.instance = new Properties();
        }
        return Properties.instance;
    };
    Properties.count = 0;
    return Properties;
}());
egret.registerClass(Properties,'Properties');
var PropertiesDisplayFactory = (function () {
    function PropertiesDisplayFactory() {
    }
    var d = __define,c=PropertiesDisplayFactory,p=c.prototype;
    PropertiesDisplayFactory.getDescription = function (property, color) {
        if (property.isRate) {
            var textColor = property.value >= 500 ? "red" : "green";
            return property.name + ": + <red>" + (property.value / 10).toFixed(2) + "</red>%";
        }
        else {
            return property.name + ": + " + property.value + "\n";
        }
    };
    PropertiesDisplayFactory.createAllDescription = function (property, _textField) {
        var container = new egret.DisplayObjectContainer();
        //var tf = new egret.TextField();
        _textField.size = (25);
        for (var _i = 0, property_1 = property; _i < property_1.length; _i++) {
            var p = property_1[_i];
            //tf.text = "ATK: " + hero.properties.atk.toString();
            _textField.text += PropertiesDisplayFactory.getDescription(p); //Use this 
            container.addChild(_textField);
        }
        return container;
    };
    return PropertiesDisplayFactory;
}());
egret.registerClass(PropertiesDisplayFactory,'PropertiesDisplayFactory');
//# sourceMappingURL=Property.js.map
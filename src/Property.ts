enum ShipPropertyName {
    ship_Level = 0,
    ship_Hp = 1,
    ship_Speed = 2,
    ship_Type_CA = 3,


}

enum TechnicianPropertyName {

    ////
    technician_Level = 0,
    technician_Exp = 1,
    technician_TotalExp = 2,
    technician_Status = 3,
    technician_Quality_GREEN_HAND = 4,
    technician_Quality_SKILLED = 5,

}

enum EquipmentPropertyName {
    ////
    equipment_Status = 0,
    equipment_Strengthen = 1,
    equipment_EquipmentType_CANNON = 2,
    equipment_EquipmentType_RADAR = 3

}

class Property {

    constructor(name: string, value: number, isRate: boolean) {
        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }

    name: string;

    value: number;

    isRate: boolean;


}


class Properties {

    private static instance;
    private static count = 0;



    constructor() {
        Properties.count++;
        if (Properties.count > 1) {
            throw 'singleton!!';
        }
    }



    public static getInstance() {
        if (Properties.instance == null) {
            Properties.instance = new Properties();
        }
        return Properties.instance;
    }
    public technicianProperty: Property[] = [

        //Technician
        new Property("Level", 1, false),
        new Property("Exp", 0, false),
        new Property("TotalExp", 0, false),
        new Property("Basic_Status", 25, false),
        // new Property("technician_Quality_GREEN_HAND", TechnicianQuality.GREEN_HAND, false),
        new Property("Quality_SKILLED", TechnicianQuality.SKILLED, false),
    ]

    public equipmentProperty: Property[] = [

        //Equipment
        new Property("Basic_Status", 25, false),
        new Property("Strengthen", 1, false),
        //new Property("equipment_EquipmentType_CANNON", EquipmentType.CANNON, false),
        //new Property("equipment_EquipmentType_RADAR", EquipmentType.RADAR, false),

    ]

    public shipProperty: Property[] = [
        //new Property("ATK", 100, false),
        //new Property("DEF", 50, false),
        //new Property("BOOM", 501, true)

        //Ship
        new Property("Level", 1, false),
        new Property("Hp", 50, false),
        new Property("Speed", 10, false),
        new Property("Type_CA", ShipType.CA, false),

    ]
}

class PropertiesDisplayFactory {

    static getDescription(property: Property, color?) {
        if (property.isRate) {
            var textColor = property.value >= 500 ? "red" : "green";
            return property.name + ": + <red>" + (property.value / 10).toFixed(2) + "</red>%";
        }
        else {
            return property.name + ": + " + property.value + "\n";
        }

    }


    static createAllDescription(property: Property[], _textField: egret.TextField) {
        var container = new egret.DisplayObjectContainer();
        //var tf = new egret.TextField();
        
        _textField.size = (25);
        for (var p of property) {

            //tf.text = "ATK: " + hero.properties.atk.toString();
            _textField.text += PropertiesDisplayFactory.getDescription(p);    //Use this 
            container.addChild(_textField);
        }
        return container;
    }
}
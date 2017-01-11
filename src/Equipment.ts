
var Cache: MethodDecorator = (target: any, propertyKey, descriptor: PropertyDescriptor) => {

    const method = descriptor.value;

    descriptor.value = function () {
        console.log(target, propertyKey);

        var cacheKey = "__cache" + propertyKey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this);
        }

        return target[cacheKey];
    }
    return descriptor;
}



enum EquipmentType {

    CANNON = 1.4,

    RADAR = 1.1

}
class Equipment {



    name: string;
    /*
        status = 25;//装备耐久
    
        strengthen = 1;//强化程度
    */
    equipmentType: EquipmentType;//装备类型

    technicians: Technician[] = [];

    constructor(_equipmentType: EquipmentType, _name: string) {
        this.name = _name;
        this.equipmentType = _equipmentType;
    }

    @Cache
    getAttack() {
        var result = 0;
        this.technicians.forEach(t => result += t.calFightPower());
        return result;
    }

    //@Cache
    getStatus() {
        return Properties.getInstance().equipmentProperty[EquipmentPropertyName.equipment_Status].value
            + Properties.getInstance().equipmentProperty[EquipmentPropertyName.equipment_Strengthen].value;
    }


    calFightPower() {
        return this.getAttack() + this.getStatus() * this.equipmentType;
    }

    public disPlayDetail() {
        ShowPanel.detailed.text = "";
        ShowPanel.detailed.text = "Attack: + " + this.getAttack().toString() + "\n" 
        + "Current_Status: + " + this.getStatus().toString() + "\n"
        + "FightPower: + " + this.calFightPower().toString() + "\n" ;
        return  PropertiesDisplayFactory.createAllDescription(Properties.getInstance().equipmentProperty, ShowPanel.detailed)
    }

}



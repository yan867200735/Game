enum TechnicianQuality {

    GREEN_HAND = 1.2,

    SKILLED = 1.4

}

class Technician {


    name: string;
    /*
        level = 1; //人员等级
    
        exp = 0;//人员经验
    
        totalExp = 0;//人员经验上限
    
        status = 25;//人员疲劳值上限
    */
    technicianQuality: TechnicianQuality;//人员水准

    constructor(_technicianQuality: TechnicianQuality, _name: string) {
        this.name = _name;
        this.technicianQuality = _technicianQuality;
        // this.attack = this.getAttack();
    }

    @Cache
    getAttack() {
        return Properties.getInstance().technicianProperty[TechnicianPropertyName.technician_Status].value * this.technicianQuality;
    }

    //@Cache
    calFightPower() {
        return this.getAttack() * 1.4 + Properties.getInstance().technicianProperty[TechnicianPropertyName.technician_Level].value * 2;
    }

    public disPlayDetail() {
        ShowPanel.detailed.text = "";
        ShowPanel.detailed.text = "Attack: + " + this.getAttack().toString() + "\n" + "FightPower: + " + this.calFightPower().toString() + "\n";
        return PropertiesDisplayFactory.createAllDescription(Properties.getInstance().technicianProperty, ShowPanel.detailed)
    }

}
//return property.name + ": + " + property.value + "\n";
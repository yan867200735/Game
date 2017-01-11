class User {
    level = 0;
    exp = 0;
    totalExp = 0;
    cash = 0;
    gold = 0;

    fightPower = 0;



    ships: Ship[] = [];

    shipsInTeam: Ship[] = [];


    constructor() {
        this.checkInTeam();
    }

    public checkInTeam() {
        this.shipsInTeam = this.ships.filter(ship => ship.isInTeam);
    }

    /*
        get shipsInTeam() {
    
            return this.ships.filter(ship => ship.isInTeam);
        }
    */


    calFightPower() {

        var result = 0;
        this.shipsInTeam.map(ship => result += ship.calFightPower());
        //result += this.pet.calFightPower();
        return Math.floor(result);
    }

   


}


var User = (function () {
    function User() {
        this.level = 0;
        this.exp = 0;
        this.totalExp = 0;
        this.cash = 0;
        this.gold = 0;
        this.fightPower = 0;
        this.ships = [];
        this.shipsInTeam = [];
        this.checkInTeam();
    }
    var d = __define,c=User,p=c.prototype;
    p.checkInTeam = function () {
        this.shipsInTeam = this.ships.filter(function (ship) { return ship.isInTeam; });
    };
    /*
        get shipsInTeam() {
    
            return this.ships.filter(ship => ship.isInTeam);
        }
    */
    p.calFightPower = function () {
        var result = 0;
        this.shipsInTeam.map(function (ship) { return result += ship.calFightPower(); });
        //result += this.pet.calFightPower();
        return Math.floor(result);
    };
    return User;
}());
egret.registerClass(User,'User');
//# sourceMappingURL=User.js.map
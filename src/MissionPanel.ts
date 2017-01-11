class TaskPanel extends egret.DisplayObjectContainer implements Observer {

    private textField: egret.TextField;

    //private btn_Accept: egret.Bitmap;
    //private btn_Finish: egret.Bitmap;
    

    constructor() {
        super();
        this.textField = new egret.TextField();
        this.textField.text = "Wait for Init";
        this.addChild(this.textField);
        console.log("Building TaskPanel")
        /*
        this.btn_Accept = this.createBitmapByName("Accept_png");
        this.addChild(this.btn_Accept)
        this.btn_Accept.x = 640 * (1/8);
        this.btn_Accept.y = 70;

        this.btn_Finish = this.createBitmapByName("Finish_png");
        this.addChild(this.btn_Finish)
        this.btn_Finish.x = 640 * (3/8);
        this.btn_Finish.y = 70;
*/
        



    }
    onChange() {
        console.log("Panel Change");
    }


    public initTaskPanel(_taskPanel: TaskPanel) {
        _taskPanel.textField.text = "";

        var menu = TaskService.getInstance();

        menu.getTaskByCustomRule(function sortForPanel(taskInfo) {

            for (var t in taskInfo) {
                
                _taskPanel.textField.text += "Task name: " + (taskInfo[t].name + "\n" +"Task describe: " + taskInfo[t].describe) + "\nTask ID: " + taskInfo[t].id 
                + "\nTask Status: " + taskInfo[t].status +"\n";
                //
                
            }
        });
        this.addChild(this.textField);
    }



    private onButtonClick() {



    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
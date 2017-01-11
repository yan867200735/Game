class TaskService implements Observer {
    private observerList: Observer[] = [];



    private taskList: {

        [index: string]: Task

    } = {};

    private static instance;
    private static count = 0;



    constructor() {
        TaskService.count++;
        if (TaskService.count > 1) {
            throw 'singleton!!';
        }
    }



    public static getInstance() {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    }



    private getTaskByCustomRule(rule: Function): Task {

        return rule(this.taskList);

    }

    onChange(task:Task) {
        this.notify(task);
    }



    public finish(id: string): ErrorCode {
        if (id == null) {
            return ErrorCode.NULLTASK_ID;
        }

        var task = this.taskList[id];

        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }

        task.onFinish(task);
        console.log(task.name + " TaskService Info Finish!");
        
        return ErrorCode.SUCCESSED;
    }

/*
    public readyToSubmit(id: string) {
        if (id == null) {
            return ErrorCode.NULLTASK_ID;
        }

        var task = this.taskList[id];

        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }

        task.status = TaskStatus.CAN_SUBMIT;
        console.log(task.name + " Mission Ready to Submit!");
        this.notify(task);
        return ErrorCode.SUCCESSED;
    }
*/
    
        public accept(id: string): ErrorCode {
            if (id == null) {
                return ErrorCode.NULLTASK_ID;
            }
    
            var task = this.taskList[id];
    
            if (task == null) {
                return ErrorCode.MISSING_TASK;
            }
            
            task.onAccept(task);
            console.log(task.name + " TaskService Info Accept!");
            
            return ErrorCode.SUCCESSED;
    
        }
    


    public addTask(task: Task) {

        this.taskList[task.id] = task;

    }


    public addObserver(_observer: Observer): void {

        this.observerList.push(_observer);

    }



    private notify(task: Task): void {

        for (var i = 0; i < this.observerList.length; i++) {

            this.observerList[i].onChange(task);
        }
    }
}

enum ErrorCode {
    SUCCESSED = 0,
    MISSING_TASK = 1,
    NULLTASK_ID = 2

}
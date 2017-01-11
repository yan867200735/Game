enum TaskStatus {

    UNACCEPTABLE = 0,
    ACCEPTABLE = 1,
    DURING = 2,
    CAN_SUBMIT = 3,
    SUBMITTED = 4

}

class Task implements TaskConditionContext {
    public id: string;

    public name: string;

    public describe: string;

    public status: TaskStatus;

    public fromNpcId: string;

    public toNpcId: string;

    public current: number;

    public total: number;

    public condition: TaskCondition;

    private observerList: Observer[] = [];

    public nextTask: Task;

    constructor(_id: string, _name: string, _describe, _fromNpcId: string, _toNpcId: string,
        _status: TaskStatus, _condition: TaskCondition, _total: number, _nextTask: Task) {

        this.id = _id;

        this.name = _name;

        this.describe = _describe;

        this.fromNpcId = _fromNpcId;

        this.toNpcId = _toNpcId;

        this.status = _status;

        this.condition = _condition;

        this.addObserver(TaskService.getInstance());

        this.nextTask = _nextTask;

        this.total = _total;

        this.current = 0;
    }

    getCurrent() {
        return this.current;
    }

    currentPlus() {
        this.current++;
    }

    checkStatus() {
        console.log("Progress: " + this.current + " / " + this.total);
        if (this.current >= this.total) {
            this.onReadyToSubmit(this);
            console.log("Progress is finished !");
        } else {
            console.log("Progress is not finished yet ");
        }
    }

    private addObserver(_observer: Observer): void {

        this.observerList.push(_observer);

    }

    private notify(task: Task): void {

        for (var i = 0; i < this.observerList.length; i++) {

            this.observerList[i].onChange(task);
        }
    }




    public onAccept(task: Task): ErrorCode {


        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }

        task.status = TaskStatus.DURING;
        console.log(task.name + " Mission Accept!");

        this.notify(task);
        this.condition.acceptProgress(this);

        // this.checkStatus();

        return ErrorCode.SUCCESSED;

    }

    private onReadyToSubmit(task: Task) {

        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }

        task.status = TaskStatus.CAN_SUBMIT;
        console.log(task.name + " Mission Ready to Submit!");
        this.notify(task);
        return ErrorCode.SUCCESSED;
    }

    public onFinish(task: Task): ErrorCode {

        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }

        task.status = TaskStatus.SUBMITTED;
        if (task.nextTask != null) {
            task.nextTask.status = TaskStatus.ACCEPTABLE;
        }
        console.log(task.name + " Mission Successed!");
        this.notify(task);
        

        return ErrorCode.SUCCESSED;
    }

}

interface TaskConditionContext {

    getCurrent();

    currentPlus();

    checkStatus();


}

class TaskCondition {

    acceptProgress(_taskConditionContext: TaskConditionContext) {
    }

    updateProgress(_taskConditionContext: TaskConditionContext) {
    }

}


class NPCTalkTaskCondition extends TaskCondition {

    acceptProgress(_taskConditionContext: TaskConditionContext) {
        _taskConditionContext.currentPlus();
        _taskConditionContext.checkStatus();
    }

    updateProgress(_taskConditionContext: TaskConditionContext) {

    }


}

class KillMonsterTaskCondition extends TaskCondition implements SenceObserver {

    public tragetMonsterId: string;

    constructor(_tragetMonsterId: string) {
        super();
        this.tragetMonsterId = _tragetMonsterId;
        SenceService.getInstance().addObserver(this);
    }


    acceptProgress(_taskConditionContext: TaskConditionContext) {

    }

    public updateProgress(_taskConditionContext: TaskConditionContext) {
        console.log("Kill confirm - updateProgress");
        _taskConditionContext.currentPlus();
        _taskConditionContext.checkStatus();
    }


    onChange(_monsterId: string) {
        if (_monsterId == this.tragetMonsterId) {
            console.log("That is one kill");
        }

    }


}
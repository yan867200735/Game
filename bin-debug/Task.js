var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
var Task = (function () {
    function Task(_id, _name, _describe, _fromNpcId, _toNpcId, _status, _condition, _total, _nextTask) {
        this.observerList = [];
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
    var d = __define,c=Task,p=c.prototype;
    p.getCurrent = function () {
        return this.current;
    };
    p.currentPlus = function () {
        this.current++;
    };
    p.checkStatus = function () {
        console.log("Progress: " + this.current + " / " + this.total);
        if (this.current >= this.total) {
            this.onReadyToSubmit(this);
            console.log("Progress is finished !");
        }
        else {
            console.log("Progress is not finished yet ");
        }
    };
    p.addObserver = function (_observer) {
        this.observerList.push(_observer);
    };
    p.notify = function (task) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(task);
        }
    };
    p.onAccept = function (task) {
        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }
        task.status = TaskStatus.DURING;
        console.log(task.name + " Mission Accept!");
        this.notify(task);
        this.condition.acceptProgress(this);
        // this.checkStatus();
        return ErrorCode.SUCCESSED;
    };
    p.onReadyToSubmit = function (task) {
        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }
        task.status = TaskStatus.CAN_SUBMIT;
        console.log(task.name + " Mission Ready to Submit!");
        this.notify(task);
        return ErrorCode.SUCCESSED;
    };
    p.onFinish = function (task) {
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
    };
    return Task;
}());
egret.registerClass(Task,'Task',["TaskConditionContext"]);
var TaskCondition = (function () {
    function TaskCondition() {
    }
    var d = __define,c=TaskCondition,p=c.prototype;
    p.acceptProgress = function (_taskConditionContext) {
    };
    p.updateProgress = function (_taskConditionContext) {
    };
    return TaskCondition;
}());
egret.registerClass(TaskCondition,'TaskCondition');
var NPCTalkTaskCondition = (function (_super) {
    __extends(NPCTalkTaskCondition, _super);
    function NPCTalkTaskCondition() {
        _super.apply(this, arguments);
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    p.acceptProgress = function (_taskConditionContext) {
        _taskConditionContext.currentPlus();
        _taskConditionContext.checkStatus();
    };
    p.updateProgress = function (_taskConditionContext) {
    };
    return NPCTalkTaskCondition;
}(TaskCondition));
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition');
var KillMonsterTaskCondition = (function (_super) {
    __extends(KillMonsterTaskCondition, _super);
    function KillMonsterTaskCondition(_tragetMonsterId) {
        _super.call(this);
        this.tragetMonsterId = _tragetMonsterId;
        SenceService.getInstance().addObserver(this);
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.acceptProgress = function (_taskConditionContext) {
    };
    p.updateProgress = function (_taskConditionContext) {
        console.log("Kill confirm - updateProgress");
        _taskConditionContext.currentPlus();
        _taskConditionContext.checkStatus();
    };
    p.onChange = function (_monsterId) {
        if (_monsterId == this.tragetMonsterId) {
            console.log("That is one kill");
        }
    };
    return KillMonsterTaskCondition;
}(TaskCondition));
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["SenceObserver"]);
//# sourceMappingURL=Task.js.map
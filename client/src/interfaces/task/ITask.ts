export interface ITask {
    id: number;
    title: string;
    dueBy: Date;
    priority: string;
}

interface ITaskMeta {
    current: number;
    limit: number;
    count: number;
}

export interface ITasks {
    tasks: Array<ITask>;
    meta: ITaskMeta
}
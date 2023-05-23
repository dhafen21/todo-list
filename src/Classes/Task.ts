export type Task = {
    description: string;
    completed: boolean;
    subtasks: Subtask[];
}

export type Subtask = {
    description: string;
    completed: boolean;
}
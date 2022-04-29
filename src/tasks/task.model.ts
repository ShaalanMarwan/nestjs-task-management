export interface Task {
  id: string;
  title: string;
  description: string;
  status: TasksStatusEnum;
}

export enum TasksStatusEnum {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

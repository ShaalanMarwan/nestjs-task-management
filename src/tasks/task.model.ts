export interface Task {
  id: string;
  title: string;
  description: string;
  status: TasksEnum;
}

export enum TasksEnum {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

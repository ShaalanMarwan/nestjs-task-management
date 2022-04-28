export interface Task {
  id: string;
  title: string;
  description: string;
  status: TasksEnum;
}

enum TasksEnum {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

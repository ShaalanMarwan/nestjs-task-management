import { TasksStatusEnum } from 'src/tasks/task.model';

export class UpdateTaskDto {
  status: TasksStatusEnum;
}

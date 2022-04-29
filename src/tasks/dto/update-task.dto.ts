import { IsEnum } from 'class-validator';
import { TasksStatusEnum } from 'src/tasks/task.model';

export class UpdateTaskDto {
  @IsEnum(TasksStatusEnum)
  status: TasksStatusEnum;
}

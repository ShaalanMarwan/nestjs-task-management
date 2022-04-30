import { IsEnum } from 'class-validator';
import { TasksStatusEnum } from 'src/tasks/task-status.enum';

export class UpdateTaskDto {
  @IsEnum(TasksStatusEnum)
  status: TasksStatusEnum;
}

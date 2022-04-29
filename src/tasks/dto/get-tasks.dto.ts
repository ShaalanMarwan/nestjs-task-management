import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TasksStatusEnum } from 'src/tasks/task.model';

export class GetTasksDto {
  @IsOptional()
  @IsEnum(TasksStatusEnum)
  status?: TasksStatusEnum;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  q?: string;
}

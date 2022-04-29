import { TasksStatusEnum } from 'src/tasks/task.model';

export class GetTasksDto {
  status?: TasksStatusEnum;
  q?: string;
}

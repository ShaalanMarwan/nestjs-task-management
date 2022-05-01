import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksDto } from 'src/tasks/dto/get-tasks.dto';
import { TasksStatusEnum } from 'src/tasks/task-status.enum';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto: GetTasksDto): Promise<Task[]> {
        const { q, status } = filterDto;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (q) {
            //   'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', //case insensitive
            query.andWhere(
                'task.title LIKE :search OR task.description LIKE :search', //case sensitive
                {
                    search: `%${q}%`,
                },
            );
        }
        const tasks = await query.getMany();
        return tasks;
    }
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TasksStatusEnum.OPEN,
            user,
        });
        await this.save(task);
        return task;
    }
}

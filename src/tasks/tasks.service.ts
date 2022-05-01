import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksDto } from 'src/tasks/dto/get-tasks.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { TasksStatusEnum } from 'src/tasks/task-status.enum';
import { Task } from 'src/tasks/task.entity';
import { TaskRepository } from 'src/tasks/task.repository';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getTasks(filterDto: GetTasksDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: string, @GetUser() user: User): Promise<Task> {
        // const found = await this.taskRepository.findOne(id);
        const found = await this.taskRepository.findOne({
            where: { id, user },
        });
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto, user: User) {
        const task = await this.getTaskById(id, user);
        task.status = updateTaskDto?.status ?? task.status;
        await this.taskRepository.save(task);
        return task;
    }
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }
    async deleteTask(id: string, user: User): Promise<void> {
        const deletedTask = await this.taskRepository.delete({ id, user });

        if (deletedTask.affected !== 1) {
            throw new NotFoundException();
        }
        return;
    }
}

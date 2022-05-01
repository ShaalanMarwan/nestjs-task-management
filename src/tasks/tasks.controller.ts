import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksDto } from 'src/tasks/dto/get-tasks.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task } from 'src/tasks/task.entity';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
        return this.tasksService.createTask(createTaskDto, user);
    }
    @Get()
    getTasks(
        @Query() filterDto: GetTasksDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }
    @Get(':id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }
    @Delete(':id')
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }
    @Patch(':id')
    updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.updateTask(id, updateTaskDto, user);
    }
}

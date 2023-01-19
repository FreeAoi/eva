import { Injectable, NotFoundException } from '@nestjs/common';

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { TaskService } from '../../../modules/task/task.service';

@ValidatorConstraint({ name: 'TaskExists', async: true })
@Injectable()
export class TaskExists implements ValidatorConstraintInterface {
    constructor(private taskService: TaskService) {}

    async validate(taskId: number): Promise<boolean> {
        const student = await this.taskService.getTask(taskId);
        if (!student) throw new NotFoundException(`Task with id ${taskId} not found`);
        return true;
    }
}

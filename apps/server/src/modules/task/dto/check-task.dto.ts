/* eslint-disable indent */
import { Type } from 'class-transformer';
import { Validate } from 'class-validator';
import { TaskExists } from '../../../common/validation/taskExists';

export class CheckTaskDTO {
    @Validate(TaskExists)
    @Type(() => Number)
    taskId: number;
}

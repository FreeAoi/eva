/* eslint-disable indent */
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AttachmentEntity } from '../../../providers/database/entities/attachment.entity';
import { TaskEntity } from '../../../providers/database/entities/task.entity';
import { TaskSubmissionEntity } from '../../../providers/database/entities/taskSubmission.entity';
import { TeacherEntity } from '../../../providers/database/entities/teacher.entity';

export class TeacherSubmissionDTO extends PickType(TeacherEntity, [
    'firstName',
    'lastName',
] as const) {}
export class AttachmentSubmissionDTO extends PickType(AttachmentEntity, [
    'name',
    'url',
] as const) {}
export class StudentSubmissionDTO extends PickType(TaskSubmissionEntity, [
    'id',
    'score',
    'comment',
    'createdAt',
    'updatedAt',
    'qualified',
    'studentId',
] as const) {
    @ApiProperty({
        description: 'Task submission attachments',
        type: [AttachmentSubmissionDTO],
    })
    @Expose()
    attachments: AttachmentSubmissionDTO[];

    @ApiProperty({
        description: 'Teacher who qualified the submission',
        type: TeacherSubmissionDTO,
    })
    @Expose()
    teacher: TeacherSubmissionDTO | null;

    constructor(submission: Partial<StudentSubmissionDTO>) {
        super();
        Object.assign(this, submission);
    }
}

export class TaskDTO extends PickType(TaskEntity, [
    'id',
    'title',
    'dueDate',
    'maxScore',
] as const) {
    @ApiProperty({
        description: 'Task submission',
        type: [StudentSubmissionDTO],
        nullable: true,
    })
    @Expose()
    submissions: StudentSubmissionDTO[] | null;

    constructor(task: Partial<TaskDTO>) {
        super();
        Object.assign(this, task);
    }
}

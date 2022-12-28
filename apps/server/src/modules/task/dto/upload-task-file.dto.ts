import type { Multipart } from '@fastify/multipart';

export default class CreateTaskDTO {
    // different files
    [key: string]: Multipart;
}

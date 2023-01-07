import {
    CallHandler,
    ExecutionContext,
    mixin,
    NestInterceptor,
    Type
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { MultipartFile, MultipartValue } from '@fastify/multipart';
import type { FastifyRequest } from 'fastify';

export function FilesInterceptor(): Type<NestInterceptor> {
    class MixinInterceptor implements NestInterceptor {
        async intercept(
            context: ExecutionContext,
            next: CallHandler
        ): Promise<Observable<unknown>> {
            const ctx = context.switchToHttp();
            const request = ctx.getRequest<FastifyRequest>();

            const files = [];
            const body: Record<string, unknown> = {};
            for await (const part of request.parts()) {
                if ((part as MultipartFile).file) {
                    const partFile = part as MultipartFile;
                    files.push({
                        fieldname: partFile.fieldname,
                        filename: partFile.filename,
                        encoding: partFile.encoding,
                        mimetype: partFile.mimetype,
                        stream: partFile.file.read()
                    });
                } else {
                    const field = part as MultipartValue;
                    body[field.fieldname] = field.value;
                }
            }

            //@ts-ignore
            request.files = files;
            request.body = body;

            return next.handle();
        }
    }
    const Interceptor = mixin(MixinInterceptor);
    return Interceptor as Type<NestInterceptor>;
}

export interface FileUpload {
    fieldname: string;
    filename: string;
    encoding: string;
    mimetype: string;
    stream: Buffer;
}

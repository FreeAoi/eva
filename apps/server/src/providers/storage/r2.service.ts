import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

@Injectable()
export class R2Service extends S3Client implements OnModuleInit {
    private readonly logger = new Logger(R2Service.name);
    constructor(@Inject('OPTIONS') options: S3ClientConfig) {
        super(options);
    }

    async onModuleInit() {
        this.logger.log('StorageService initialized');
    }

    async uploadFile(file: Buffer, fileName: string) {
        return await this.send(
            new PutObjectCommand({
                Bucket: 'eva-uni',
                Key: fileName,
                Body: file
            })
        );
    }
}

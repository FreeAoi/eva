/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class AcessTokenDTO {
    @ApiProperty({
        description: 'JWT Access token',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE1NjY3MzQ2MjAsImV4cCI6MTU2NjczNjQyMH0.9lQfJFVgJOxUx8Hr6pJZrjD7v1IgA6M7yf2jyXUz0xU',
    })
    access_token: string;
}

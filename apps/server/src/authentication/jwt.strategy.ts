import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StudentsService } from '../modules/students/students.service';

interface JWTPayload {
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private studentsService: StudentsService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: JWTPayload) {
        const user = await this.studentsService.getStudentByEmail(
            payload.email
        );
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

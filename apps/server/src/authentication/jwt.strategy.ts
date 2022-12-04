import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StudentService } from '../modules/students/student.service';

interface JWTPayload {
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private studentService: StudentService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: JWTPayload) {
        const user = await this.studentService.getStudentByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

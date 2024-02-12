import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }
    
    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) return {
                ...user,
                password: undefined
            }
        }

        throw new Error('Email address or password provided is incorrect.')
    }

    login(user: User) {
        return {
            access_token: this.jwtService.sign({
                sub: user.id,
                email: user.email,
                name: user.name
            }),
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        }
    }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private service: UsersService,
        private jwtService: JwtService
    ) {}

    public async validateUser(id: number, password: string) : Promise<User> {
        const user = this.service.getById(id);
        if(bcrypt.compare(password, (await user).password)){
            return user;
        }
        else return undefined
    }
    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

import { Controller, Get, Body, Post, Delete, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService
    ) {}

    @Get()
    public async getAll(){
       return await this.service.getAll();
    }

    @Get(':id')
        
        public async getById(@Param() parameter): Promise<User> {
            const user = await this.service.getById(parameter.id);
            if(user == undefined) throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return user;
        }

    @Post()
        public async create(@Body() input: any): Promise<User> {
            const user = await this.service.create(input.lastname, input.firstname, input.age);
            return user;
        }

    @Put(':id')
        public async modifyUser(@Param() parameter, @Body() input: any): Promise<User> {
            const user = await this.service.modifyUser(parameter.id, input.lastname, input.firstname, input.age);
            if(user == undefined) throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return user;
        }

    @Delete(':id')
        public async deleteUser(@Param() parameter): Promise<boolean>{
            const success = await this.service.deleteUser(parameter.id);
            if(!success) throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return success;
        }
        
}

import { Controller, Get, Body, Post, Delete, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';
import { User } from 'src/users/users.entity';


@Controller('associations')
export class AssociationsController {

    constructor(
        private service: AssociationsService
    ) {}

    @Get()
    getAll(){
       return this.service.getAll();
    }

    @Get(':id/members')
        public async getMembers(@Param() parameter): Promise<User[]> {
            return await this.service.getMembers(parameter.id);
        }

    @Get(':id')
        
        public async getById(@Param() parameter): Promise<Association> {
            const association = await this.service.getById(parameter.id);
            if(association == undefined) throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return association;
        }

    @Post()
        public async create(@Body() input: any): Promise<Association> {
            const user = await this.service.createAssociation(input.idUsers, input.name);
            return user;
        }

    @Put(':id')
        public async modifyUser(@Param() parameter, @Body() input: any): Promise<Association> {
            const association = await this.service.modifyAssociation(parameter.id, input.idUsers, input.name);
            if(association == undefined) throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return association;
        }

    @Delete(':id')
        public async deleteUser(@Param() parameter): Promise<boolean>{
            const success = await this.service.deleteAssociation(parameter.id);
            if(!success) throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return success;
        }
        
}

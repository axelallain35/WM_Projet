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
        getMembers(@Param() parameter): User[] {
            return this.service.getMembers(parameter.id);
        }

    @Get(':id')
        
        getById(@Param() parameter): Association {
            const association = this.service.getById(parameter.id);
            if(association == undefined) throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return association;
        }

    @Post()
        create(@Body() input: any): Association {
            const user = this.service.createAssociation(input.idUsers, input.name);
            return user;
        }

    @Put(':id')
        modifyUser(@Param() parameter, @Body() input: any): Association {
            const association = this.service.modifyAssociation(parameter.id, input.idUsers, input.name);
            if(association == undefined) throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return association;
        }

    @Delete(':id')
        deleteUser(@Param() parameter): boolean{
            const success = this.service.deleteAssociation(parameter.id);
            if(!success) throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return success;
        }
        
}

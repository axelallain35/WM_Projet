import { Controller, Get, Put, Post, Delete, Param, HttpStatus, HttpException, Body } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { RoleInput } from './role.input';

@Controller('role')
export class RoleController {

    constructor(
        private service: RoleService
    ) {}

    @Get()
    public async getAll(){
       return await this.service.getAll();
    }


    @Get('/:idUser/:idAssoc')
        public async getById(@Param() param): Promise<Role> {
            const role = await this.service.getById(param.idUser,param.idAssoc);
            if(role == undefined) throw new HttpException(`Could not find a role for the user ${param.idUser} in the association ${param.idAssoc}`, HttpStatus.NOT_FOUND);
            return role;
        }


    @Post()
        public async create(@Body() input: RoleInput): Promise<Role> {
            const role = await this.service.create(input.name, input.idUser, input.idAssociation);
            return role;
        }

    @Put('/:idUser/:idAssoc')
        public async modifyRole(@Param() param, @Body() input: any): Promise<Role> {
            const role = await this.service.modifyRole(param.idUser, param.idAssoc, input.name, input.idUser, input.idAssociation);
            if(role == undefined) throw new HttpException(`Could not find a role for the user ${param.idUser} in the association ${param.idAssoc}`, HttpStatus.NOT_FOUND);
            return role;
        }

    @Delete('/:idUser/:idAssoc')
        public async deleteRole(@Param() parameter): Promise<boolean>{
            const success = await this.service.deleteUser(parameter.idUser, parameter.idAssoc);
            if(!success) throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return success;
        }
}

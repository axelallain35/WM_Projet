import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { AssociationsService } from 'src/associations/associations.service';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private repository: Repository<Role>,
        private UsersService: UsersService,
        private AssociationsService: AssociationsService
    ) {}

    public async getAll(): Promise<Role[]> {
        return await this.repository.find();
    }

    public async getById(idUserToFind: number, idAssocToFind: number): Promise<Role> {
        const result = await this.repository.find({
            where: {
                idUser: await this.UsersService.getById(idUserToFind),
                idAssociation: await this.AssociationsService.getById(idAssocToFind),
            },
         });
        return result[0];
    }

    public async create(param_idUser: number, param_idAssoc: number, param_name: string): Promise<Role> {
        const User = await this.UsersService.getById(param_idUser);
        const Association = await this.AssociationsService.getById(param_idAssoc);
        const role = await this.repository.create({
            idUser: User,
            idAssociation: Association,
            name: param_name
        });
        this.repository.save(role);
        return role;
    }

    public async modifyRole(idUserToFind: number, idAssoc: number, param_name: string, param_idUser: number, param_idAssoc: number): Promise<Role> {
        if(param_name !== undefined){
            await this.repository.update({idUser: await this.UsersService.getById(idUserToFind), idAssociation: await this.AssociationsService.getById(idAssoc)}, {name: param_name});
        }
        if(param_idAssoc !== undefined){
            await this.repository.update({idUser: await this.UsersService.getById(idUserToFind), idAssociation: await this.AssociationsService.getById(idAssoc)}, {idAssociation: await this.AssociationsService.getById(param_idAssoc)});
        }
        if(param_idUser !== undefined){
            await this.repository.update({idUser: await this.UsersService.getById(idUserToFind), idAssociation: await this.AssociationsService.getById(idAssoc)}, {idUser: await this.UsersService.getById(idUserToFind)});
        }
        const result = this.getById(idUserToFind, idAssoc);
        return result;
    }

    public async deleteRole(idUserToFind: number, idAssoc: number): Promise<boolean>{
        if(this.getById(idUserToFind, idAssoc)===undefined){
            return false;
        }
        else{
            await this.repository.delete({idUser: await this.UsersService.getById(idUserToFind), idAssociation: await this.AssociationsService.getById(idAssoc)});
            return true;
        }
    }
}

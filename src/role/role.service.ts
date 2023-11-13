import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { Association } from 'src/associations/associations.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private repository: Repository<Role>
    ) {}

    public async getAll(): Promise<Role[]> {
        return await this.repository.find();
    }

    public async getById(idUserToFind: User, idAssocToFind: Association): Promise<Role> {
        const result = await this.repository.find({
            where: {
                idUser: idUserToFind,
                idAssociation: idAssocToFind,
            },
         });
        return result[0];
    }

    public async create(param_name: string, param_idUser: User, param_idAssoc: Association): Promise<Role> {
        const role = await this.repository.create({
            name: param_name,
            idUser: param_idUser,
            idAssociation: param_idAssoc
        });
        this.repository.save(role);
        return role;
    }

    public async modifyRole(idUserToFind: User, idAssoc: Association, param_name: string, param_idUser: User, param_idAssoc: Association): Promise<Role> {
        if(param_name !== undefined){
            await this.repository.update({idUser: idUserToFind, idAssociation: idAssoc}, {name: param_name});
        }
        if(param_idAssoc !== undefined){
            await this.repository.update({idUser: idUserToFind, idAssociation: idAssoc}, {idAssociation: param_idAssoc});
        }
        if(param_idUser !== undefined){
            await this.repository.update({idUser: idUserToFind, idAssociation: idAssoc}, {idUser: idUserToFind});
        }
        const result = this.getById(idUserToFind, idAssoc);
        return result;
    }

    public async deleteRole(idUserToFind: User, idAssoc: Association): Promise<boolean>{
        if(this.getById(idUserToFind, idAssoc)===undefined){
            return false;
        }
        else{
            await this.repository.delete({idUser: idUserToFind, idAssociation: idAssoc});
            return true;
        }
    }
}

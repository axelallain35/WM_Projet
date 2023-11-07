import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private repository: Repository<Role>
    ) {}

    public async getAll(): Promise<Role[]> {
        return await this.repository.find();
    }

    public async getById(idUserToFind: number, idAssocToFind: number): Promise<Role> {
        const result = await this.repository.find({where: {
                idUser: idUserToFind,
                idAssociation: idAssocToFind
            }
         });
        return result[0];
    }

    public async create(param_name: string, param_idUser: number, param_idAssoc: number): Promise<Role> {
        const role = await this.repository.create({
            name: param_name,
            idUser: param_idUser,
            idAssociation: param_idAssoc
        });
        this.repository.save(role);
        return role;
    }

    public async modifyUser(idUser: number, idAssoc: number, param_name: string, param_idUser: number, param_idAssoc: number): Promise<User> {
        if(param_name !== undefined){
            await this.repository.update(id, { firstName: param_firstname });
        }
        if(param_idUser !== undefined){
            await this.repository.update(id, { lastName: param_lastname });
        }
        if(param_idAssoc !== undefined){
            await this.repository.update(id, { age: param_age });
        }
        const result = this.repository.findOne({where: {id: Equal(id)}});
        return result;
    }

    public async deleteUser(id: number): Promise<boolean>{
        if(id===-1){
            return false;
        }
        else{
            await this.repository.delete(id);
            return true;
        }
    }
}

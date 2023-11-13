import { Injectable } from '@nestjs/common';
import { Association } from './associations.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';


@Injectable()
export class AssociationsService {

    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>,
        private service: UsersService

    ) {}

    public async getMembers(id:number): Promise<User[]> {
        const association = await this.repository.findOne({where: {id: Equal(id)} });
        const members = [];
        for(const user of association.users){
            members.push(await this.service.getById(user.id));
        }
        return members;
    }

    public async getAll(): Promise<Association[]> {
        return await this.repository.find();
    }

    public async getById(id: number): Promise<Association> {
        const association = await this.repository.findOne({where: {id: Equal(id)}});
        return association;
    }

    public async createAssociation(param_idUsers: User[], param_name: string): Promise<Association> {
        const association = await this.repository.create({
            users: param_idUsers,
            name: param_name
        });
        await this.repository.save(association);
        return association;
    }

    public async modifyAssociation(param_id: number, param_idUsers: User[], param_name: string): Promise<Association> {   
        if(param_name !== undefined){
            await this.repository.update(param_id, { users: param_idUsers });
        }
        if(param_idUsers !== undefined){
            await this.repository.update(param_id, { name: param_name });
        }
        const association = await this.repository.findOne({where: {id: Equal(param_id)}});
        return association;
    }

    public async deleteAssociation(id: number): Promise<boolean>{
        if(id===-1){
            return false;
        }
        else{
            await this.repository.delete(id);
            return true;
        }
    }
}

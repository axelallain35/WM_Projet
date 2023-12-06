import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { AssociationsService } from 'src/associations/associations.service';
import { Minutes } from './minutes.entity';

@Injectable()
export class MinutesService {
    constructor(
        @InjectRepository(Minutes)
        private repository: Repository<Minutes>
    ) {}

    public async getAll(): Promise<Minutes[]> {
        return await this.repository.find();
    }

    public async getById(idToFind: number): Promise<Minutes> {
        const result = await this.repository.findOne({where: {id: Equal(idToFind)}});
        return result;
    }

    public async create(param_content: string, param_users: Number[], param_date: string, param_idAssoc: Number): Promise<Minutes> {
        const minute = await this.repository.create({
            idUsers: param_users,
            idAssociation: param_idAssoc,
            date: param_date,
            content: param_content
        });
        this.repository.save(minute);
        return minute;
    }

    public async modifyMinute(idToFind: number, param_content: string, param_users: Number[], param_date: string, param_idAssoc: Number): Promise<Minutes> {
        if(param_content !== undefined){
            await this.repository.update(idToFind, { content: param_content });
        }
        if(param_users !== undefined){
            await this.repository.update(idToFind, { idUsers: param_users });
        }
        if(param_date !== undefined){
            await this.repository.update(idToFind, { date: param_date });
        }
        if(param_idAssoc !== undefined){
            await this.repository.update(idToFind, { idAssociation: param_idAssoc });
        }
        const result = this.repository.findOne({where: {id: Equal(idToFind)}});
        return result;
    }

    public async deleteMinute(idToFind: number): Promise<boolean>{
        if(this.getById(idToFind)===undefined){
            return false;
        }
        else{
            await this.repository.delete(idToFind);
            return true;
        }
    }
}


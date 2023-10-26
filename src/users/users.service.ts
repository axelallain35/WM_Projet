import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    id: number = 1;
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    public async getAll(): Promise<User[]> {
        return await this.repository.find();
    }

    public async getById(idToFind: number): Promise<User> {
        const result = await this.repository.findOne({where: {id: Equal(idToFind)}});
        return result;
    }

    public async create(param_lastname: string, param_firstname: string, param_age: number): Promise<User> {
        const user = await this.repository.create({
            id: this.id,
            firstName: param_firstname,
            lastName: param_lastname,
            age: param_age
        });
        this.id++;
        this.repository.save(user);
        return user;
    }

    public async modifyUser(id: number, param_lastname: string, param_firstname: string, param_age: number): Promise<User> {
        if(param_firstname !== undefined){
            await this.repository.update(id, { firstName: param_firstname });
        }
        if(param_lastname !== undefined){
            await this.repository.update(id, { lastName: param_lastname });
        }
        if(param_age !== undefined){
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

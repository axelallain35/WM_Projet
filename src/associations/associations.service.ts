import { Injectable } from '@nestjs/common';
import { Association } from './associations.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
let id: number = 1;

const associations: Association[] = [
    {
    id: 0,
    idUsers: [0, 1],
    name: 'ISATI',
    }
]


@Injectable()
export class AssociationsService {

    constructor(
        private service: UsersService
    ) {}

    getMembers(id:number): User[] {
        const idMembers = associations.filter((association)=> association.id==id);
        const members : User[] = [];
        (idMembers[0].idUsers).forEach((userId) => members.push(this.service.getById(userId)));
        return members;
    }

    getAll(): Association[] {
        return associations;
    }

    getById(id: number): Association {
        const result = associations.filter((association)=> association.id==id);
        return result[0];
    }

    createAssociation(idUsers: number[], name: string): Association {
        const newAssociation = new Association(id, idUsers, name);
        id = id+1;
        associations.push(newAssociation);
        return newAssociation;
    }

    modifyAssociation(id: number, idUsers: number[], name: string): Association {
        const result = associations.filter((association)=> association.id==id);
        if(name !== undefined){
            result[0].name = name;
        }
        if(idUsers !== undefined){
            result[0].idUsers = idUsers;
        }
        return result[0];
    }

    deleteAssociation(id: number): boolean{
        const result = associations.filter((association)=> association.id==id);
        const index = associations.indexOf(result[0]);
        if(index===-1){
            return false;
        }
        else{
            associations.splice(index,1);
            return true;
        }
    }
}

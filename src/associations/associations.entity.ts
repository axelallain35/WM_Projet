export class Association{
    public id: number;
    public idUsers : number[];
    public name : string;

    constructor(id: number, idUsers: number[], name: string){
        this.id = id;
        this.idUsers = idUsers;
        this.name = name;
    }
}
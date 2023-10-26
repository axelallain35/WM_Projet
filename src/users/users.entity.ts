import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public age: number;

    constructor(id: number, lastname: string, firstname: string, age:number){
        this.id = id;
        this.lastName = lastname;
        this.firstName = firstname;
        this.age = age;
    }
}
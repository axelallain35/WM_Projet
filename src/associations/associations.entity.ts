import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, IntegerType } from 'typeorm';

@Entity()
export class Association{
    @PrimaryGeneratedColumn({ name:'id', type:'integer' })
    public id: number;

    @ManyToMany(type => User,{eager: true})
    @JoinTable()
    public users:User[];

    @Column()
    public name: string;

}
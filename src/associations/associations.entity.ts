import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Association{
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToMany(type => User,{eager: true})
    @JoinTable()
    public users:number[];

    @Column()
    public name: string;

}
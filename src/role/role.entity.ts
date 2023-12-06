import { Association } from 'src/associations/associations.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role{

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, {eager: true})
    @JoinColumn()
    public idUser:User;

    @ManyToOne(() => Association, {eager: true})
    @JoinColumn()
    public idAssociation:Association;


    @Column()
    public name: string;
}
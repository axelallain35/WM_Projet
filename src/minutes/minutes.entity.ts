import { Association } from 'src/associations/associations.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Minutes{

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToMany(() => User, {eager: true})
    @JoinTable()
    public idUsers:Number[];

    @ManyToOne(() => Association, {eager: true})
    @JoinColumn()
    public idAssociation:Number;

    @Column()
    public date: string;

    @Column()
    public content: string;
}
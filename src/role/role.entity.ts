import { Association } from 'src/associations/associations.entity';
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinTable, JoinColumn } from 'typeorm';

@Entity()
export class Role{

    @Column()
    public name: string;

    @OneToOne(() => User)
    @JoinColumn()
    public idUser:number;

    @OneToOne(() => Association)
    @JoinColumn()
    public idAssociation:number;

}
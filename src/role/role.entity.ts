import { Association } from 'src/associations/associations.entity';
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinTable, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Role{

    @Column()
    public name: string;

    @ManyToOne(() => User)
    @JoinColumn()
    public idUser:User;

    @ManyToOne(() => Association)
    @JoinColumn()
    public idAssociation:Association;

}
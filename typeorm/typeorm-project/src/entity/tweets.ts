import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('tweets')
export class Tweet{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;

    @Column({type: 'varchar', length: 300})
    content: string;

    @ManyToOne(type=> User, user=> user.tweets)
    user : User;



}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Tweet } from "./tweets"

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany(type=> Tweet, tweet=>tweet.user)
    tweets:Tweet[];

    @Column()
    roles:number;

}

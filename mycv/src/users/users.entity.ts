import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class user{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string

    @AfterInsert()
    loginInsert(){
        console.log("inserted user with name :" +this.username," and userid :"+this.id)
    }

    @AfterUpdate()
    logUpdate(){
        console.log('updated user with user id:',this.id)
    }

    @AfterRemove()
    logRemove(){
        console.log('removed user with id:',this.id)
    }
}
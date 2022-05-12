import {BaseEntity, Column, Entity, ObjectIdColumn} from "typeorm";

@Entity()
export default class User extends BaseEntity {
    @ObjectIdColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

}
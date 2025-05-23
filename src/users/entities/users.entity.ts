import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import bcrypt from 'bcrypt'
import { Logger } from '@nestjs/common'

const saltOrRounds = 10

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @CreateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'NOW()',
    })
    created_at: Date

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'NOW()',
    })
    updated_at: Date

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        try {
            this.password = await bcrypt.hash(this.password, saltOrRounds)
        } catch (err) {
            const logger = new Logger(UsersEntity.name)

            logger.error('Error on hashing password: ', err)

            throw err
        }
    }
}

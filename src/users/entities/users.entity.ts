import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Logger } from '@nestjs/common'
import { ArticleEntity } from '@src/articles/entities/articles.entity'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

const saltOrRounds = 10

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @IsString()
    @Column()
    username: string

    @IsNotEmpty()
    @IsEmail()
    @Column({ unique: true })
    email: string

    @IsNotEmpty()
    @IsString()
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

    @OneToMany(() => ArticleEntity, (article) => article.author)
    articles: ArticleEntity[]

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

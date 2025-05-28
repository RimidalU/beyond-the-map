import { UsersEntity } from '@src/users/entities/users.entity'
import {
    IsArray,
    IsBoolean,
    IsEmpty,
    IsNotEmpty,
    IsString,
} from 'class-validator'
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @IsNotEmpty()
    @Column({ length: 255 })
    title: string

    @IsString()
    @IsNotEmpty()
    @Column('text')
    description: string

    @IsEmpty()
    @Column({ type: 'timestamp with time zone', nullable: true })
    published_at?: Date

    @IsArray()
    @IsString({ each: true })
    @Column({ type: 'simple-array', nullable: true }) //TODO: implement tags entity
    tags: string[]

    @IsBoolean()
    @Column({ type: 'boolean', default: false })
    is_local: boolean

    @IsNotEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: false })
    locality_name: string

    @IsEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: true })
    landmarks_url?: string

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
    @ManyToOne(() => UsersEntity, (user) => user.articles, { eager: true })
    author: UsersEntity
}

import { UsersEntity } from '@src/users/entities/users.entity'
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    // BeforeInsert,
    // BeforeUpdate,
} from 'typeorm'

@Entity()
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    title: string

    @Column('text')
    description: string

    @Column({ type: 'timestamp with time zone', nullable: true })
    published_at: Date

    @Column({ type: 'simple-array', nullable: true }) //TODO: implement tags entity
    tags: string[]

    @Column({ type: 'boolean', default: false })
    is_local: boolean

    @Column({ type: 'varchar', length: 255, nullable: false })
    locality_name: string

    @Column({ type: 'varchar', length: 255, nullable: true })
    landmarks_url: string

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

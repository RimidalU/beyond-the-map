import { IsNotEmpty, IsString } from 'class-validator'
import { Entity, Column } from 'typeorm'

@Entity()
export class AddLandmarksUrlArticleDto {
    @IsNotEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: false })
    landmarks_url: string
}

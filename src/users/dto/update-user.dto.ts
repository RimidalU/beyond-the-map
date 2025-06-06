import { IsEmail, IsOptional, IsString } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Don Dou',
        description: 'User Name',
    })
    readonly username?: string

    @IsEmail()
    @IsOptional()
    @ApiPropertyOptional({
        uniqueItems: true,
        example: 'don-dou@email.com',
        description: 'User Email',
    })
    readonly email?: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Don-Dou#Password91',
        description: 'Strong Password',
    })
    readonly password?: string
}

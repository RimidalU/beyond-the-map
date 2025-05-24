import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Don Dou',
        description: 'User Name',
    })
    readonly username: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        uniqueItems: true,
        example: 'don-dou@email.com',
        description: 'User Email',
    })
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Don-Dou#Password91',
        description: 'Strong Password',
    })
    readonly password: string
}

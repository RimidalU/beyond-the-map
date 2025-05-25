import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateSwaggerDecorator } from './decorators/create-swagger.decorator'
import { SuccessResponseDto } from './dto/success-response.dto'
import { RemoveSwaggerDecorator } from './decorators/remove-swagger.decorator'
import { FindAllSwaggerDecorator } from './decorators/find-all-swagger.decorator'
import { UserResponseDto } from './dto/user.response.dto'
import { FindUserByIdSwaggerDecorator } from './decorators/find-user-by-id-swagger.decorator'
import { UpdateSwaggerDecorator } from './decorators/update-swagger.decorator'

@Controller('users')
@ApiTags('Users routes')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @CreateSwaggerDecorator()
    async create(@Body() userData: CreateUserDto): Promise<SuccessResponseDto> {
        return this.usersService.createUser(userData)
    }

    @Get()
    @FindAllSwaggerDecorator()
    async findAll(): Promise<UserResponseDto[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    @FindUserByIdSwaggerDecorator()
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
        return await this.usersService.findById(+id)
    }

    @Put(':id')
    @UpdateSwaggerDecorator()
    async update(
        @Param('id') id: string,
        @Body() updateData: UpdateUserDto,
    ): Promise<SuccessResponseDto> {
        return await this.usersService.updateUser(+id, updateData)
    }

    @Delete(':id')
    @RemoveSwaggerDecorator()
    async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
        return await this.usersService.deleteUser(+id)
    }
}

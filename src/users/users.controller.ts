import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UsersEntity } from './entities/users.entity'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateSwaggerDecorator } from './decorators/create-swagger.decorator'
import { UserCreatedResponseDto } from './dto/user-created-response.dto'

@Controller('users')
@ApiTags('User routes')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @CreateSwaggerDecorator()
    async create(
        @Body() userData: CreateUserDto,
    ): Promise<UserCreatedResponseDto> {
        return this.usersService.createUser(userData)
    }

    @Get()
    async findAll(): Promise<UsersEntity[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UsersEntity | null> {
        const user = await this.usersService.findById(+id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateData: UpdateUserDto,
    ): Promise<UsersEntity | null> {
        return this.usersService.updateUser(+id, updateData)
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.usersService.deleteUser(+id)
    }
}

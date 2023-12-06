import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { UsersModule } from 'src/users/users.module';
import { AssociationsModule } from 'src/associations/associations.module';

@Module({
  imports: [UsersModule, AssociationsModule, TypeOrmModule.forFeature([Role])], 
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './associations/associations.entity';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { Minutes } from './minutes/minutes.entity';
import { MinutesController } from './minutes/minutes.controller';
import { MinutesService } from './minutes/minutes.service';
import { MinutesModule } from './minutes/minutes.module';

@Module({
  imports: [
          TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'mydatabase.db',
          entities: [User,
                    Association,
                    Role, Minutes],
          synchronize: true,
        }),UsersModule, AssociationsModule, AuthModule, RoleModule, MinutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

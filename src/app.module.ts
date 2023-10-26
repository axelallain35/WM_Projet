import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AssociationsService } from './associations/associations.service';
import { AssociationsController } from './associations/associations.controller';
import { AssociationsModule } from './associations/associations.module';

@Module({
  imports: [UsersModule, AssociationsModule],
  controllers: [AppController, UsersController, AssociationsController],
  providers: [AppService, UsersService, AssociationsService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './associations.entity';
import { AssociationsController } from './associations.controller';

@Module({
    imports: [UsersModule,TypeOrmModule.forFeature([Association])],
    controllers: [AssociationsController],
    providers: [AssociationsService]
})
export class AssociationsModule {}

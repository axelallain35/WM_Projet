import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    providers: [AssociationsService],
    imports: [UsersModule]
})
export class AssociationsModule {}

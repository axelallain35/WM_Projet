import { Controller, Get, Put, Post, Delete, Param, HttpStatus, HttpException, Body } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { MinutesService } from './minutes.service';
import { Minutes } from './minutes.entity';
import { MinuteInput } from './minutes.input';

@Controller('minutes')
export class MinutesController {

    constructor(
        private service: MinutesService
    ) {}

    @Get()
    public async getAll(){
       return await this.service.getAll();
    }


    @Get('/:id')
        public async getById(@Param() param): Promise<Minutes> {
            const minute = await this.service.getById(param.id);
            if(minute == undefined) throw new HttpException(`Could not find a minute for the id ${param.id}`, HttpStatus.NOT_FOUND);
            return minute;
        }


    @Post()
        public async create(@Body() input: MinuteInput): Promise<Minutes> {
            const minute = await this.service.create(input.content, input.idVoters, input.date, input.idAssocation);
            return minute;
        }

    @Put('/:id')
        public async modifyMinute(@Param() param, @Body() input: any): Promise<Minutes> {
            const minute = await this.service.modifyMinute(param.id, input.content, input.idVoters, input.date, input.idAssocation);
            if(minute == undefined) throw new HttpException(`Could not find a minute for the id ${param.id}`, HttpStatus.NOT_FOUND);
            return minute;
        }

    @Delete('/:id')
        public async deleteminute(@Param() parameter): Promise<boolean>{
            const success = await this.service.deleteMinute(parameter.id);
            if(!success) throw new HttpException(`Could not find a minute for the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return success;
        }
}


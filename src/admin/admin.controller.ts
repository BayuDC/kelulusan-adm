import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { AppService } from '../app.service';
import { UpdateTimeDto } from './dto/update-time.dto';

@Controller('admin')
export class AdminController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('admin.hbs')
  index() {
    return {
      date: this.appService.getConfig().date,
    };
  }

  @Post('/when')
  @Redirect('/admin')
  async updateDate(@Body() body: UpdateTimeDto) {
    this.appService.setConfig({ date: body.date });
  }
}

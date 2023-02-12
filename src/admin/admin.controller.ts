import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateTimeDto } from './dto/update-time.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @Render('admin.hbs')
  index() {
    return {};
  }

  @Post('/when')
  @Render('admin.hbs')
  async updateDate(@Body() body: UpdateTimeDto) {
    const date = new Date(body.date);
    await this.adminService.updateDate(date);

    return {};
  }
}

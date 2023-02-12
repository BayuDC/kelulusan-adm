import { Injectable } from '@nestjs/common';

import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class AdminService {
  async updateDate(date: Date) {
    const json = JSON.stringify({ date }, null, 2);
    const file = join(__dirname, '..', '..', 'data', 'config.json');

    await writeFile(file, json, 'utf-8');
  }
}

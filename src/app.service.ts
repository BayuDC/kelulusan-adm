import { Injectable } from '@nestjs/common';

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

interface Config {
  date?: string;
}

@Injectable()
export class AppService {
  configPath: string;
  config: Config;

  constructor() {
    this.configPath = join(__dirname, '..', 'data', 'config.json');

    const json = readFileSync(this.configPath, 'utf-8');
    this.config = JSON.parse(json) as unknown as Config;
  }

  getConfig(): Config {
    return this.config;
  }
  setConfig(config: Config): void {
    this.config = config;
    const json = JSON.stringify(config, null, 2);
    writeFileSync(this.configPath, json, 'utf-8');
  }
}

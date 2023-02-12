import { IsDateString } from 'class-validator';

export class UpdateTimeDto {
  @IsDateString()
  date: string;
}

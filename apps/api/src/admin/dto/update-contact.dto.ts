import { IsEnum } from 'class-validator';
import { ContactStatus } from '@prisma/client';

export class UpdateContactDto {
  @IsEnum(ContactStatus)
  status!: ContactStatus;
}

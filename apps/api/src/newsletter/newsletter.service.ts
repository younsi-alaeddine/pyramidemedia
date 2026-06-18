import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscribeNewsletterDto } from './dto/subscribe.dto';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(dto: SubscribeNewsletterDto) {
    return this.prisma.newsletterSubscriber.upsert({
      where: { email: dto.email },
      update: { active: true },
      create: { email: dto.email },
    });
  }
}

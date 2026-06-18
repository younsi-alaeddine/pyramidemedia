import { Injectable, NotFoundException } from '@nestjs/common';
import { PublishStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  findPublishedServices() {
    return this.prisma.service.findMany({
      where: { status: PublishStatus.PUBLISHED },
      orderBy: { order: 'asc' },
    });
  }

  async findPublishedService(slug: string) {
    const service = await this.prisma.service.findFirst({
      where: { slug, status: PublishStatus.PUBLISHED },
    });
    if (!service) throw new NotFoundException();
    return service;
  }

  findPublishedPortfolio() {
    return this.prisma.portfolioItem.findMany({
      where: { status: PublishStatus.PUBLISHED },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPublishedPortfolioItem(slug: string) {
    const item = await this.prisma.portfolioItem.findFirst({
      where: { slug, status: PublishStatus.PUBLISHED },
    });
    if (!item) throw new NotFoundException();
    return item;
  }

  findPublishedBlogPosts() {
    return this.prisma.blogPost.findMany({
      where: { status: PublishStatus.PUBLISHED },
      orderBy: { publishedAt: 'desc' },
      include: { author: { select: { name: true, avatar: true } } },
    });
  }

  async findPublishedBlogPost(slug: string) {
    const post = await this.prisma.blogPost.findFirst({
      where: { slug, status: PublishStatus.PUBLISHED },
      include: { author: { select: { name: true, avatar: true } } },
    });
    if (!post) throw new NotFoundException();
    return post;
  }

  findPublishedTestimonials() {
    return this.prisma.testimonial.findMany({
      where: { status: PublishStatus.PUBLISHED },
      orderBy: { createdAt: 'desc' },
    });
  }

  findPublishedTeamMembers() {
    return this.prisma.teamMember.findMany({
      where: { status: PublishStatus.PUBLISHED },
      orderBy: { order: 'asc' },
    });
  }

  getSeoSettings() {
    return this.prisma.seoSetting.findUnique({ where: { id: 'global' } });
  }
}

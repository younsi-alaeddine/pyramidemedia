import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('api/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('services')
  getServices() {
    return this.contentService.findPublishedServices();
  }

  @Get('services/:slug')
  getService(@Param('slug') slug: string) {
    return this.contentService.findPublishedService(slug);
  }

  @Get('portfolio')
  getPortfolio() {
    return this.contentService.findPublishedPortfolio();
  }

  @Get('portfolio/:slug')
  getPortfolioItem(@Param('slug') slug: string) {
    return this.contentService.findPublishedPortfolioItem(slug);
  }

  @Get('blog')
  getBlogPosts() {
    return this.contentService.findPublishedBlogPosts();
  }

  @Get('blog/:slug')
  getBlogPost(@Param('slug') slug: string) {
    return this.contentService.findPublishedBlogPost(slug);
  }

  @Get('testimonials')
  getTestimonials() {
    return this.contentService.findPublishedTestimonials();
  }

  @Get('team')
  getTeam() {
    return this.contentService.findPublishedTeamMembers();
  }

  @Get('seo')
  getSeo() {
    return this.contentService.getSeoSettings();
  }
}

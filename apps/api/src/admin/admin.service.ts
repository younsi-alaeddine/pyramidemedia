import { Injectable } from '@nestjs/common';
import { ContactStatus, PublishStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import {
  UpsertBlogPostDto,
  UpsertPortfolioDto,
  UpsertServiceDto,
  UpsertTeamMemberDto,
  UpsertTestimonialDto,
  UpdateSeoDto,
} from './dto/upsert-content.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  getStats() {
    return Promise.all([
      this.prisma.service.count(),
      this.prisma.portfolioItem.count(),
      this.prisma.blogPost.count(),
      this.prisma.testimonial.count(),
      this.prisma.teamMember.count(),
      this.prisma.contactRequest.count(),
      this.prisma.contactRequest.count({ where: { status: ContactStatus.NEW } }),
    ]).then(
      ([services, portfolio, blog, testimonials, team, contacts, newContacts]) => ({
        services,
        portfolio,
        blog,
        testimonials,
        team,
        contacts,
        newContacts,
      }),
    );
  }

  listContacts() {
    return this.prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  updateContact(id: string, dto: UpdateContactDto) {
    return this.prisma.contactRequest.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  listPortfolio() {
    return this.prisma.portfolioItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  createPortfolio(dto: UpsertPortfolioDto, authorId: string) {
    return this.prisma.portfolioItem.create({
      data: {
        slug: dto.slug,
        title: dto.title,
        client: dto.client,
        category: dto.category,
        description: dto.description,
        technologies: dto.technologies ?? [],
        images: dto.images ?? [],
        featured: dto.featured ?? false,
        status: dto.status ?? PublishStatus.PUBLISHED,
        caseStudyUrl: dto.caseStudyUrl,
        authorId,
      },
    });
  }

  updatePortfolio(id: string, dto: Partial<UpsertPortfolioDto>) {
    return this.prisma.portfolioItem.update({
      where: { id },
      data: {
        slug: dto.slug,
        title: dto.title,
        client: dto.client,
        category: dto.category,
        description: dto.description,
        technologies: dto.technologies,
        images: dto.images,
        featured: dto.featured,
        status: dto.status,
        caseStudyUrl: dto.caseStudyUrl,
      },
    });
  }

  deletePortfolio(id: string) {
    return this.prisma.portfolioItem.delete({ where: { id } });
  }

  listServices() {
    return this.prisma.service.findMany({ orderBy: { order: 'asc' } });
  }

  createService(dto: UpsertServiceDto, authorId: string) {
    return this.prisma.service.create({
      data: {
        slug: dto.slug,
        title: dto.title,
        shortDescription: dto.shortDescription,
        description: dto.description,
        icon: dto.icon ?? 'globe',
        features: dto.features ?? [],
        order: dto.order ?? 0,
        status: dto.status ?? PublishStatus.PUBLISHED,
        authorId,
      },
    });
  }

  updateService(id: string, dto: Partial<UpsertServiceDto>) {
    return this.prisma.service.update({
      where: { id },
      data: {
        slug: dto.slug,
        title: dto.title,
        shortDescription: dto.shortDescription,
        description: dto.description,
        icon: dto.icon,
        features: dto.features,
        order: dto.order,
        status: dto.status,
      },
    });
  }

  deleteService(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }

  listBlogPosts() {
    return this.prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  createBlogPost(dto: UpsertBlogPostDto, authorId: string) {
    return this.prisma.blogPost.create({
      data: {
        slug: dto.slug,
        title: dto.title,
        excerpt: dto.excerpt,
        content: dto.content,
        coverImage: dto.coverImage,
        tags: dto.tags ?? [],
        status: dto.status ?? PublishStatus.DRAFT,
        publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : null,
        authorId,
      },
    });
  }

  updateBlogPost(id: string, dto: Partial<UpsertBlogPostDto>) {
    return this.prisma.blogPost.update({
      where: { id },
      data: {
        slug: dto.slug,
        title: dto.title,
        excerpt: dto.excerpt,
        content: dto.content,
        coverImage: dto.coverImage,
        tags: dto.tags,
        status: dto.status,
        publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined,
      },
    });
  }

  deleteBlogPost(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }

  listTestimonials() {
    return this.prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  createTestimonial(dto: UpsertTestimonialDto, authorId: string) {
    return this.prisma.testimonial.create({
      data: {
        name: dto.name,
        role: dto.role,
        company: dto.company,
        quote: dto.quote,
        rating: dto.rating ?? 5,
        featured: dto.featured ?? false,
        status: dto.status ?? PublishStatus.PUBLISHED,
        authorId,
      },
    });
  }

  updateTestimonial(id: string, dto: Partial<UpsertTestimonialDto>) {
    return this.prisma.testimonial.update({
      where: { id },
      data: {
        name: dto.name,
        role: dto.role,
        company: dto.company,
        quote: dto.quote,
        rating: dto.rating,
        featured: dto.featured,
        status: dto.status,
      },
    });
  }

  deleteTestimonial(id: string) {
    return this.prisma.testimonial.delete({ where: { id } });
  }

  listTeamMembers() {
    return this.prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
  }

  createTeamMember(dto: UpsertTeamMemberDto, authorId: string) {
    return this.prisma.teamMember.create({
      data: {
        name: dto.name,
        role: dto.role,
        bio: dto.bio,
        photo: dto.photo,
        social: dto.social ?? {},
        order: dto.order ?? 0,
        status: dto.status ?? PublishStatus.PUBLISHED,
        authorId,
      },
    });
  }

  updateTeamMember(id: string, dto: Partial<UpsertTeamMemberDto>) {
    return this.prisma.teamMember.update({
      where: { id },
      data: {
        name: dto.name,
        role: dto.role,
        bio: dto.bio,
        photo: dto.photo,
        social: dto.social,
        order: dto.order,
        status: dto.status,
      },
    });
  }

  deleteTeamMember(id: string) {
    return this.prisma.teamMember.delete({ where: { id } });
  }

  getSeoSettings() {
    return this.prisma.seoSetting.upsert({
      where: { id: 'global' },
      update: {},
      create: {
        id: 'global',
        siteTitle: 'Pyramide Media',
        siteDescription: '',
      },
    });
  }

  updateSeoSettings(dto: UpdateSeoDto) {
    return this.prisma.seoSetting.upsert({
      where: { id: 'global' },
      update: dto,
      create: {
        id: 'global',
        siteTitle: dto.siteTitle ?? 'Pyramide Media',
        siteDescription: dto.siteDescription ?? '',
        ogImage: dto.ogImage,
        twitterHandle: dto.twitterHandle,
        googleAnalytics: dto.googleAnalytics,
      },
    });
  }
}

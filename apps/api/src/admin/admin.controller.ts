import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AdminService } from './admin.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import {
  UpsertBlogPostDto,
  UpsertPortfolioDto,
  UpsertServiceDto,
  UpsertTeamMemberDto,
  UpsertTestimonialDto,
  UpdateSeoDto,
} from './dto/upsert-content.dto';

@Controller('api/admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }

  @Get('contacts')
  listContacts() {
    return this.adminService.listContacts();
  }

  @Patch('contacts/:id')
  updateContact(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.adminService.updateContact(id, dto);
  }

  @Get('portfolio')
  listPortfolio() {
    return this.adminService.listPortfolio();
  }

  @Post('portfolio')
  createPortfolio(
    @Body() dto: UpsertPortfolioDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.adminService.createPortfolio(dto, user.id);
  }

  @Patch('portfolio/:id')
  updatePortfolio(@Param('id') id: string, @Body() dto: UpsertPortfolioDto) {
    return this.adminService.updatePortfolio(id, dto);
  }

  @Delete('portfolio/:id')
  deletePortfolio(@Param('id') id: string) {
    return this.adminService.deletePortfolio(id);
  }

  @Get('services')
  listServices() {
    return this.adminService.listServices();
  }

  @Post('services')
  createService(
    @Body() dto: UpsertServiceDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.adminService.createService(dto, user.id);
  }

  @Patch('services/:id')
  updateService(@Param('id') id: string, @Body() dto: UpsertServiceDto) {
    return this.adminService.updateService(id, dto);
  }

  @Delete('services/:id')
  deleteService(@Param('id') id: string) {
    return this.adminService.deleteService(id);
  }

  @Get('blog')
  listBlogPosts() {
    return this.adminService.listBlogPosts();
  }

  @Post('blog')
  createBlogPost(
    @Body() dto: UpsertBlogPostDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.adminService.createBlogPost(dto, user.id);
  }

  @Patch('blog/:id')
  updateBlogPost(@Param('id') id: string, @Body() dto: UpsertBlogPostDto) {
    return this.adminService.updateBlogPost(id, dto);
  }

  @Delete('blog/:id')
  deleteBlogPost(@Param('id') id: string) {
    return this.adminService.deleteBlogPost(id);
  }

  @Get('testimonials')
  listTestimonials() {
    return this.adminService.listTestimonials();
  }

  @Post('testimonials')
  createTestimonial(
    @Body() dto: UpsertTestimonialDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.adminService.createTestimonial(dto, user.id);
  }

  @Patch('testimonials/:id')
  updateTestimonial(@Param('id') id: string, @Body() dto: UpsertTestimonialDto) {
    return this.adminService.updateTestimonial(id, dto);
  }

  @Delete('testimonials/:id')
  deleteTestimonial(@Param('id') id: string) {
    return this.adminService.deleteTestimonial(id);
  }

  @Get('team')
  listTeamMembers() {
    return this.adminService.listTeamMembers();
  }

  @Post('team')
  createTeamMember(
    @Body() dto: UpsertTeamMemberDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.adminService.createTeamMember(dto, user.id);
  }

  @Patch('team/:id')
  updateTeamMember(@Param('id') id: string, @Body() dto: UpsertTeamMemberDto) {
    return this.adminService.updateTeamMember(id, dto);
  }

  @Delete('team/:id')
  deleteTeamMember(@Param('id') id: string) {
    return this.adminService.deleteTeamMember(id);
  }

  @Get('seo')
  getSeoSettings() {
    return this.adminService.getSeoSettings();
  }

  @Patch('seo')
  updateSeoSettings(@Body() dto: UpdateSeoDto) {
    return this.adminService.updateSeoSettings(dto);
  }
}

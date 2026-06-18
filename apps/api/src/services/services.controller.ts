import { Controller, Get, Param } from '@nestjs/common';
import { ServicesApiService } from './services.service';

@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesApiService) {}

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.servicesService.findBySlug(slug);
  }
}

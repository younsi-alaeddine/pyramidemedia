import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { PublishStatus } from '@prisma/client';

export class UpsertPortfolioDto {
  @IsString()
  @MinLength(1)
  slug!: string;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  client!: string;

  @IsString()
  category!: string;

  @IsString()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;

  @IsString()
  @IsOptional()
  caseStudyUrl?: string;
}

export class UpsertServiceDto {
  @IsString()
  slug!: string;

  @IsString()
  title!: string;

  @IsString()
  shortDescription!: string;

  @IsString()
  description!: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsInt()
  @IsOptional()
  order?: number;

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;
}

export class UpsertBlogPostDto {
  @IsString()
  slug!: string;

  @IsString()
  title!: string;

  @IsString()
  excerpt!: string;

  @IsString()
  content!: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;

  @IsString()
  @IsOptional()
  publishedAt?: string;
}

export class UpsertTestimonialDto {
  @IsString()
  name!: string;

  @IsString()
  role!: string;

  @IsString()
  company!: string;

  @IsString()
  quote!: string;

  @IsInt()
  @IsOptional()
  rating?: number;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;
}

export class UpsertTeamMemberDto {
  @IsString()
  name!: string;

  @IsString()
  role!: string;

  @IsString()
  bio!: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsObject()
  @IsOptional()
  social?: Record<string, string>;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;
}

export class UpdateSeoDto {
  @IsString()
  @IsOptional()
  siteTitle?: string;

  @IsString()
  @IsOptional()
  siteDescription?: string;

  @IsString()
  @IsOptional()
  ogImage?: string;

  @IsString()
  @IsOptional()
  twitterHandle?: string;

  @IsString()
  @IsOptional()
  googleAnalytics?: string;
}

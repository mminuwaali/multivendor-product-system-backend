// Framework
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateVendorDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ required: false })
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  role?: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}

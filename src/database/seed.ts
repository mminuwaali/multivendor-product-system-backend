import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { VendorService } from '@/modules/vendor/vendor.service';
import { ProductService } from '@/modules/product/product.service';
import { CategoryRepository } from '@/modules/category/repository/category.repository';
import { ProductRepository } from '@/modules/product/repository/product.repository';
import { VendorRepository } from '@/modules/vendor/repository/vendor.repository';
import { CreateVendorDto } from '@/modules/vendor/dto/create-vendor.dto';
import { CreateProductDto } from '@/modules/product/dto/create-product.dto';
import { Category } from '@/modules/category/category.schema';
import { Vendor } from '@/modules/vendor/vendor.schema';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);

  const vendorService = app.get(VendorService);
  const productService = app.get(ProductService);
  const categoryRepo = app.get(CategoryRepository);
  const productRepo = app.get(ProductRepository);
  const vendorRepo = app.get(VendorRepository);

  console.log('🌱 Starting database seed...');

  // 1. Seed Categories
  console.log('...Seeding Categories');
  const categoriesData = [
    {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Gadgets and devices',
    },
    {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Clothing and accessories',
    },
    {
      name: 'Home & Garden',
      slug: 'home-garden',
      description: 'Decor and furniture',
    },
    { name: 'Books', slug: 'books', description: 'Reads and literature' },
  ];

  const createdCategories: Category[] = [];

  // Clear existing - accessing model safely via repository (which is public if we make it so or just use repo methods)
  // Since BaseRepository doesn't expose model, but our implementations are in the same project,
  // we can either add a deleteMany to BaseRepository or access protected member if allowed in this context.
  // Actually, let's use the repository directly.

  // @ts-expect-error - accessing protected model for seeding
  await categoryRepo.model.deleteMany({});

  for (const cat of categoriesData) {
    const created = await categoryRepo.create(cat);
    createdCategories.push(created);
  }

  // 2. Seed Vendors
  console.log('...Seeding Vendors');
  // @ts-expect-error - accessing protected model for seeding
  await vendorRepo.model.deleteMany({});

  const vendorsData: CreateVendorDto[] = [
    {
      email: 'vendor1@example.com',
      full_name: 'Tech World',
      password: 'password123',
      phone: '1234567890',
    },
    {
      email: 'vendor2@example.com',
      full_name: 'Fashion Hub',
      password: 'password123',
      phone: '0987654321',
    },
  ];

  const createdVendors: Vendor[] = [];
  for (const v of vendorsData) {
    try {
      const vendor = await vendorService.create(v);
      createdVendors.push(vendor);
    } catch (err) {
      console.error(`Skipping vendor ${v.email}`, err);
      const existing = await vendorService.findByEmail(v.email);
      if (existing) createdVendors.push(existing);
    }
  }

  // 3. Seed Products
  console.log('...Seeding Products');
  // @ts-expect-error - accessing protected model for seeding
  await productRepo.model.deleteMany({});

  const productTitles = [
    'Smartphone X',
    'Laptop Pro',
    'Running Shoes',
    'Cotton T-Shirt',
    'Coffee Table',
    'Novel Book',
  ];

  for (const vendor of createdVendors) {
    for (let i = 0; i < 5; i++) {
      const randomCat =
        createdCategories[Math.floor(Math.random() * createdCategories.length)];
      const title =
        productTitles[Math.floor(Math.random() * productTitles.length)] +
        ` ${Math.floor(Math.random() * 100)}`;

                      const dto: CreateProductDto = {
                          title: title,
                          price: Math.floor(Math.random() * 500) + 10,
                          category: randomCat._id as unknown as string,
                      };      await productService.create(vendor._id.toString(), dto);
    }
  }

  console.log('✅ Database seeded successfully!');
  await app.close();
}

bootstrap().catch((err: unknown) => {
  console.error('Seed failed', err);
  process.exit(1);
});

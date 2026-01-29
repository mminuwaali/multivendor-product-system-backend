// Framework
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Internal
import jwtConfig from '@/config/jwt.config';
import appConfig from '@/config/app.config';
import databaseConfig from '@/config/database.config';
import { MongoModule } from '@/database/mongo.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { VendorModule } from '@/modules/vendor/vendor.module';
import { ProductModule } from '@/modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { LoggingMiddleware } from '@/common/middleware/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    MongoModule,
    AuthModule,
    VendorModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
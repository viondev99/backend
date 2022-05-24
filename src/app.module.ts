import { UserController } from './user/user.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './configs/database/typeorm.config';
import { UserModule } from './user/user.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { AuthController } from './auth/auth.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'clients'),
    }),
  ],
  providers: [],
  controllers: [ProductController, UserController, AuthController],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory',
      entities: [Project],
      synchronize: true,
    }),
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectUseCase } from './use-cases/create-project-use-case';
import { FindAllProjectUseCase } from './use-cases/find-all-projects.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { StartProjectDto } from './dto/start-project.dto';

@Controller('projects')
export class ProjectsWithUseCaseController {
  @Inject(CreateProjectUseCase)
  private readonly createProjectUseCase: CreateProjectUseCase;

  @Inject(FindAllProjectUseCase)
  private readonly findAllProjectsUseCase: FindAllProjectUseCase;

  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase;

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  @Post(':id/start')
  update(@Param('id') id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, startProjectDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   return this.projectsService.update(id, updateProjectDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(id);
  // }
}

import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'Здесь будут возвращаться все фильмы';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `Здесь будет возвращаться один фильм c айдишником ${movieId}`;
  }

  @Post()
  create() {
    return 'Эта функция создает новый фильм';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `Эта функция будет удалять фильм с айдишником ${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `Эта функция будет редактировать фильм с айдишником ${movieId}`;
  }
}

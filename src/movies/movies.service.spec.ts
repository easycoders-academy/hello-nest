import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Тестирование функции getAll', () => {
    it('Должен возвращаться массив', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Тестирование функции getOne', () => {
    it('Должен возвращаться фильм', () => {
      service.create({
        title: 'Тестовый фильм',
        genres: ['Тестовый жанр'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('Должна возвращаться ошибка NotFoundException', () => {
      try {
        service.getOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Тестирование функции remove', () => {
    it('Фильм удаляется', () => {
      service.create({
        title: 'Тестовый фильм',
        genres: ['Тестовый жанр'],
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.remove(1);
      const afterRemove = service.getAll().length;
      expect(afterRemove).toBeLessThan(allMovies);
    });

    it('Должна возвращаться ошибка NotFoundException', () => {
      try {
        service.remove(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Тестирование функции create', () => {
    it('Фильм создается', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Тестовый фильм',
        genres: ['Тестовый жанр'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('Тестирование функции patch', () => {
    it('Фильм изменен', () => {
      service.create({
        title: 'Тестовый фильм',
        genres: ['Тестовый жанр'],
        year: 2000,
      });
      service.patch(1, { title: 'Обновленный тест' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Обновленный тест');
    });

    it('Должна возвращаться ошибка NotFoundException', () => {
      try {
        service.patch(9999, { title: '' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

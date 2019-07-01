import { TestBed } from '@angular/core/testing';

import { MinesweeperApiService } from './minesweeper-api.service';

describe('MinesweeperApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinesweeperApiService = TestBed.get(MinesweeperApiService);
    expect(service).toBeTruthy();
  });
});

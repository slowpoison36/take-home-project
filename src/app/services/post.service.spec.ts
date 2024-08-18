/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PostService } from './post.service';
import { provideHttpClient } from '@angular/common/http';

describe('Service: Employee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
  });

  it('should ...', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));
});

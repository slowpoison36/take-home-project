/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVisualizationComponent } from './post-visualization.component';
import { provideHttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

describe('PostVisualizationComponent', () => {
  let component: PostVisualizationComponent;
  let fixture: ComponentFixture<PostVisualizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers:[provideHttpClient(),provideCharts(withDefaultRegisterables())]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import {
  waitForAsync,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostListComponent } from './post-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [provideNoopAnimations(), provideHttpClient()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort the User Id column in ascending order', () => {
    const el = fixture.debugElement;
    const userIdHeaderEl: DebugElement = el.query(By.css('.mat-column-userId'));
    userIdHeaderEl.triggerEventHandler('click');
    fixture.detectChanges();
    fixture.detectChanges();
    const sortAttr =  userIdHeaderEl.attributes['aria-sort'];
    expect(sortAttr).toBe('ascending');
  });

  it('should sort the User Id column in descending order', () => {
    const el = fixture.debugElement;
    const userIdHeaderEl: DebugElement = el.query(By.css('.mat-column-userId'));
    userIdHeaderEl.triggerEventHandler('click');
    userIdHeaderEl.triggerEventHandler('click');
    fixture.detectChanges();
    const sortAttr = userIdHeaderEl.attributes['aria-sort']
    expect(sortAttr).toBe('descending');
  });
});

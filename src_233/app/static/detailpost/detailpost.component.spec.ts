import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpostComponent } from './detailpost.component';

describe('DetailpostComponent', () => {
  let component: DetailpostComponent;
  let fixture: ComponentFixture<DetailpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

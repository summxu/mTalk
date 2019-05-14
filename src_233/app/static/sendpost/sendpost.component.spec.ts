import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendpostComponent } from './sendpost.component';

describe('SendpostComponent', () => {
  let component: SendpostComponent;
  let fixture: ComponentFixture<SendpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

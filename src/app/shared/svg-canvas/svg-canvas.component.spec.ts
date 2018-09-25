import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCanvasComponent } from './svg-canvas.component';

describe('SvgCanvasComponent', () => {
  let component: SvgCanvasComponent;
  let fixture: ComponentFixture<SvgCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

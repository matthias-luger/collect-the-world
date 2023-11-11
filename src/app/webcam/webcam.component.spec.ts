import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamComponent } from './webcam.component';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('WebcamComponent', () => {
  let component: WebcamComponent;
  let fixture: ComponentFixture<WebcamComponent>;

  beforeEach(async () => {
    let MockToastrService = spyOnAllFunctions(ToastrService);

    await TestBed.configureTestingModule({
      imports: [WebcamComponent, RouterTestingModule],
      providers: [{ provide: ToastrService, useValue: MockToastrService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

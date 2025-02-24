import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNotafiscalComponent } from './lista-notafiscal.component';

describe('ListaNotafiscalComponent', () => {
  let component: ListaNotafiscalComponent;
  let fixture: ComponentFixture<ListaNotafiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaNotafiscalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaNotafiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

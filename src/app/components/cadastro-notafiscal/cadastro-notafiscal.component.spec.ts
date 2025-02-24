import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroNotafiscalComponent } from './cadastro-notafiscal.component';

describe('CadastroNotafiscalComponent', () => {
  let component: CadastroNotafiscalComponent;
  let fixture: ComponentFixture<CadastroNotafiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroNotafiscalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroNotafiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

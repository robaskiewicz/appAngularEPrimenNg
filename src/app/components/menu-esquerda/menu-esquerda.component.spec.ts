import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEsquerdaComponent } from './menu-esquerda.component';

describe('MenuEsquerdaComponent', () => {
  let component: MenuEsquerdaComponent;
  let fixture: ComponentFixture<MenuEsquerdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEsquerdaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuEsquerdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

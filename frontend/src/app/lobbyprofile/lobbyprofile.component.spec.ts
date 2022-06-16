import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyprofileComponent } from './lobbyprofile.component';

describe('LobbyprofileComponent', () => {
  let component: LobbyprofileComponent;
  let fixture: ComponentFixture<LobbyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

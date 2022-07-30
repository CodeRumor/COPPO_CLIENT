import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingService } from 'src/app/services/settings.service';
import { UserInforService } from 'src/app/services/user.info.service';
import { UserDetailComponent } from './user-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserDetailComponent],
      providers: [UserInforService, SettingService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

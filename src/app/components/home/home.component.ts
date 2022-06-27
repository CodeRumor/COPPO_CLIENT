import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private authService: AuthService,
    private router: Router,
    private observer: BreakpointObserver
  ) {}

  ngOnInit(): void {}

  /**
   * We place code inside this method to ensure that it only runs when
   * the application compleletly loads.
   */
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.shouldNavSlide(res);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  public home() {
    this.router.navigate(['home']);
  }

  /**
   * Log the user out of the application by clearing the user token from local
   *  storage and navigate to the login page.
   */
  public logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  /**
   * Determines if the slide action should be activated or not.
   * @param res the size of the page for when the side action should be activated.
   */
  private shouldNavSlide(res: any) {
    if (res.matches) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  }
}

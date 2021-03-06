import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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

  constructor(private observer: BreakpointObserver) {}

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
          this._shouldNavSlide(res);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  /**
   * Determines if the slide action should be activated or not.
   * @param res the size of the page for when the side action should be activated.
   */
  private _shouldNavSlide(res: any) {
    if (res.matches) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  }
}

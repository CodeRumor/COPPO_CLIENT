import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  state$ = new BehaviorSubject<any>(null);

  getState(): any {
    return this.state$.value;
  }

  setState(user: any): void {
    this.state$.next(user);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  state$ = new BehaviorSubject<any>(null);

  /**
   * gets the state stored in the behaviour subject.
   * @returns the vaule stored in the state, in this case the value will be user information.
   */
  public getState(): any {
    return this.state$.value;
  }

  /**
   * sets the state in the behaviour subject.
   * @param user information about a user for which we are trying to add to the behaviour subject.
   */
  public setState(user: any): void {
    this.state$.next(user);
  }
}

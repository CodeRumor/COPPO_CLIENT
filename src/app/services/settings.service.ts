import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor() {}

  public getApplicationDomain(): string {
    return environment.baseAPIUrl;
  }

  public getApplicationTypeUrl(): string {
    return environment.applicationTypeHref;
  }

  public getApplicationDomainTypePath(): string {
    return this.getApplicationDomain() + this.getApplicationTypeUrl();
  }

  public getApplicationBaseUrl(): string {
    return (
      this.getApplicationDomainTypePath() + environment.applicationVersionHref
    );
  }

  public getUserUrl(): string {
    return this.getApplicationBaseUrl() + '/Users';
  }

  public getTokenUrl(): string {
    return this.getApplicationBaseUrl() + '/Tokens';
  }
}

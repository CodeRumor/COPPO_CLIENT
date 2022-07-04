import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor() {}

  /**
   * Get the domain URL represents the address where the server is hosted.
   * @returns The domain URL where the API is hosted
   */
  public getApplicationDomainUrl(): string {
    return environment.baseAPIUrl;
  }

  /**
   * Get the type of the API for this application is placed as part of the URL to distinguish between future API.
   * @returns The type of the API for this.
   */
  public getApplicationTypeUrl(): string {
    return environment.applicationTypeHref;
  }

  /**
   * Get the domain path type is a combination of the domain name and API type.
   * @returns The combination of Application Domain URL and the application Type
   */
  public getApplicationDomainTypePath(): string {
    return this.getApplicationDomainUrl() + this.getApplicationTypeUrl();
  }

  /**
   * Get the URL for which all functionalities of the application should be accessed from.
   * @returns The complete URL for which application functionalities can be access.
   */
  public getApplicationBaseUrl(): string {
    return (
      this.getApplicationDomainTypePath() + environment.applicationVersionHref
    );
  }

  /**
   * Get the user information.
   * @returns The URL used to access user information.
   */
  public getUserUrl(): string {
    return this.getApplicationBaseUrl() + '/Users';
  }

  /**
   * Get the token information.
   * @returns The URL used to access token information.
   */
  public getTokenUrl(): string {
    return this.getApplicationBaseUrl() + '/Tokens';
  }
}

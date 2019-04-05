import { Observable } from 'rxjs';
import { OAuthService, OAuthKey, OAuthToken } from './oauth.service';
import { HttpClient } from '@angular/common/http';
export declare class AuthorizedRequestService {
    private oauth;
    private http;
    constructor(oauth: OAuthService, http: HttpClient);
    get(url: string, query: any, oauthKey: OAuthKey, oauthToken: OAuthToken): Observable<Object>;
    post(url: string, params: any, oauthKey: OAuthKey, oauthToken: OAuthToken): Observable<Object>;
}

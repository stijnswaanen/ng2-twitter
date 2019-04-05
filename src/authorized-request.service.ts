import { Observable } from 'rxjs';

import {
	OAuthService,
	OAuthKey,
	OAuthToken
} from './oauth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export class AuthorizedRequestService {
	constructor(
		private oauth: OAuthService,
		private http: HttpClient
	){}

	get(url: string, query: any, oauthKey: OAuthKey, oauthToken: OAuthToken){
		let authHeader = new HttpHeaders();
		authHeader = authHeader.append('Authorization',this.oauth.createHeaderString('GET',url,query,oauthKey,oauthToken,this.oauth.createNonce(10),this.oauth.createTimestamp()));

		let requestUrl = url;
		let queryArray:any[] = [];
		Object.keys(query).forEach((k)=>{
			queryArray.push({
				key: this.oauth.fixedEncodeURIComponent(k),
				val: this.oauth.fixedEncodeURIComponent(query[k])
			});
		});
		if(queryArray.length > 0){
			requestUrl += '?';
			requestUrl += queryArray.map((param:any)=>{
				return param.key+'='+param.val;
			}).join('&');
		}

		return this.http.get(requestUrl,{headers: authHeader});
	}

	post(url: string, params: any, oauthKey: OAuthKey, oauthToken: OAuthToken){
		let authHeader = new HttpHeaders();
        authHeader = authHeader.append('Content-Type','application/x-www-form-urlencoded');
        authHeader = authHeader.append('Authorization',this.oauth.createHeaderString('POST',url,params,oauthKey,oauthToken,this.oauth.createNonce(10),this.oauth.createTimestamp()));


		let paramArray:any[] = [];
		Object.keys(params).forEach((k)=>{
			paramArray.push({
				key: this.oauth.fixedEncodeURIComponent(k),
				val: this.oauth.fixedEncodeURIComponent(params[k])
			});
		});
		paramArray = this.oauth.sortAlphabetically(paramArray);
		const body = paramArray.map((param:any)=>{
				return param.key+'='+param.val;
			}).join('&');

		return this.http.post(url,body,{headers: authHeader});
	}

}
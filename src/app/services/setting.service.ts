import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
	providedIn: 'root'
})
export class SettingService {

	constructor(
		private httpClient: HttpClient
	) {
	}

	updateHighLightHome(data) {
		const highLight = {
			video_highlight: data
		};
		return this.httpClient.post<any>(`${environment.api_url}/setting/general`, highLight)
			.do(res => {
				return res;
			});
	}
}

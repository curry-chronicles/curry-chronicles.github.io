import * as imgur from 'imgur';
import { imgurAuth } from './../imgur.json';

const API_URL = 'https://api.imgur.com/3/';

export class ImgurService {

    public uploadBase64(base64: string, albumId: string, title: string, description: string): Promise<any> {
        imgur.setAPIUrl(API_URL);
		imgur.setCredentials(imgurAuth.login, imgurAuth.password, imgurAuth.clientId);
		return imgur.uploadBase64(base64, albumId, title, description);
    }
}
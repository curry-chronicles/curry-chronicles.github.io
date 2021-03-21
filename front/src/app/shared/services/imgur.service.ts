import { Injectable } from '@angular/core';
import { ThumbnailType } from './../models';

const knownExtensions = [
	'.jpg',
	'.png',
	'.gif'
];

@Injectable()
export class ImgurService {
	public toThumbnail(imageUrl: string, type: ThumbnailType): string {
		if (imageUrl == null) {
			return null;
		}

		const originalUrlLength = imageUrl.length;
		for (let i = 0; i < knownExtensions.length && imageUrl.length === originalUrlLength; ++i) {
			imageUrl = imageUrl.replace(knownExtensions[i], `${type}${knownExtensions[i]}`);
		}

		return imageUrl;
	}
}

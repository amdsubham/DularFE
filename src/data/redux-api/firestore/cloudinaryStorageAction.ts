import {OS} from '../../../utils/regex';
import {CLOUDINARY_CLOUD_NAME, CLOUDINARY_PRESENT_NAME} from './config';

export function assetUploadInCloudinaryServer(photo: any, isReturnData: any) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    let media = {
      uri: OS === 'ios' ? photo.sourceURL : photo.path,
      type: photo.mime,
      name: `${new Date().valueOf().toString()}.png`,
    };
    data.append('file', media);
    data.append('upload_preset', CLOUDINARY_PRESENT_NAME);
    data.append('cloud_name', CLOUDINARY_CLOUD_NAME);
    fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then((response: any) => {
        if (isReturnData) {
          resolve({response, photo});
        } else {
          resolve(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

import AWS from 'aws-sdk';

const _ACCESS_KEY_ID = '';
const _SECRET_ACCESS_KEY = '';

// eslint-disable-next-line require-await
export const uploadStore = async data => {
  const client = new AWS.S3({
    accessKeyId: _ACCESS_KEY_ID,
    secretAccessKey: _SECRET_ACCESS_KEY,
    apiVersion: '2006-03-01',
    region: 'eu-west-2',
  });

  const request = {
    Bucket: 'rakso-kooklog-store',
    Key: 'kooklog-store.json',
    Body: JSON.stringify(data),
    ContentType: 'application/json; charset=utf-8',
    ACL: 'public-read',
    CacheControl: 'max-age=60',
  };

  return new Promise((resolve, reject) => {
    client.putObject(request, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });
};

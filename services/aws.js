import AWS from 'aws-sdk';

export const createApi = ({ store }) => ({
  client: null,
  getClient() {
    if (!store.state.aws.accessKey || !store.state.aws.secretKey) {
      return;
    }

    if (!this.client) {
      this.client = new AWS.S3({
        accessKeyId: store.state.aws.accessKey,
        secretAccessKey: store.state.aws.secretKey,
        apiVersion: '2006-03-01',
        region: 'eu-west-2',
      });
    }

    return this.client;
  },
  updateStore() {},
  async fetch() {
    try {
      const params = {
        Bucket: 'rakso-kooklog-store',
        Key: 'kooklog-store.json',
      };

      const data = await this.getClient()
        .getObject(params)
        .promise();

      return JSON.parse(data.Body.toString());
    } catch (e) {
      throw new Error(`Could not retrieve file from S3: ${e.message}`);
    }
  },
  syncStore(data) {
    // TODO hoe krijgen we hier toegang tot de locally stores keys?

    console.log('SYNC DATA MET AWS');

    // console.log('accessKey : ', accessKey);
    // console.log('secretKey : ', secretKey);

    // const client = new AWS.S3({
    //   accessKeyId: accessKey,
    //   secretAccessKey: secretKey,
    //   apiVersion: '2006-03-01',
    //   region: 'eu-west-2',
    // });
    //
    // const request = {
    //   Bucket: 'rakso-kooklog-store',
    //   Key: 'kooklog-store.json',
    //   Body: JSON.stringify(data),
    //   ContentType: 'application/json; charset=utf-8',
    //   //ACL: 'public-read',
    //   CacheControl: 'max-age=60',
    // };
    //
    // return new Promise((resolve, reject) => {
    //   client.putObject(request, (error, data) => {
    //     if (error) {
    //       return reject(error);
    //     }
    //
    //     return resolve(data);
    //   });
    // });
  },
});

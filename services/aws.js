import AWS from 'aws-sdk';

const BUCKET_NAME = 'rakso-kooklog-store';
const BUCKET_OBJECT_KEY = 'kooklog-store.json';

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

  async upload(data) {
    data.lastMutationDate = Date.now();

    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: BUCKET_OBJECT_KEY,
        Body: JSON.stringify(data),
        ContentType: 'application/json; charset=utf-8',
        CacheControl: 'max-age=60',
      };

      if (this.getClient()) {
        await this.getClient()
          .putObject(params)
          .promise();

        return data;
      }
    } catch (e) {
      throw new Error(`Could not upload file to S3: ${e.message}`);
    }
  },

  async fetch() {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: BUCKET_OBJECT_KEY,
      };

      if (this.getClient()) {
        const data = await this.getClient()
          .getObject(params)
          .promise();

        return JSON.parse(data.Body.toString());
      }
    } catch (e) {
      throw new Error(`Could not retrieve file from S3: ${e.message}`);
    }
  },

  // sync is misschien niet beste benaming voor deze actie
  // delete zal moeten gebeuren met een sync, waarbij de desbetreffende id wordt verwijderd
  async sync(newEntry) {
    const remoteStore = await this.fetch();
    const localStore = store.state.logs;
    let entries = localStore.entries;

    if (remoteStore.lastMutationDate >= localStore.lastMutationDate) {
      console.log('!!! WE NEED TO MERGE');

      entries = remoteStore.entries;

      // merge moet iets slimmer gebeuren dan dit
      // moeten door alles heenlopen en niet gevonden ids toevoegen
      // dus dan kunnen we gewoon heel de store gebruiken ipv de entry doorgeven
      // maar moeten dan wel de nieuwe state weer fetchen daarna - of moeten we dat altijd gewoon doen?
    }

    return await this.upload({
      entries: [...entries, newEntry],
    });
  },
});

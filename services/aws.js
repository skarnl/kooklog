import AWS from 'aws-sdk';
import { DateTime } from 'luxon';

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

  async upload() {
    if (!this.getClient()) {
      return;
    }

    const newRemoteStore = {
      logs: {
        entries: store.state.logs.entries,
      },
      cookbook: {
        dishes: store.state.cookbook.dishes,
      },
    };

    // for logging purposes
    newRemoteStore.lastMutationDate = DateTime.local().toISO();

    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: BUCKET_OBJECT_KEY,
        Body: JSON.stringify(newRemoteStore),
        ContentType: 'application/json; charset=utf-8',
        CacheControl: 'max-age=60',
      };

      await this.getClient()
        .putObject(params)
        .promise();
    } catch (e) {
      throw new Error(`Could not upload file to S3: ${e.message}`);
    }
  },

  async fetch() {
    if (!this.getClient()) {
      return;
    }

    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: BUCKET_OBJECT_KEY,
      };

      const data = await this.getClient()
        .getObject(params)
        .promise();

      return JSON.parse(data.Body.toString());
    } catch (e) {
      throw new Error(`Could not retrieve file from S3: ${e.message}`);
    }
  },

  /**
   * Update the local store with the latest remote store state
   *
   * @returns {Promise<void>}
   */
  async sync() {
    const remoteStore = await this.fetch();

    if (remoteStore) {
        store.dispatch('logs/setEntries', remoteStore.logs.entries);
        store.dispatch('cookbook/setDishes', remoteStore.cookbook.dishes);
    }
  },
});

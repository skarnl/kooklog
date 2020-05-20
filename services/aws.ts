import AWS from 'aws-sdk';
import { DateTime } from 'luxon';
import { Entry } from '~/helpers/entry';
import { Dish } from '~/store/cookbook';
import { RootState } from '~/store';

const BUCKET_NAME = 'rakso-kooklog-store';
const BUCKET_OBJECT_KEY = 'kooklog-store.json';

export interface RemoteStore {
  lastMutationDate: string;
  logs: {
    entries: Entry[];
  };
  cookbook: {
    dishes: Dish[];
  };
}

export interface AwsService {
  client: null | AWS.S3;
  getClient: () => undefined | AWS.S3;
  upload: () => void;
  fetch: () => void | Promise<RemoteStore>;
  sync: () => void;
}

export const createApi = ({
  store,
}: {
  store: { state: RootState };
}): AwsService => ({
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

  /**
   * Update the remote store with the current local store state
   */
  async upload() {
    const client = this.getClient();

    if (!client) {
      return;
    }

    const newRemoteStore: RemoteStore = {
      lastMutationDate: DateTime.local().toISO(),
      logs: {
        entries: store.state.logs.entries,
      },
      cookbook: {
        dishes: store.state.cookbook.dishes,
      },
    };

    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: BUCKET_OBJECT_KEY,
        Body: JSON.stringify(newRemoteStore),
        ContentType: 'application/json; charset=utf-8',
        CacheControl: 'max-age=60',
      };

      await client.putObject(params).promise();
    } catch (e) {
      throw new Error(`Could not upload file to S3: ${e.message}`);
    }
  },

  /**
   * Fetch the remote store
   *
   * @returns {void | Promise<RemoteStore>}
   */
  async fetch() {
    const client = this.getClient();

    if (!client) {
      return;
    }

    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: BUCKET_OBJECT_KEY,
      };

      const data = await client.getObject(params).promise();

      if (data.Body) {
        return JSON.parse(data.Body.toString());
      }

      throw new Error('Apparently the Body is empty 🤔');
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
      store.dispatch('logs/setEntries', remoteStore.logs.entries, {
        root: true,
      });
      store.dispatch('cookbook/setDishes', remoteStore.cookbook.dishes, {
        root: true,
      });
    }
  },
});

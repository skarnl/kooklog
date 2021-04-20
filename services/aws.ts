import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  // GetObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { DateTime } from 'luxon';
import { Context } from '@nuxt/types';
import { Entry } from '~/helpers/entry';
import { Dish } from '~/store/cookbook';

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
  client: null | S3Client;
  getClient: () => undefined | S3Client;
  upload: () => void;
  fetch: () => void | Promise<RemoteStore>;
  sync: () => void;
}

export const createApi = ({ store }: Context): AwsService => ({
  client: null,

  getClient() {
    if (!store.state.aws.accessKey || !store.state.aws.secretKey) {
      return;
    }

    if (!this.client) {
      this.client = new S3Client({
        credentials: {
          accessKeyId: store.state.aws.accessKey,
          secretAccessKey: store.state.aws.secretKey,
        },
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

      await client.send(new PutObjectCommand(params));
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

      // Create the presigned URL.
      const signedUrl = await getSignedUrl(
        client,
        new GetObjectCommand(params),
        { expiresIn: 3600 },
      );

      const response = await fetch(signedUrl);
      return await response.json();
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
      await store.dispatch('logs/setEntries', remoteStore.logs.entries, {
        root: true,
      });
      await store.dispatch('cookbook/setDishes', remoteStore.cookbook.dishes, {
        root: true,
      });
    }
  },
});

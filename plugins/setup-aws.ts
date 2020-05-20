import { Plugin } from '@nuxt/types';
import { createApi } from '../services/aws';
import { AwsService } from '~/services/aws';

declare module 'vue/types/vue' {
  interface Vue {
    $aws: AwsService;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $aws: AwsService;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $aws: AwsService;
  }
}

const setupAws: Plugin = ({ store }, inject) => {
  inject('aws', createApi({ store }));
};

export default setupAws;

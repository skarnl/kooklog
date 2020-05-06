// import Vue from 'vue';
import { createApi } from '../services/aws';

export default ({ app, store }) => {
  app.$aws = createApi({ store });
};

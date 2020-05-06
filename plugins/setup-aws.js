import { createApi } from '../services/aws';

export default ({ store }, inject) => {
  inject('aws', createApi({ store }));
};

<template>
  <div>
    <v-combobox
      v-model="model"
      item-text="name"
      item-value="id"
      :items="items"
      placeholder="Klik om iets in te voeren"
      hide-no-data
    ></v-combobox>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DateTime } from 'luxon';

export default {
  name: 'WeekEntry',
  props: {
    entry: {
      type: Object,
      default: null,
    },
    day: {
      type: DateTime,
      default: null,
    },
  },
  data() {
    return {
      model: null,
    };
  },
  computed: {
    ...mapState('cookbook', {
      items: state => state.dishes,
    }),
  },
  created() {
    if (this.entry) {
      this.model = {
        ...this.items.find(dish => dish.id === this.entry.dishId),
      };
    }
  },
  watch: {
    model() {
      console.log('this.model changed : ', this.model);
    },
  },
};
</script>

<style lang="scss">
.v-text-field__details {
  display: none;
}
</style>

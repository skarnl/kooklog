<template>
  <div>
    <v-combobox
      v-model="selectedDish"
      item-text="name"
      item-value="id"
      :items="items"
      placeholder="Klik om iets in te voeren"
      hide-no-data
      flat
      solo
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
      required: true,
    },
  },
  data() {
    return {
      selectedDish: this.entry
        ? {
            ...this.$store.state.cookbook.dishes.find(
              dish => dish.id === this.entry.dishId,
            ),
          }
        : null,
    };
  },
  computed: {
    ...mapState('cookbook', {
      items: state => state.dishes,
    }),
  },
  watch: {
    selectedDish() {
      console.log('this.selectedDish changed : ', this.selectedDish);

      // this.$store.dispatch('logs/addEntry', {
      //   dish: this.selectedDish,
      //   date: this.day,
      // });
    },
  },
};
</script>

<style lang="scss">
.v-text-field__details {
  display: none;
}
</style>

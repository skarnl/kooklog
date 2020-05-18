<template>
  <div>
    <v-combobox
      v-model="selectedDish"
      item-text="name"
      item-value="id"
      :items="items"
      placeholder="Klik om iets in te voeren"
      allow-overflow="false"
      hide-no-data
      flat
      solo
      @change="onChange"
    ></v-combobox>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WeekEntry',
  props: {
    entry: {
      type: Object,
      default: null,
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
      items(state) {
        return [...state.dishes].sort(this.sortDishesByName);
      },
    }),
  },
  watch: {
    entry() {
      this.selectedDish = this.entry
        ? {
            ...this.$store.state.cookbook.dishes.find(
              dish => dish.id === this.entry.dishId,
            ),
          }
        : null;
    },
  },
  methods: {
    onChange() {
      this.$emit('dishChanged', this.selectedDish);
    },
    sortDishesByName(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    },
  },
};
</script>

<style lang="scss">
.v-text-field__details {
  display: none;
}
</style>

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
      clearable
      :filter="filter"
      :menu-props="menuProps"
      :search-input.sync="search"
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
      search: null,
    };
  },
  computed: {
    ...mapState('cookbook', {
      items(state) {
        return [...state.dishes].sort(this.sortDishesByName);
      },
    }),
    menuProps() {
      return !this.search ? { value: false } : {};
    },
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
    filter(item, queryText, itemText) {
      if (item.header) return false;

      if (queryText.length < 3) {
        return;
      }

      const hasValue = val => (val != null ? val : '');

      const text = hasValue(itemText)
        .toString()
        .toLowerCase();
      const query = hasValue(queryText)
        .toString()
        .toLowerCase();

      return text.includes(query);
    },
  },
};
</script>

<style lang="scss">
.v-text-field__details {
  display: none;
}
</style>

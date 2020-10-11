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
      autofocus
      @change="onChange"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { DateTime } from 'luxon';

export default Vue.extend({
  name: 'EntryField',
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
      selectedDish: null,
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
    /**
     * We listen to the day - since empty entries are null so there is not change detected otherwise
     * so therefor we watch the day (which can hacky can be set to null ^^)
     */
    day() {
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
      if (item.header) {
        return false;
      }

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
});
</script>

<style lang="scss">
.v-text-field__details {
  display: none;
}
</style>

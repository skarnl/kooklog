<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <template v-if="sortedDishes.length">
        <template v-for="(dish, index) in sortedDishes">
          <v-list-item :key="`item__${dish.id}`">
            <v-list-item-content>
              <v-list-item-title v-text="dish.name" />
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-if="index + 1 < sortedDishes.length"
            :key="`divider__${dish.id}`"
          />
        </template>
      </template>

      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title>Nog niks in de lijst</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'List',
  computed: {
    ...mapGetters('cookbook', ['sortedDishes']),
  },
};
</script>

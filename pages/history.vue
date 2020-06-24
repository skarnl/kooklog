<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <template v-if="sortedEntries.length">
        <template v-for="(item, index) in sortedEntries">
          <v-list-item :key="`item__${item.id}`">
            <v-list-item-content>
              <v-list-item-title v-text="item.dish.name" />
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text
                v-text="item.formattedDate"
              ></v-list-item-action-text>

              <!--            IF FAVORITE (HARTJE)

                <v-icon v-if="!active" color="grey lighten-1">-->
              <!--                  star_border-->
              <!--                </v-icon>-->

              <!--                <v-icon v-else color="yellow">-->
              <!--                  star-->
              <!--                </v-icon>-->
            </v-list-item-action>
          </v-list-item>

          <v-divider
            v-if="index + 1 < sortedEntries.length"
            :key="`divider__${item.id}`"
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
  name: 'History',
  computed: {
    ...mapGetters('logs', ['sortedEntries']),
  },
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row justify="center" align-content="center">
          <v-card class="ma-3 pa-6" tile>
            <v-card-title class="headline">Kooklog</v-card-title>
            <v-card-text>
              <p>
                Dit <span class="font-italic">logboek</span> is bedoelt om bij
                te houden wat we zoal eten en uiteindelijk ons suggesties kan
                doen over wat er al langere tijd niet op tafel heeft gestaan.
              </p>
              <p>
                Ooit (in de toekomst) zouden er eventueel nog recepten en/of
                boodschappenlijstjes uit kunnen komen. Maar nu eerst even gewoon
                bijhouden wat we eten per dag/week en dus hier suggesties uit
                doen.
              </p>
              <v-card-actions>
                <v-btn color="primary" @click.stop="openAddDialog">
                  Nieuwe log
                </v-btn>
                <v-btn color="primary">
                  Naar lijst
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { eventBus } from '../eventBus'

export default {
  name: 'index',
  methods: {
    openAddDialog() {
      eventBus.$emit('openDialog')
    }
  }
}
</script>

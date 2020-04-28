<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Wat hebben we gegeten?</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-form ref="entryform" lazy-validation>
                <v-col cols="12">
                  <v-text-field
                    v-model="entry.name"
                    label="Naam van gerecht"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    v-model="datepicker"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="entry.date"
                        label="Datum"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="entry.date"
                      @input="datepicker = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-form>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeHandler">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveHandler">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { eventBus } from '../eventBus';

export default {
  name: 'EntryModal',
  data: () => ({
    dialog: false,
    entry: {
      name: '',
      date: new Date().toISOString().substr(0, 10),
    },
    datepicker: false,
  }),
  created() {
    eventBus.$on('openDialog', () => {
      this.dialog = true;
    });
  },
  methods: {
    saveHandler() {
      this.$store.dispatch('logs/addEntry', { ...this.entry });
      this.closeHandler();
    },
    closeHandler() {
      this.dialog = false;
      this.clearForm();
    },
    clearForm() {
      this.entry = {
        name: '',
        date: new Date().toISOString().substr(0, 10),
      };
    },
  },
};
</script>

<style scoped lang="scss"></style>

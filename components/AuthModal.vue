<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Credentials</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-form lazy-validation>
                <v-col cols="12">
                  <v-text-field
                    v-model="accessKey"
                    label="Access key"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="secretKey"
                    label="Secret key"
                    required
                  />
                </v-col>
              </v-form>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="saveHandler">
            Save
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AuthModal',
  props: {
    showDialog: Boolean,
  },
  data() {
    return {
      accessKey: '',
      secretKey: '',
    };
  },
  methods: {
    saveHandler() {
      if (this.accessKey && this.secretKey) {
        this.$store.dispatch('aws/setKeys', {
          accessKey: this.accessKey,
          secretKey: this.secretKey,
        });
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>

<template>
  <v-card class="pa-4">
    <v-card-title class="text-center">Are you sure you want to delete this card?</v-card-title>
    <v-card-actions>
      <v-btn @click="handleDelete" color="primary" data-test="deleteConfirm-button">Yes</v-btn>
      <v-btn @click="$emit('close')" color="secondary" data-test="cancelDelete-button">No</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Card } from '../types'

export default defineComponent({
  name: 'DeleteCardConfirm',
  props: {
    card: {
      type: Object as PropType<Card | null>,
      default: null,
    },
    onDelete: {
      type: Function as PropType<(card: Card) => void>,
      required: true,
    },
  },
  methods: {
    handleDelete() {
      if (this.card) {
        this.onDelete(this.card)
      }
      this.$emit('close')
    },
  },
})
</script>

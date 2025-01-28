<template>
  <CardForm :statuses="statuses" :card="card" :onSubmit="saveEdit" @close="$emit('close')" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import CardForm from './CardForm.vue'
import type { Status, Card } from '../types'

export default defineComponent({
  name: 'EditCardForm',
  components: { CardForm },
  props: {
    statuses: {
      type: Array as () => Status[],
      required: true,
    },
    card: {
      type: Object as () => Card,
      required: true,
    },
    saveEdit: {
      type: Function as PropType<(card: Card) => void>,
      required: true,
    },
  },
})
</script>

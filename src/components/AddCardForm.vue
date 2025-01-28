<template>
  <CardForm :statuses="statuses" :onSubmit="addCard" @close="$emit('close')" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import CardForm from './CardForm.vue'
import type { Status, Card } from '../types'

export default defineComponent({
  name: 'AddCardForm',
  components: { CardForm },
  props: {
    statuses: {
      type: Array as () => Status[],
      required: true,
    },
    addCard: {
      type: Function as PropType<(card: Card) => void>,
      required: true,
    },
  },
})
</script>

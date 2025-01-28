<template>
  <v-form ref="formRef" @submit.prevent="submitForm" class="pa-4">
    <v-text-field
      v-model="formCard.title"
      :rules="[(value) => !!value || 'Title is required.']"
      label="Title"
      required
    />
    <v-select
      v-model="formCard.status"
      :items="statuses"
      item-text="status"
      item-value="status"
      :rules="[(value) => !!value || 'Status is required.']"
      label="Status"
      required
    />
    <v-textarea
      v-model="formCard.description"
      :rules="[(value) => !!value || 'Description is required.']"
      label="Description"
      required
    />
    <div class="ga-2 pa-0 d-flex flex-row align-start justify-end">
      <v-btn type="submit" color="primary">Save</v-btn>
      <v-btn @click="$emit('close')" color="secondary">Cancel</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { Card, Status } from '../types'

export default defineComponent({
  name: 'CardForm',
  props: {
    card: {
      type: Object as PropType<Card | null>,
      default: null,
    },
    statuses: {
      type: Array as PropType<Status[]>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<(card: Card) => void>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formRef = ref()
    const formCard = ref<Card>({
      id: props.card?.id || '',
      title: props.card?.title || '',
      description: props.card?.description || '',
      status: props.card?.status || props.statuses[0].title,
    })

    watch(
      () => props.card,
      (newCard) => {
        if (newCard) {
          formCard.value = { ...newCard }
        }
      },
    )

    const submitForm = async () => {
      try {
        const validationResult = await formRef.value?.validate()
        if (validationResult?.valid) {
          props.onSubmit({ ...formCard.value })
          emit('close')
        }
      } catch (err) {
        console.error('Validation failed:', err)
      }
    }

    return { formCard, submitForm, formRef }
  },
})
</script>

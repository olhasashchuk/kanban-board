<template>
  <v-form ref="formRef" @submit.prevent="submitForm"  class="pa-4">
    
    <v-text-field
      v-model="newCard.title"
      :rules="[value => !!value || 'Title is required.']"
      label="Title"
      required
    />
    <v-select
      v-model="newCard.status"
      :items="statuses"
      item-text="title"
      item-value="title"
      :rules="[value => !!value || 'Status is required.']"
      label="Status"
      required
    />
    <v-textarea
      v-model="newCard.description"
      :rules="[value => !!value || 'Description is required.']"
      label="Description"
      required
    />
    
    <v-btn type="submit" color="primary">Save</v-btn>
    <v-btn @click="$emit('close')" color="secondary">Cancel</v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Status, Card } from '../types';

export default defineComponent({
  name: 'AddCardForm',
  props: {
    statuses: {
      type: Array as () => Status[],
      required: true,
    },
    addCard: {
      type: Function as PropType<(card: Card) => void>,
      required: true,
    },
    editedCard: {
      type: Object as PropType<Card | null>,
      default: null,
    },
    saveEdit: {
      type: Function as PropType<(card: Card) => void>,
      required: true,
    },
  },
  
  setup(props) {
    const formRef = ref();

    const newCard = ref<Card>(props.editedCard ||{
      id: 0,
      title: '',
      description: '',
      status: props.statuses[0].title,
    });

    watch(() => props.editedCard, (newCardValue) => {
      if (newCardValue) {
        newCard.value = { ...newCardValue };
      }
    });

    const submitForm = async () => {
      try {
        const validationResult = await formRef.value?.validate();
        if (validationResult?.valid) {
          if (newCard.value.id === 0) {
            newCard.value.id = Date.now();
            props.addCard(newCard.value);
          } else {
            if (props.editedCard) {
              props.saveEdit(newCard.value);
            }
          }
        newCard.value = { id: 0, title: '', description: '', status: props.statuses[0].title };
        } else {
          console.warn('Form validation failed:', validationResult.errors);
        }
      } catch (error) {
        console.error('Validation error:', error);
      }
    };
    return { newCard, submitForm, formRef };
  },
});
</script>


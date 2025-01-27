<template>
  <v-card class="kanban-card">
    <v-card-actions>
      <v-btn icon @click="$emit('edit')" color="primary">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('delete')" color="error">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ description }}</v-card-text>
    
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'KanbanCard',
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    description: {
      type: String as PropType<string>,
      required: true,
    },

  },
  
});
</script>

<style scoped>
.kanban-card {
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

</style>
<template>
  <v-card class="kanban-card">
    <v-card-title class="text-wrap title-flex">{{ title }}</v-card-title>
    <v-card-text class="text-wrap">{{ description }}</v-card-text>
      <v-card-actions class="ga-0 pa-0 d-flex flex-row align-start justify-end">
        <v-btn icon small style="width: 32px; height: 32px;" @click="$emit('edit')" color="primary">
          <v-icon size="small">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small style="width: 32px; height: 32px;" @click="$emit('delete')" color="error">
          <v-icon size="small">mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
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



.title-flex {
  flex: 1;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
}

.text-wrap {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-word;
}
</style>
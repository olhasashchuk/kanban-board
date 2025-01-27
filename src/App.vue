<template>
  <v-app>
    <v-container>
      <v-btn color="primary" @click="openAddForm">
        Add card
      </v-btn>
        <v-row>
        <v-col v-for="status in statuses" :key="status.id" cols="2" >
          <h3>{{ status.title }}</h3>
          <div class="kanban-column h-screen">
            <KanbanCard
              v-for="card in cards.filter(c => c.status === status.title)"
              :key="card.id"
              :title="card.title"
              :description="card.description"
              @edit="openEditForm(card)"
            />
          </div>
        </v-col>
      </v-row>

      <v-dialog v-model="showAddForm" max-width="500px" >
        <v-card title="Add a new card">
          <AddCardForm
            :statuses="statuses"
            :addCard="addCard"
            @close="showAddForm = false"
          />
        </v-card>
      </v-dialog>

      <v-dialog v-model="showEditForm" max-width="500px" >
        <v-card title="Edit card">
          <EditCardForm
            :statuses="statuses"
            :card="editedCard!"
            :saveEdit="saveEdit"
            @close="showEditForm = false"
          />
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
  
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import KanbanCard from './components/KanbanCard.vue';
import AddCardForm from './components/AddCardForm.vue';
import EditCardForm from './components/EditCardForm.vue';
import type { Status, Card } from './types';

export default defineComponent({
  name: 'App',
  components: { KanbanCard, AddCardForm, EditCardForm },
  setup() {
    const statuses = ref<Status[]>([
      { id: 1, title: 'Backlog' },
      { id: 2, title: 'Selected' },
      { id: 3, title: 'To Specify' },
      { id: 4, title: 'In Development' },
      { id: 5, title: 'To test' },
      { id: 6, title: 'To deploy in production' },
    ]);

    const cards = ref<Card[]>([
      { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'Backlog' },
      { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'Selected' },
      { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'To test' },
      { id: 4, title: 'Task 4', description: 'Description for Task 4', status: 'In Development' },
    ]);

    const showAddForm = ref(false);
    const showEditForm = ref(false);
    const editedCard = ref<Card | null>(null);
  
    const addCard = (card: Card) => {
      card.id = Date.now();
      cards.value.push(card);
      saveToLocalStorage();
      showAddForm.value = false;
    };

    const openAddForm = () => {
      showAddForm.value = true;
    };

    const openEditForm = (card: Card) => {
      editedCard.value = { ...card };
      showEditForm.value = true;
    };

    const saveEdit = (card: Card) => {
      const cardIndex = cards.value.findIndex((c) => c.id === card.id);
      if (cardIndex !== -1) {
        cards.value[cardIndex] = { ...card };
        saveToLocalStorage();
      }
      showEditForm.value = false;
    };

    const saveToLocalStorage = () => {
      localStorage.setItem('kanbanCards', JSON.stringify(cards.value));
    };

    const loadFromLocalStorage = () => {
      const savedCards = localStorage.getItem('kanbanCards');
      if (savedCards) {
        cards.value = JSON.parse(savedCards);
      }
    };

    onMounted(loadFromLocalStorage);

    return { 
      statuses,
      cards,
      showAddForm,
      showEditForm,
      editedCard,
      addCard,
      openAddForm,
      openEditForm,
      saveEdit
    };
  },
});
</script>

<style scoped>
.kanban-column {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

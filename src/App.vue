<template>
  <v-app>
    <v-container>
      <v-btn color="primary" @click="showForm = !showForm">
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
              @edit="editCard(card)"
            />
          </div>
        </v-col>
      </v-row>
      

       <v-dialog v-model="showForm" max-width="500px" >
        <v-card
        title="Add/edit card"
      >
        
          <template #default v-slot:actions>
          <AddCardForm
            :statuses="statuses"
            :addCard="addCard"
            :editedCard="editedCard"
            :saveEdit="saveEdit"
            @close="showForm = false"
          />
        </template>
      </v-card>
      </v-dialog>
    </v-container>
  </v-app>
  
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import KanbanCard from './components/KanbanCard.vue';
import AddCardForm from './components/AddCardForm.vue';
import type { Status, Card } from './types';

export default defineComponent({
  name: 'App',
  components: { KanbanCard, AddCardForm },
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

     const saveToLocalStorage = () => {
      localStorage.setItem('kanbanCards', JSON.stringify(cards.value));
    };

    const loadFromLocalStorage = () => {
      const savedCards = localStorage.getItem('kanbanCards');
      if (savedCards) {
        cards.value = JSON.parse(savedCards);
      }
    };

    const showForm = ref(false);

    const addCard = (card: Card) => {
      card.id = Date.now();
      cards.value.push(card);
      saveToLocalStorage();
      showForm.value = false;
    };

    const editedCard = ref<Card | null>(null);

    const editCard = (card: Card) => {
      editedCard.value = { ...card };
      
      showForm.value = true;
    };

    const saveEdit = () => {
      if (editedCard.value) {
        const cardIndex = cards.value.findIndex((card) => card.id === editedCard.value?.id);
        if (cardIndex !== -1) {
          cards.value[cardIndex] = { ...editedCard.value };
          saveToLocalStorage();
        }
        showForm.value = false;
      }
    };

    onMounted(loadFromLocalStorage);

    return { statuses, cards, editedCard, addCard, editCard, saveEdit, showForm };
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

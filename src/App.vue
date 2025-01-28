<template>
  <v-app>
    <v-container>
      <div
        class="d-flex flex-column flex-md-row justify-space-between align-center mb-4 pa-4 bg-deep-purple-darken-4"
      >
        <h1 class="text-h4 text-center text-md-left text-white">Kanban Board</h1>
        <v-btn color="inherit" class="mt-2 mt-md-0" @click="openAddForm"> Add Card </v-btn>
      </div>

      <v-row>
        <v-col v-for="status in statuses" :key="status.id" cols="12" md="4" lg="2" class="pa-2">
          <h3 class="text-h5 text-center pa-2">{{ status.title }}</h3>

          <div class="kanban-column pa-2" @dragover.prevent @drop="onDrop(status)">
            <div
              class="kanban-card"
              v-for="card in filteredCards(status)"
              :key="card.id"
              draggable="true"
              @dragstart="onDragStart(card)"
              @dragend="onDragEnd"
            >
              <KanbanCard
                :title="card.title"
                :description="card.description"
                @edit="openEditForm(card)"
                @delete="openDeleteForm(card)"
              />
            </div>
          </div>
        </v-col>
      </v-row>

      <v-dialog v-model="showAddForm" max-width="500px">
        <v-card class="pa-4">
          <v-card-title class="text-center">Add a new card</v-card-title>
          <AddCardForm :statuses="statuses" :addCard="addCard" @close="showAddForm = false" />
        </v-card>
      </v-dialog>

      <v-dialog v-model="showEditForm" max-width="500px">
        <v-card class="pa-4">
          <v-card-title class="text-center">Edit card</v-card-title>
          <EditCardForm
            :statuses="statuses"
            :card="editedCard!"
            :saveEdit="saveEdit"
            @close="showEditForm = false"
          />
        </v-card>
      </v-dialog>

      <v-dialog v-model="showDeleteConfirm" max-width="500px">
        <DeleteCardConfirm
          :onDelete="deleteCard"
          :card="editedCard"
          @close="showDeleteConfirm = false"
        />
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import KanbanCard from './components/KanbanCard.vue'
import AddCardForm from './components/AddCardForm.vue'
import EditCardForm from './components/EditCardForm.vue'
import type { Status, Card } from './types'
import DeleteCardConfirm from './components/DeleteCardConfirm.vue'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  name: 'App',
  components: {
    KanbanCard,
    AddCardForm,
    EditCardForm,
    DeleteCardConfirm,
  },
  setup() {
    const statuses = ref<Status[]>([
      { id: 1, title: 'Backlog', cards: [] },
      { id: 2, title: 'Selected', cards: [] },
      { id: 3, title: 'To specify', cards: [] },
      { id: 4, title: 'In development', cards: [] },
      { id: 5, title: 'To test', cards: [] },
      { id: 6, title: 'To deploy', cards: [] },
    ])

    const cards = ref<Card[]>([
      { id: '1', title: 'Task 1', description: 'Description for Task 1', status: 'Backlog' },
      { id: '2', title: 'Task 2', description: 'Description for Task 2', status: 'Selected' },
      { id: '3', title: 'Task 3', description: 'Description for Task 3', status: 'To test' },
      { id: '4', title: 'Task 4', description: 'Description for Task 4', status: 'In development' },
    ])

    const showAddForm = ref(false)
    const showEditForm = ref(false)
    const showDeleteConfirm = ref(false)
    const editedCard = ref<Card | null>(null)
    const draggedCard = ref<Card | null>(null)

    const addCard = (card: Card) => {
      card.id = uuidv4()
      cards.value.push(card)
      saveToLocalStorage()
      showAddForm.value = false
    }

    const openAddForm = () => {
      showAddForm.value = true
    }

    const openEditForm = (card: Card) => {
      editedCard.value = { ...card }
      showEditForm.value = true
    }

    const openDeleteForm = (card: Card) => {
      editedCard.value = { ...card }
      showDeleteConfirm.value = true
    }

    const saveEdit = (card: Card) => {
      const cardIndex = cards.value.findIndex((c) => c.id === card.id)
      if (cardIndex !== -1) {
        cards.value[cardIndex] = { ...card }
        saveToLocalStorage()
      }
      showEditForm.value = false
    }

    const deleteCard = (card: Card) => {
      const cardIndex = cards.value.findIndex((c) => c.id === card.id)
      if (cardIndex !== -1) {
        cards.value.splice(cardIndex, 1)
        saveToLocalStorage()
      }
      showDeleteConfirm.value = false
    }

    const onDragStart = (card: Card) => {
      draggedCard.value = card
    }

    const onDragEnd = () => {
      draggedCard.value = null
    }

    const onDrop = (status: Status) => {
      if (draggedCard.value) {
        const updatedCards = cards.value.map((card) => {
          if (draggedCard.value && card.id === draggedCard.value.id) {
            return { ...card, status: status.title }
          }
          return card
        })

        cards.value = updatedCards
        saveToLocalStorage()
      }
    }

    const filteredCards = (status: Status) => {
      return cards.value.filter((card) => card.status === status.title)
    }

    const saveToLocalStorage = () => {
      localStorage.setItem('kanbanCards', JSON.stringify(cards.value))
    }

    const loadFromLocalStorage = () => {
      const savedCards = localStorage.getItem('kanbanCards')
      if (savedCards) {
        cards.value = JSON.parse(savedCards)
      }
    }

    onMounted(loadFromLocalStorage)

    return {
      statuses,
      cards,
      showAddForm,
      showEditForm,
      editedCard,
      showDeleteConfirm,
      addCard,
      openAddForm,
      openEditForm,
      saveEdit,
      openDeleteForm,
      deleteCard,
      onDragStart,
      onDragEnd,
      onDrop,
      filteredCards,
    }
  },
})
</script>

<style scoped>
.kanban-column {
  min-height: 200px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.kanban-card.dragging {
  opacity: 0.5;
}
</style>

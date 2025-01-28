import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import type { Card } from '../../types'
import App from '../../App.vue'

/**
 * Test Suite for App.vue
 */
describe('App.vue', () => {
  it('renders all statuses', () => {
    const wrapper = mount(App)
    const statuses = ['Backlog', 'Selected', 'To specify', 'In development', 'To test', 'To deploy']
    statuses.forEach((status) => {
      expect(wrapper.text()).toContain(status)
    })
  })

  /** Button and Form Tests*/

  it('adds a new card with valid data', async () => {
    const wrapper = mount(App)

    // Open the Add Card form
    wrapper.vm.showAddForm = true
    await wrapper.vm.$nextTick()

    const cardData: Card = {
      id: Date.now(),
      title: 'New Task',
      description: 'Task description',
      status: 'Backlog',
    }

    wrapper.vm.addCard(cardData)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.cards).toContainEqual(expect.objectContaining(cardData))
  })

  it('edits a card and saves the changes', async () => {
    const wrapper = mount(App)

    const card = wrapper.vm.cards[0]
    const updatedTitle = 'Updated Task Title'

    // Open the Edit Card form
    wrapper.vm.openEditForm(card)
    await wrapper.vm.$nextTick()

    card.title = updatedTitle
    wrapper.vm.saveEdit(card)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.cards[0].title).toBe(updatedTitle)
  })

  it('deletes a card', async () => {
    const wrapper = mount(App)

    const card = wrapper.vm.cards[0]
    wrapper.vm.openDeleteForm(card)
    await wrapper.vm.$nextTick()

    wrapper.vm.deleteCard(card)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.cards).not.toContainEqual(card)
  })

  /**
   * Drag-and-Drop Tests
   */
  it('updates card status on drop', async () => {
    const wrapper = mount(App)

    const card = wrapper.vm.cards[0]
    const newStatus = wrapper.vm.statuses[1]

    // Simulate drag and drop
    wrapper.vm.onDragStart(card)
    await wrapper.vm.$nextTick()

    wrapper.vm.onDrop(newStatus)
    await wrapper.vm.$nextTick()

    expect(card.status).toBe(newStatus.title)
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KanbanCard from '../KanbanCard.vue'

describe('KanbanCard', () => {
  it('renders title and description', () => {
    const wrapper = mount(KanbanCard, {
      props: {
        title: 'Test Task',
        description: 'This is a test task description',
      },
    })

    expect(wrapper.text()).toContain('Test Task')
    expect(wrapper.text()).toContain('This is a test task description')
  })

  it('emits edit event', async () => {
    const wrapper = mount(KanbanCard, {
      props: {
        title: 'Test Task',
        description: 'This is a test task description',
      },
    })

    const editButton = wrapper.find('[data-test="edit-button"]')
    expect(editButton.exists()).toBe(true)
    await editButton.trigger('click')
    expect(wrapper.emitted('edit')).toBeTruthy()
  })

  it('emits delete event', async () => {
    const wrapper = mount(KanbanCard, {
      props: {
        title: 'Test Task',
        description: 'This is a test task description',
      },
    })

    const deleteButton = wrapper.find('[data-test="delete-button"]')
    expect(deleteButton.exists()).toBe(true)
    await deleteButton.trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })
})

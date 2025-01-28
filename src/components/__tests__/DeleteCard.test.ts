import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import DeleteCardConfirm from '../DeleteCardConfirm.vue'

describe('DeleteCardConfirm', () => {
  it('should delete card when confirmed', async () => {
    const deleteCardMock = vi.fn()

    const wrapper = mount(DeleteCardConfirm, {
      props: {
        card: {
          id: '1',
          title: 'Task 1',
          description: 'Description for Task 1',
          status: 'Backlog',
        },
        onDelete: deleteCardMock,
      },
    })

    await wrapper.find('[data-test="deleteConfirm-button"]').trigger('click')

    expect(deleteCardMock).toHaveBeenCalledTimes(1)
    expect(deleteCardMock).toHaveBeenCalledWith({
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      status: 'Backlog',
    })
  })

  it('should close when canceled', async () => {
    const closeMock = vi.fn()
    const wrapper = mount(DeleteCardConfirm, {
      props: {
        card: {
          id: '1',
          title: 'Task 1',
          description: 'Description for Task 1',
          status: 'Backlog',
        },
        onDelete: vi.fn(),
      },
    })

    await wrapper.find('[data-test="cancelDelete-button"]').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
    expect(wrapper.emitted().close).toHaveLength(1)
  })
})

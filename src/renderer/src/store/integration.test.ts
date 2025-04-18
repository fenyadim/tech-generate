import { processStore } from '@/store/processStore'
import { techCardStore } from '@/store/techCardStore'

describe('Store Integration', () => {
  beforeEach(() => {
    techCardStore.set([])
    processStore.set({})
  })

  describe('Tech Card and Process Integration', () => {
    it('should handle card creation and process addition', () => {
      // Создаем карточку
      techCardStore.createCard()
      const card = techCardStore.get()[0]

      // Добавляем процесс
      processStore.add('Test Process', card.id)

      expect(techCardStore.get()).toHaveLength(1)
      expect(processStore.get()[card.id]).toHaveLength(1)
    })

    it('should handle card deletion with processes', () => {
      // Создаем карточку и процессы
      techCardStore.createCard()
      const card = techCardStore.get()[0]
      processStore.add('Process 1', card.id)
      processStore.add('Process 2', card.id)

      // Удаляем карточку
      techCardStore.deleteCard(card.id)
      processStore.clear(card.id)

      console.log(processStore.get())

      expect(techCardStore.get()).toHaveLength(0)
      // Процессы для удаленной карточки должны быть недоступны
      expect(processStore.get()[card.id]).toBeUndefined()
    })

    it('should handle card copying with processes', () => {
      // Создаем исходную карточку с процессами
      techCardStore.createCard()
      const originalCard = techCardStore.get()[0]
      processStore.add('Process 1', originalCard.id)
      processStore.add('Process 2', originalCard.id)

      // Копируем карточку
      techCardStore.copyCard(originalCard.id)
      const cards = techCardStore.get()
      const copiedCard = cards[1]

      // Проверяем, что процессы скопировались
      expect(processStore.get()[copiedCard.id]).toBeDefined()
      expect(processStore.get()[copiedCard.id]).toHaveLength(2)
    })
  })
})

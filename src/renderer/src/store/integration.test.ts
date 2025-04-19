import { processStore } from '@/store/processStore'
import { techCardStore } from '@/store/techCardStore'

describe('Store Integration', () => {
  // Вспомогательные функции для работы с хранилищем
  const getTechStore = () => techCardStore.getState()
  const getTechCards = () => getTechStore().techCards
  const getTechActions = () => getTechStore().actions

  const getProcessStore = () => processStore.getState()
  const getProcessItems = (id: string) => getProcessStore().processItems[id]
  const getProcessActions = (id: string) => getProcessStore().actions(id)

  beforeEach(() => {
    getTechActions().clearCards()
    getProcessActions('').setProcess({})
  })

  describe('Tech Card and Process Integration', () => {
    it('should handle card creation and process addition', () => {
      // Создаем карточку
      getTechActions().createCard()
      const card = getTechCards()[0]

      // Добавляем процесс
      getProcessActions(card.id).addProcess('Test Process')

      expect(getTechCards()).toHaveLength(1)
      expect(getProcessItems(card.id)).toHaveLength(1)
    })

    it('should handle card deletion with processes', () => {
      // Создаем карточку и процессы
      getTechActions().createCard()
      const card = getTechCards()[0]
      getProcessActions(card.id).addProcess('Process 1')
      getProcessActions(card.id).addProcess('Process 2')

      // Удаляем карточку
      getTechActions().deleteCard(card.id)
      getProcessActions(card.id).clearProcess()

      expect(getTechCards()).toHaveLength(0)
      // Процессы для удаленной карточки должны быть недоступны
      expect(getProcessItems(card.id)).toBeUndefined()
    })

    it('should handle card copying with processes', () => {
      // Создаем исходную карточку с процессами
      getTechActions().createCard()
      const originalCard = getTechCards()[0]
      getProcessActions(originalCard.id).addProcess('Process 1')
      getProcessActions(originalCard.id).addProcess('Process 2')

      getTechActions().setProcess(originalCard.id, getProcessItems(originalCard.id))

      // Копируем карточку
      getTechActions().copyCard(originalCard.id)
      const cards = getTechCards()
      const copiedCard = cards[1]

      // Проверяем, что процессы скопировались
      expect(copiedCard.process).toBeDefined()
      expect(copiedCard.process).toHaveLength(2)

      getProcessActions(originalCard.id).addProcess('Process 3')
      getTechActions().setProcess(originalCard.id, getProcessItems(originalCard.id))
      expect(getTechCards()[0].process).toHaveLength(3)

      getTechActions().copyCard(originalCard.id)
      expect(getTechCards()[1].process).toHaveLength(2)
      expect(getTechCards()[2].process).toHaveLength(3)
    })
  })
})

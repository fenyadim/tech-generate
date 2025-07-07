import { techCardStore } from './techCardStore'

describe('TechCard Store', () => {
  // Вспомогательные функции для работы с хранилищем
  const getStore = () => techCardStore.getState()
  const getCards = () => getStore().techCards
  const getActions = () => getStore().actions

  // Очистка хранилища перед каждым тестом
  beforeEach(() => {
    getActions().clearCards()
  })

  describe('createCard', () => {
    it('should create a new tech card with default values', () => {
      // Act
      getActions().createCard()
      const cards = getCards()

      // Assert
      expect(cards).toHaveLength(1)
      expect(cards[0]).toMatchObject({
        title: '',
        process: [],
        count: 1,
        isVisibleForPrint: true
      })
      expect(cards[0].id).toBeDefined()
    })
  })

  describe('setCards', () => {
    it('should set cards in array', () => {
      const mockCards = [
        {
          id: '1',
          title: 'TestTest',
          process: [
            {
              id: '1',
              title: 'Test',
              category: 4,
              description: 'Test',
              time: '3.4'
            }
          ],
          count: 1,
          isVisibleForPrint: true
        }
      ]

      getActions().setCards(mockCards)
      const cards = getCards()

      // Assert
      expect(cards).toHaveLength(1)
      expect(cards[0]).toMatchObject(mockCards[0])
      expect(cards[0].id).toBeDefined()
    })
  })

  describe('deleteCard', () => {
    it('should delete an existing card', () => {
      // Arrange
      const { createCard, deleteCard } = getActions()
      createCard()
      const cardId = getCards()[0].id

      // Act
      deleteCard(cardId)

      // Assert
      expect(getCards()).toHaveLength(0)
    })

    it('should not modify store if card id does not exist', () => {
      // Arrange
      getActions().createCard()

      // Act
      getActions().deleteCard('non-existent-id')

      // Assert
      expect(getCards()).toHaveLength(1)
    })
  })

  describe('copyCard', () => {
    it('should create a copy of an existing card with new id', () => {
      // Arrange
      const { createCard, copyCard } = getActions()
      createCard()
      const originalId = getCards()[0].id

      // Act
      copyCard(originalId)
      const cards = getCards()

      // Assert
      expect(cards).toHaveLength(2)
      expect(cards[1]).toMatchObject({
        ...cards[0],
        id: expect.not.stringMatching(originalId)
      })
    })
  })

  describe('changeTitle', () => {
    it('should update card title', () => {
      // Arrange
      const { createCard, changeTitle } = getActions()
      createCard()
      const cardId = getCards()[0].id
      const newTitle = 'New Title'

      // Act
      changeTitle(cardId, newTitle)

      // Assert
      expect(getCards()[0].title).toBe(newTitle)
    })
  })

  describe('toggleVisible', () => {
    it('should toggle card visibility', () => {
      // Arrange
      const { createCard, toggleVisible } = getActions()
      createCard()
      const cardId = getCards()[0].id
      const initialVisibility = getCards()[0].isVisibleForPrint

      // Act
      toggleVisible(cardId)

      // Assert
      expect(getCards()[0].isVisibleForPrint).toBe(!initialVisibility)
    })
  })

  describe('count operations', () => {
    it('should increment and decrement count', () => {
      // Arrange
      const { createCard, incrementCount, decrementCount } = getActions()
      createCard()
      const cardId = getCards()[0].id

      // Act & Assert - increment
      incrementCount(cardId, 1)
      expect(getCards()[0].count).toBe(2)

      // Act & Assert - decrement
      decrementCount(cardId, 1)
      expect(getCards()[0].count).toBe(1)
    })
  })
})

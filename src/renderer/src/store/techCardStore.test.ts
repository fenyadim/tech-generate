import { techCardStore } from './techCardStore'

describe('TechCard Store', () => {
  beforeEach(() => {
    techCardStore.set([])
  })

  describe('createCard', () => {
    it('should create a new tech card with default values', () => {
      techCardStore.createCard()
      const cards = techCardStore.get()

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

  describe('deleteCard', () => {
    it('should delete an existing card', () => {
      techCardStore.createCard()
      const cards = techCardStore.get()
      const cardId = cards[0].id

      techCardStore.deleteCard(cardId)
      expect(techCardStore.get()).toHaveLength(0)
    })

    it('should not modify store if card id does not exist', () => {
      techCardStore.createCard()
      techCardStore.deleteCard('non-existent-id')
      expect(techCardStore.get()).toHaveLength(1)
    })
  })

  describe('copyCard', () => {
    it('should create a copy of an existing card with new id', () => {
      techCardStore.createCard()
      const cards = techCardStore.get()
      const originalId = cards[0].id

      techCardStore.copyCard(originalId)
      const updatedCards = techCardStore.get()

      expect(updatedCards).toHaveLength(2)
      expect(updatedCards[1]).toMatchObject({
        ...cards[0],
        id: expect.not.stringMatching(originalId)
      })
    })
  })

  describe('changeTitle', () => {
    it('should update card title', () => {
      techCardStore.createCard()
      const cards = techCardStore.get()
      const cardId = cards[0].id
      const newTitle = 'New Title'

      techCardStore.changeTitle(cardId, newTitle)
      expect(techCardStore.get()[0].title).toBe(newTitle)
    })
  })

  describe('toggleVisible', () => {
    it('should toggle card visibility', () => {
      techCardStore.createCard()
      const cards = techCardStore.get()
      const cardId = cards[0].id
      const initialVisibility = cards[0].isVisibleForPrint

      techCardStore.toggleVisible(cardId)
      expect(techCardStore.get()[0].isVisibleForPrint).toBe(!initialVisibility)
    })
  })

  describe('count operations', () => {
    it('should increment and decrement count', () => {
      techCardStore.createCard()
      const cards = techCardStore.get()
      const cardId = cards[0].id

      techCardStore.incrementCount(cardId)
      expect(techCardStore.get()[0].count).toBe(2)

      techCardStore.decrementCount(cardId)
      expect(techCardStore.get()[0].count).toBe(1)
    })
  })
})

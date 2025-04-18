import { processStore } from '@/store/processStore'

describe('Process Store', () => {
  beforeEach(() => {
    processStore.set({})
  })

  describe('add', () => {
    it('should add a new process to tech card', () => {
      const techCardId = 'test-card-id'
      const processTitle = 'Test Process'

      processStore.add(processTitle, techCardId)
      const processes = processStore.get()[techCardId]

      expect(processes).toHaveLength(1)
      expect(processes[0]).toMatchObject({
        title: processTitle,
        id: expect.any(String)
      })
    })

    it('should initialize process array if not exists', () => {
      const techCardId = 'test-card-id'

      expect(processStore.get()[techCardId]).toBeUndefined()

      processStore.add('Test Process', techCardId)
      expect(processStore.get()[techCardId]).toBeDefined()
      expect(Array.isArray(processStore.get()[techCardId])).toBe(true)
    })
  })

  describe('remove', () => {
    it('should remove process from tech card', () => {
      const techCardId = 'test-card-id'
      processStore.add('Test Process', techCardId)
      const processId = processStore.get()[techCardId][0].id

      processStore.remove(processId, techCardId)
      expect(processStore.get()[techCardId]).toHaveLength(0)
    })
  })

  describe('copyProcess', () => {
    it('should copy processes to another tech card', () => {
      const targetCardId = 'target-card'
      const processes = [
        { id: '1', title: 'Process 1' },
        { id: '2', title: 'Process 2' }
      ]

      processStore.copyProcess(processes, targetCardId)
      expect(processStore.get()[targetCardId]).toEqual(processes)
    })
  })

  describe('move operations', () => {
    beforeEach(() => {
      const techCardId = 'test-card-id'
      processStore.add('Process 1', techCardId)
      processStore.add('Process 2', techCardId)
      processStore.add('Process 3', techCardId)
    })

    it('should move process up', () => {
      const techCardId = 'test-card-id'
      const processes = processStore.get()[techCardId]
      const secondProcess = processes[1].title

      processStore.moveUp(1, techCardId)
      expect(processStore.get()[techCardId][0].title).toBe(secondProcess)
    })

    it('should move process down', () => {
      const techCardId = 'test-card-id'
      const processes = processStore.get()[techCardId]
      const secondProcess = processes[1].title

      processStore.moveDown(1, techCardId)
      expect(processStore.get()[techCardId][2].title).toBe(secondProcess)
    })
  })
})

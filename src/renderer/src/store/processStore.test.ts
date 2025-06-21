import { processStore } from './processStore'

describe('Process Store', () => {
  // Вспомогательные функции для работы с хранилищем
  const getStore = () => processStore.getState()
  const getProcesses = (id: string) => getStore().processItems[id]
  const getActions = (id: string) => getStore().actions(id)
  const techCardId = 'test-card-id'

  beforeEach(() => {
    getActions(techCardId).clearProcess()
  })

  describe('add', () => {
    it('should add a new process to tech card', () => {
      const processTitle = 'Test Process'

      getActions(techCardId).addProcess(processTitle)
      const processes = getProcesses(techCardId)

      expect(processes).toHaveLength(1)
      expect(processes[0]).toMatchObject({
        title: processTitle,
        id: expect.any(String)
      })
    })

    it('should initialize process array if not exists', () => {
      expect(getProcesses(techCardId)).toBeUndefined()

      getActions(techCardId).addProcess('Test Process')
      expect(getProcesses(techCardId)).toBeDefined()
      expect(Array.isArray(getProcesses(techCardId))).toBe(true)
    })
  })

  describe('remove', () => {
    it('should remove process from tech card', () => {
      getActions(techCardId).addProcess('Test Process')
      const processId = getProcesses(techCardId)[0].id

      getActions(techCardId).removeProcess(processId)
      expect(getProcesses(techCardId)).toHaveLength(0)
    })
  })

  describe('copyProcess', () => {
    it('should copy processes to another tech card', () => {
      const processes = [
        { id: '1', title: 'Process 1' },
        { id: '2', title: 'Process 2' }
      ]

      getActions(techCardId).copyProcess(processes, techCardId)
      expect(getProcesses(techCardId)).toEqual(processes)
    })
  })

  describe('move operations', () => {
    beforeEach(() => {
      getActions(techCardId).addProcess('Process 1')
      getActions(techCardId).addProcess('Process 2')
      getActions(techCardId).addProcess('Process 3')
    })

    it('should move process up', () => {
      const processes = getProcesses(techCardId)
      const secondProcess = processes[1].title

      getActions(techCardId).moveUpProcess(1)
      expect(getProcesses(techCardId)[0].title).toBe(secondProcess)
    })

    it('should move process down', () => {
      const processes = getProcesses(techCardId)
      const secondProcess = processes[1].title

      getActions(techCardId).moveDownProcess(1)
      expect(getProcesses(techCardId)[2].title).toBe(secondProcess)
    })
  })
})

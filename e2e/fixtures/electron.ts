import { _electron, test as base, ElectronApplication, Page } from '@playwright/test'
import path from 'path'

// Определяем типы для фикстур
export type ElectronFixture = {
  electronApp: ElectronApplication
  window: Page
  sendIpcToRenderer: (channel: string, data: unknown) => Promise<void>
}

// Создаем фикстуры
export const test = base.extend<ElectronFixture>({
  // Создаем приложение для всех тестов
  electronApp: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // Путь к собранному приложению
      const electronPath = path.join(__dirname, '../../out/main/index.js')

      // Запускаем приложение
      const electronApp = await _electron.launch({
        args: [electronPath],
        executablePath: require('electron')
      })

      // Используем приложение во всех тестах
      await use(electronApp)

      // Закрываем приложение после всех тестов
      await electronApp.close()
    },
    { scope: 'test' }
  ], // scope: 'test' означает, что приложение будет перезапускаться для каждого теста

  // Создаем окно как фикстуру
  window: async ({ electronApp }, use) => {
    // Получаем первое окно приложения
    const window = await electronApp.firstWindow()

    // Ждем, пока приложение полностью загрузится
    await window.waitForLoadState('domcontentloaded')

    // Используем окно во всех тестах
    await use(window)
  },

  sendIpcToRenderer: async ({ electronApp }, use) => {
    const sendIpc = async (channel: string, data: unknown) => {
      await electronApp.evaluate(
        ({ BrowserWindow }, [ch, d]) => {
          const mainWindow = BrowserWindow.getAllWindows()[0]
          mainWindow.webContents.send(ch as string, d)
        },
        [channel, data]
      )
    }

    await use(sendIpc)
  }
})

export const expect = test.expect

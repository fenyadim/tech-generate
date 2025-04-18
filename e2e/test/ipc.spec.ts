import fs from 'fs'
import path from 'path'
import { expect, test } from '../fixtures/electron'
import { IFileOpened } from '../fixtures/types'

const mockData: IFileOpened = {
  titleTool: 'Тестовый инструмент',
  techList: [
    {
      id: '1',
      title: 'Деталь 1',
      count: 2,
      process: [
        { id: '1', title: 'Фрезерная', time: '1.5', category: 3 },
        { id: '2', title: 'Отрезная', time: '0.5', category: 5, description: 'Просто тест' },
        { id: '3', title: 'Токарная', time: '0.5', category: 4 }
      ]
    },
    {
      id: '2',
      title: 'Деталь 3',
      count: 4,
      process: [
        { id: '1', title: 'Фрезерная', time: '2.5', category: 3 },
        { id: '2', title: 'Отрезная', time: '1.5', category: 5, description: 'Просто тест' },
        { id: '3', title: 'Токарная', time: '3.5', category: 4 }
      ]
    }
  ],
  author: 'Тестовый автор',
  path: 'test/path/file.json'
}

test.describe('IPC operation', () => {
  test('should handle file opening', async ({ sendIpcToRenderer, window }) => {
    await window.waitForLoadState('networkidle')

    // Эмулируем открытие файла с тестовыми данными
    await sendIpcToRenderer('file-opened', mockData)

    await window.waitForTimeout(500)

    // Проверяем заголовок
    await expect(window.getByTestId('header-title').first()).toHaveValue(mockData.titleTool)
    await expect(window.getByTestId('header-author').first()).toHaveValue(mockData.author)

    // Проверяем карточку
    const techCard = await window.getByTestId('tech-card').all()
    techCard.forEach(async (card, i) => {
      const techList = mockData.techList[i]

      await expect(card.getByTestId('tech-card-title-input')).toHaveValue(techList.title)
      expect(await card.getByTestId('tech-card-count').textContent()).toBe(String(techList.count))

      // Проверяем кол-во процессов
      const processes = await card.getByTestId('process-item').all()
      expect(processes.length).toBe(techList.process.length)

      processes.forEach(async (process, idxProcess) => {
        const processList = techList.process[idxProcess]

        // Проверяем совпадает ли категории с моком
        await expect(process.getByTestId('process-category-input')).toHaveValue(
          String(processList.category)
        )

        // Проверяем совпадает ли время с моком
        await expect(process.getByTestId('process-norm-time-input')).toHaveValue(
          String(processList.time)
        )
      })

      // Проверяем общее время
      const totalTime = (
        techList.process.reduce((acc, item) => acc + Number(item.time), 0) * techList.count
      ).toFixed(2)
      await expect(card.getByTestId('total-sum')).toHaveText(`Общее время: ${totalTime}`)
    })

    await window.screenshot({ path: 'test-results/ipc-open-file.png' })
  })
})

test.describe('Тестирование сохранения файла', () => {
  test('Должен сохранять файл и проверять данные', async ({
    sendIpcToRenderer,
    window,
    electronApp
  }) => {
    // Создаем директорию test-results, если она не существует
    const testResultDir = path.resolve(__dirname, '../../test-results')
    if (!fs.existsSync(testResultDir)) {
      fs.mkdirSync(testResultDir, { recursive: true })
    }

    // Временный путь для тестового файла
    const tempFilePath = path.resolve(testResultDir, 'test-save.json')
    console.log('Test file path:', tempFilePath)

    // Удаляем файл если он существует от предыдущих тестов
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath)
    }

    await window.waitForLoadState('networkidle')

    // Эмулируем открытие с тестовыми данными
    await sendIpcToRenderer('file-opened', {
      ...mockData,
      path: null // Устанавливаем null, чтобы гарантировать вызов showSaveDialog
    })

    // Ждем загрузки данных
    await window.waitForTimeout(1000)

    // Проверяем что данные загрузились правильно
    await expect(window.getByTestId('header-title').first()).toHaveValue(mockData.titleTool)

    // Добавляем перехват диалога сохранения файла для main process
    await electronApp.evaluate(({ dialog }, filePath) => {
      console.log('Setting up dialog mock with path:', filePath)

      // Переопределяем метод showSaveDialog, чтобы он всегда возвращал наш временный путь
      dialog.showSaveDialog = async () => {
        console.log('Mock dialog.showSaveDialog returning path:', filePath)
        return { filePath, canceled: false }
      }
    }, tempFilePath)

    // Проверяем наличие кнопки "Сохранить"
    const saveButton = window.getByTestId('header-save-btn')
    expect(saveButton).toBeTruthy()

    // Нажимаем кнопку "Сохранить"
    await saveButton.click()

    // Увеличиваем время ожидания для записи файла
    await window.waitForTimeout(3000)

    await window.screenshot({ path: 'test-results/save-file-before-check.png' })

    // Проверяем, что файл создан
    const fileExists = fs.existsSync(tempFilePath)
    console.log('File exists check:', fileExists, tempFilePath)
    expect(fileExists).toBeTruthy()

    // Читаем и проверяем содержимое файла
    const fileContent = JSON.parse(fs.readFileSync(tempFilePath, 'utf-8'))
    expect(fileContent.titleTool).toBe(mockData.titleTool)
    expect(fileContent.author).toBe(mockData.author)
    expect(fileContent.techList.length).toBe(mockData.techList.length)
    expect(fileContent.techList[0].title).toBe(mockData.techList[0].title)
    expect(fileContent.techList[0].count).toBe(mockData.techList[0].count)
    expect(fileContent.techList[0].process.length).toBe(mockData.techList[0].process.length)

    // Проверяем путь
    expect(fileContent.path).toBe(tempFilePath)

    // Делаем скриншот для отчета
    await window.screenshot({ path: 'test-results/save-file-test.png' })

    // Удаляем тестовый файл после теста
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath)
    }
  })
})

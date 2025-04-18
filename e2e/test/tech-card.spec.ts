import { expect, test } from '../fixtures/electron'

test.describe('Tech Card Operations', () => {
  test('should create new tech card', async ({ window }) => {
    await window.waitForLoadState('networkidle')

    const addButton = window.getByTestId('add-tech-card-button')
    await expect(addButton).toBeVisible()

    await addButton.click()

    // Используем first() для получения первой карточки
    const techCard = window.getByTestId('tech-card').first()
    await expect(techCard).toBeVisible()

    // Проверяем, что карточек стало больше
    const techCards = await window.$$('[data-testid="tech-card"]')
    expect(techCards.length).toBeGreaterThan(0)

    await addButton.click()
    expect(techCards.length).toBe(2)
  })

  test('should edit tech card title', async ({ window }) => {
    // Создаем карточку
    await window.getByTestId('add-tech-card-button').click()

    // Находим поле ввода и вводим название
    const titleInput = window.getByTestId('title-input').first()
    await titleInput.click()
    await titleInput.fill('Тестовая деталь 123')

    // Проверяем, что название сохранилось
    await expect(titleInput).toHaveValue('Тестовая деталь 123')
  })

  test('should copy tech card', async ({ window }) => {
    // Создаем карточку
    await window.getByTestId('add-tech-card-button').click()

    const techCardFirst = window.getByTestId('tech-card').nth(0)
    const inputTechCardFirst = techCardFirst.getByTestId('title-input').first()
    expect(inputTechCardFirst).toBeVisible()
    await inputTechCardFirst.fill('Первая карточка')

    // Находим кнопку копирования
    const copyButton = window.getByTitle('Дублировать').first()
    await copyButton.click()

    // Проверяем, что карточек стало две
    const techCards = await window.$$('[data-testid="tech-card"]')
    expect(techCards.length).toBe(4)

    // Проверяем, что заголовок тоже скопировался
    const techCardSecond = window.getByTestId('tech-card').nth(1)
    const inputTechCardSecond = techCardSecond.getByTestId('title-input').first()
    await expect(inputTechCardSecond).toHaveValue('Первая карточка')
  })

  test('should delete tech card', async ({ window }) => {
    // Создаем карточку
    await window.getByTestId('add-tech-card-button').click()

    // Находим кнопку удаления
    const deleteButton = window.getByTitle('Удалить').first()
    await deleteButton.click()

    // Проверяем, что карточка удалилась
    const techCards = await window.$$('[data-testid="tech-card"]')
    expect(techCards.length).toBe(0)
  })
})

test.describe('Process Operations', () => {
  test('should add process to tech card', async ({ window }) => {
    // Создаем карточку
    await window.getByTestId('add-tech-card-button').click()

    // Находим кнопку добавления процесса
    const addProcessButton = window.getByTestId('add-process-btn').first()
    await addProcessButton.click()

    // Ждем появления диалога
    const dialog = window.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // Выбираем процесс "Отрезная"
    const processButton = window.getByText('Отрезная').first()
    await processButton.click()

    // Закрываем модальное окно
    await window.getByTestId('modal-close-btn').click()

    // Проверяем, что процесс добавился
    const processItems = await window.$$('[data-testid="process-item"]')
    expect(processItems.length).toBe(1)
  })

  test('should edit process parameters', async ({ window }) => {
    // Создаем карточку и добавляем процесс
    await window.getByTestId('add-tech-card-button').click()
    await window.getByTitle('Добавить процесс').first().click()
    await window.getByText('Отрезная').first().click()

    // Находим поле ввода времени
    const timeInput = window.getByPlaceholder('Норма времени').first()
    await timeInput.click()
    await timeInput.fill('1.5')

    // Проверяем, что время сохранилось
    await expect(timeInput).toHaveValue('1.5')
  })

  test('should calculate total time with multiple processes', async ({ window }) => {
    // Создаем карточку
    await window.getByTestId('add-tech-card-button').click()

    // Добавляем два процесса
    const addProcessButton = window.getByTitle('Добавить процесс').first()
    await addProcessButton.click()
    await window.getByText('Отрезная').first().click()

    await addProcessButton.click()
    await window.getByText('Фрезерная').first().click()

    // Устанавливаем время для процессов
    const timeInputs = await window.$$('input[placeholder="Норма времени"]')
    await timeInputs[0].fill('1.5')
    await timeInputs[1].fill('2.5')

    // Проверяем общее время
    const totalTime = window.getByText('Общее время: 4.00')
    await expect(totalTime).toBeVisible()
  })

  test('should reorder processes', async ({ window }) => {
    // Создаем карточку и добавляем два процесса
    await window.getByTestId('add-tech-card-button').click()
    const addProcessButton = window.getByTitle('Добавить процесс').first()

    await addProcessButton.click()
    await window.getByText('Отрезная').first().click()

    await addProcessButton.click()
    await window.getByText('Фрезерная').first().click()

    // Находим кнопки перемещения
    const moveUpButton = window.getByTitle('Переместить вверх').first()
    await moveUpButton.click()

    // Проверяем порядок процессов
    const processTitles = await window.$$('.process-title')
    expect(await processTitles[0].textContent()).toBe('Фрезерная')
    expect(await processTitles[1].textContent()).toBe('Отрезная')
  })
})

# Test info

- Name: Process Operations >> should add process to tech card
- Location: C:\Users\orlov_da\Desktop\Dima\tech-generate\e2e\test\tech-card.spec.ts:75:7

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByTestId('modal-close-btn')
    - locator resolved to <button type="button" data-testid="modal-close-btn"></button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    51 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

    at C:\Users\orlov_da\Desktop\Dima\tech-generate\e2e\test\tech-card.spec.ts:92:49
```

# Test source

```ts
   1 | import { expect, test } from '../fixtures/electron'
   2 |
   3 | test.describe('Tech Card Operations', () => {
   4 |   test('should create new tech card', async ({ window }) => {
   5 |     await window.waitForLoadState('networkidle')
   6 |
   7 |     const addButton = window.getByTestId('add-tech-card-button')
   8 |     await expect(addButton).toBeVisible()
   9 |
   10 |     await addButton.click()
   11 |
   12 |     // Используем first() для получения первой карточки
   13 |     const techCard = window.getByTestId('tech-card').first()
   14 |     await expect(techCard).toBeVisible()
   15 |
   16 |     // Проверяем, что карточек стало больше
   17 |     const techCards = await window.$$('[data-testid="tech-card"]')
   18 |     expect(techCards.length).toBeGreaterThan(0)
   19 |
   20 |     await addButton.click()
   21 |     expect(techCards.length).toBe(2)
   22 |   })
   23 |
   24 |   test('should edit tech card title', async ({ window }) => {
   25 |     // Создаем карточку
   26 |     await window.getByTestId('add-tech-card-button').click()
   27 |
   28 |     // Находим поле ввода и вводим название
   29 |     const titleInput = window.getByTestId('title-input').first()
   30 |     await titleInput.click()
   31 |     await titleInput.fill('Тестовая деталь 123')
   32 |
   33 |     // Проверяем, что название сохранилось
   34 |     await expect(titleInput).toHaveValue('Тестовая деталь 123')
   35 |   })
   36 |
   37 |   test('should copy tech card', async ({ window }) => {
   38 |     // Создаем карточку
   39 |     await window.getByTestId('add-tech-card-button').click()
   40 |
   41 |     const techCardFirst = window.getByTestId('tech-card').nth(0)
   42 |     const inputTechCardFirst = techCardFirst.getByTestId('title-input').first()
   43 |     expect(inputTechCardFirst).toBeVisible()
   44 |     await inputTechCardFirst.fill('Первая карточка')
   45 |
   46 |     // Находим кнопку копирования
   47 |     const copyButton = window.getByTitle('Дублировать').first()
   48 |     await copyButton.click()
   49 |
   50 |     // Проверяем, что карточек стало две
   51 |     const techCards = await window.$$('[data-testid="tech-card"]')
   52 |     expect(techCards.length).toBe(4)
   53 |
   54 |     // Проверяем, что заголовок тоже скопировался
   55 |     const techCardSecond = window.getByTestId('tech-card').nth(1)
   56 |     const inputTechCardSecond = techCardSecond.getByTestId('title-input').first()
   57 |     await expect(inputTechCardSecond).toHaveValue('Первая карточка')
   58 |   })
   59 |
   60 |   test('should delete tech card', async ({ window }) => {
   61 |     // Создаем карточку
   62 |     await window.getByTestId('add-tech-card-button').click()
   63 |
   64 |     // Находим кнопку удаления
   65 |     const deleteButton = window.getByTitle('Удалить').first()
   66 |     await deleteButton.click()
   67 |
   68 |     // Проверяем, что карточка удалилась
   69 |     const techCards = await window.$$('[data-testid="tech-card"]')
   70 |     expect(techCards.length).toBe(0)
   71 |   })
   72 | })
   73 |
   74 | test.describe('Process Operations', () => {
   75 |   test('should add process to tech card', async ({ window }) => {
   76 |     // Создаем карточку
   77 |     await window.getByTestId('add-tech-card-button').click()
   78 |
   79 |     // Находим кнопку добавления процесса
   80 |     const addProcessButton = window.getByTestId('add-process-btn').first()
   81 |     await addProcessButton.click()
   82 |
   83 |     // Ждем появления диалога
   84 |     const dialog = window.getByRole('dialog')
   85 |     await expect(dialog).toBeVisible()
   86 |
   87 |     // Выбираем процесс "Отрезная"
   88 |     const processButton = window.getByText('Отрезная').first()
   89 |     await processButton.click()
   90 |
   91 |     // Закрываем модальное окно
>  92 |     await window.getByTestId('modal-close-btn').click()
      |                                                 ^ Error: locator.click: Target page, context or browser has been closed
   93 |
   94 |     // Проверяем, что процесс добавился
   95 |     const processItems = await window.$$('[data-testid="process-item"]')
   96 |     expect(processItems.length).toBe(1)
   97 |   })
   98 |
   99 |   test('should edit process parameters', async ({ window }) => {
  100 |     // Создаем карточку и добавляем процесс
  101 |     await window.getByTestId('add-tech-card-button').click()
  102 |     await window.getByTitle('Добавить процесс').first().click()
  103 |     await window.getByText('Отрезная').first().click()
  104 |
  105 |     // Находим поле ввода времени
  106 |     const timeInput = window.getByPlaceholder('Норма времени').first()
  107 |     await timeInput.click()
  108 |     await timeInput.fill('1.5')
  109 |
  110 |     // Проверяем, что время сохранилось
  111 |     await expect(timeInput).toHaveValue('1.5')
  112 |   })
  113 |
  114 |   test('should calculate total time with multiple processes', async ({ window }) => {
  115 |     // Создаем карточку
  116 |     await window.getByTestId('add-tech-card-button').click()
  117 |
  118 |     // Добавляем два процесса
  119 |     const addProcessButton = window.getByTitle('Добавить процесс').first()
  120 |     await addProcessButton.click()
  121 |     await window.getByText('Отрезная').first().click()
  122 |
  123 |     await addProcessButton.click()
  124 |     await window.getByText('Фрезерная').first().click()
  125 |
  126 |     // Устанавливаем время для процессов
  127 |     const timeInputs = await window.$$('input[placeholder="Норма времени"]')
  128 |     await timeInputs[0].fill('1.5')
  129 |     await timeInputs[1].fill('2.5')
  130 |
  131 |     // Проверяем общее время
  132 |     const totalTime = window.getByText('Общее время: 4.00')
  133 |     await expect(totalTime).toBeVisible()
  134 |   })
  135 |
  136 |   test('should reorder processes', async ({ window }) => {
  137 |     // Создаем карточку и добавляем два процесса
  138 |     await window.getByTestId('add-tech-card-button').click()
  139 |     const addProcessButton = window.getByTitle('Добавить процесс').first()
  140 |
  141 |     await addProcessButton.click()
  142 |     await window.getByText('Отрезная').first().click()
  143 |
  144 |     await addProcessButton.click()
  145 |     await window.getByText('Фрезерная').first().click()
  146 |
  147 |     // Находим кнопки перемещения
  148 |     const moveUpButton = window.getByTitle('Переместить вверх').first()
  149 |     await moveUpButton.click()
  150 |
  151 |     // Проверяем порядок процессов
  152 |     const processTitles = await window.$$('.process-title')
  153 |     expect(await processTitles[0].textContent()).toBe('Фрезерная')
  154 |     expect(await processTitles[1].textContent()).toBe('Отрезная')
  155 |   })
  156 | })
  157 |
```
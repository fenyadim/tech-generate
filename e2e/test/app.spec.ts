import { expect, test } from '../fixtures/electron'

test.describe('Basic Application Tests', () => {
  test('should show main application elements', async ({ window }) => {
    // Проверяем наличие основных элементов
    await expect(window.getByText('Добавить новую')).toBeVisible()
    await expect(window.locator('header')).toBeVisible()
  })

  test('should have correct initial state', async ({ window }) => {
    // Проверяем, что изначально нет карточек
    const techCards = await window.$$('.tech-card')
    expect(techCards.length).toBe(0)
  })
})

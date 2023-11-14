import { test, expect, type Page } from '@playwright/test';

test.describe('Checkin page', () => {
  test('should load default route', async ({page}) => {
    await page.goto('http://localhost:4200');

    await expect(page).toHaveTitle('Checkin');
  });

  test('should has the checkin form', async ({page}) => {
    await page.goto('http://localhost:4200');

    expect(page.locator('form')).toBeDefined();
  });

  test('should not rout with empty form', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.locator('[data-test="form-button"]').click();

    await expect(page).toHaveURL('http://localhost:4200');
    await expect(page.locator('.message-error')).toHaveCount(3);
    await expect(page.locator('.message-error').first()).toContainText('Required');
  });

  test('should view server error message with invalid data', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.locator('.form__input').first().fill('diaa');
    await page.locator('.form__input').nth(1).fill('123');
    await page.locator('.form__input').nth(2).fill('2023-11-14');

    await page.locator('[data-test="form-button"]').click();

    await expect(page).toHaveURL('http://localhost:4200');
    await expect(page.locator('[data-test="server-error"]')).toContainText('Family name invalid');
  });

  test('should rout success page with valid data', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.locator('.form__input').first().fill('hammad');
    await page.locator('.form__input').nth(1).fill('123');
    await page.locator('.form__input').nth(2).fill('2023-11-14');

    await page.locator('[data-test="form-button"]').click();

    await expect(page).toHaveURL('http://localhost:4200/success');
    await expect(page.locator('[data-test="checkin-success"]')).toContainText('Check-in successful!');
  });

});

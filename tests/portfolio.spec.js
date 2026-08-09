import { test, expect } from '@playwright/test';

test.describe('Alif Rahman portfolio', () => {
  test('loads with the correct document title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Alif Rahman/);
  });

  test('renders the hero heading and nav', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Software Engineer');

    // Nav links to the main sections should be present.
    for (const label of ['Experience', 'Skills', 'Projects', 'Accolades', 'Contact']) {
      await expect(page.getByRole('link', { name: label, exact: false }).first()).toBeVisible();
    }
  });

  test('shows the projects section with at least one card', async ({ page }) => {
    await page.goto('/#projects');
    const section = page.locator('#projects');
    await expect(section).toBeVisible();
    await expect(section.getByRole('heading', { name: 'Featured Projects' })).toBeVisible();
    await expect(section.locator('h3').first()).toBeVisible();
  });

  test('contact section is reachable and has a working mailto', async ({ page }) => {
    await page.goto('/#contact');
    const section = page.locator('#contact');
    await expect(section).toBeVisible();
    await expect(section.getByText(/Legacy-Worthy/i)).toBeVisible();
  });
});

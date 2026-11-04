import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/services', '/reviews', '/about', '/quote', '/privacy'];

for (const path of pages) {
  test(`no axe violations: ${path}`, async ({ page }) => {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes[0].html}`)).toEqual([]);
  });

  test(`no sideways scroll at 320px or console errors: ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    expect(errors).toEqual([]);
  });
}

test('quote form announces errors, focuses the first, and sends nothing', async ({ page }) => {
  const outbound: string[] = [];
  page.on('request', (r) => r.method() !== 'GET' && outbound.push(r.url()));
  await page.goto('/quote');
  await page.getByRole('button', { name: 'Request my free quote' }).click();

  const service = page.getByLabel('What do you need?');
  await expect(service).toBeFocused();
  await expect(service).toHaveAttribute('aria-invalid', 'true');
  await expect(service).toHaveAccessibleDescription(/Choose the type of work/);

  await service.selectOption('plumbing');
  await page.getByLabel('Tell us about the job').fill('Dripping kitchen tap');
  await page.getByLabel('Your name').fill('Sam Taylor');
  await page.getByLabel('Job postcode').fill('MK8 8DD');
  await page.getByLabel('Phone').fill('07700 900123');
  await page.getByRole('button', { name: 'Request my free quote' }).click();

  await expect(page.getByRole('heading', { name: 'Thanks, Sam.' })).toBeVisible();
  expect(outbound).toEqual([]);
});

test('no axe violations with form errors showing', async ({ page }) => {
  await page.goto('/quote');
  await page.getByRole('button', { name: 'Request my free quote' }).click();
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(violations.map((v) => `${v.id}: ${v.nodes[0].html}`)).toEqual([]);
});

test('mobile menu opens with focus inside, passes axe, and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(violations.map((v) => `${v.id}: ${v.nodes[0].html}`)).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).toBeHidden();
});

test('sticky action bar does not cover a focused control', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 500 });
  await page.goto('/quote');
  await page.locator('#phone').focus();
  const overlap = await page.evaluate(() => {
    const field = document.querySelector('#phone')!.getBoundingClientRect();
    const bar = document.querySelector('.fixed.bottom-0')!.getBoundingClientRect();
    return field.bottom > bar.top && field.top < bar.bottom && field.top >= bar.top;
  });
  expect(overlap).toBe(false);
});

test('service links preselect the form', async ({ page }) => {
  await page.goto('/quote?service=gardening');
  await expect(page.getByLabel('What do you need?')).toHaveValue('gardening');
});

test('keyboard reaches the skip link first and no hidden field in the form', async ({ page }) => {
  await page.goto('/quote');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await expect(page.locator('#company')).toBeHidden();
});

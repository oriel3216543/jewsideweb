import { test, expect } from '@playwright/test';

test.describe('Basic smoke tests', () => {
  test('should load homepage and navigate to Hebrew', async ({ page }) => {
    // Navigate to homepage (English by default)
    await page.goto('http://localhost:3000/en');
    
    // Check if the navbar is visible
    await expect(page.locator('header')).toBeVisible();
    
    // Check if hero section is visible
    await expect(page.getByRole('heading', { name: /Explore Jewish Traditions/i })).toBeVisible();
    
    // Find and click language toggle
    await page.getByRole('button', { name: 'Select language' }).click();
    await page.getByRole('menuitem', { name: 'עברית' }).click();
    
    // Check if URL changed to Hebrew
    await expect(page).toHaveURL(/\/he/);
    
    // Check RTL direction
    const html = await page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
  });

  test('should toggle dark mode', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3000/en');
    
    // Check if theme toggle is visible
    const themeToggle = page.getByRole('button', { name: 'Toggle dark mode' });
    await expect(themeToggle).toBeVisible();
    
    // Toggle theme to dark
    await themeToggle.click();
    
    // Check if html has dark class
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Toggle back to light
    await themeToggle.click();
    
    // Check if html doesn't have dark class
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
  
  test('mobile navigation works', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Navigate to homepage
    await page.goto('http://localhost:3000/en');
    
    // Find and click menu button
    await page.getByRole('button', { name: 'Menu' }).click();
    
    // Check if mobile menu is visible
    await expect(page.getByRole('link', { name: 'Explore' })).toBeVisible();
    
    // Click on Explore link
    await page.getByRole('link', { name: 'Explore' }).click();
    
    // Check if URL changed to explore page
    await expect(page).toHaveURL(/\/en\/explore/);
  });
});

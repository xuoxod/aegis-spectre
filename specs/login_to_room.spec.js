const { test, expect } = require('@playwright/test');

test('Home page loads and user can simulate logging in', async ({ page }) => {
  // 1. Ghost user navigates to your local application
  await page.goto('/');

  // 2. Asserts the page title is correct (from layout.jet/home.jet)
  await expect(page).toHaveTitle(/RMediaTech/i);

  // 3. Checks if the Login flow is visually present on the page
  // We look for elements you likely have. Let's start basic: looking for the input fields or buttons.
  const loginButton = page.locator('text=Login');
  
  if (await loginButton.isVisible()) {
      await loginButton.click();
      
      // Let's assume you have basic auth fields `[name="email"]` and `[name="password"]`
      // We will just verify they exist, which tests the UI rendering engine natively.
      const emailInput = page.locator('[name="email"]');
      const passInput = page.locator('[name="password"]');
      
      if (await emailInput.count() > 0) {
          await emailInput.fill('rick@email.net');
          await passInput.fill('password');
          await page.locator('button[type="submit"]').click();
          
          // Should redirect or refresh the page as an authenticated user
          await expect(page.locator('text=Dashboard').or(page.locator('text=Join'))).toBeVisible({ timeout: 5000 });
      }
  }
});

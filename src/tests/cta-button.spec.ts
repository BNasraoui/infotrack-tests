import { test, expect } from '@playwright/test';
import { ConsultingPage } from '../pages/ConsultingPage';

/**
 * Test suite for validating "SCHEDULE A FREE DISCOVERY SESSION" CTAs
 * on the Ultimate QA Consulting page
 */
test.describe('CTA Button Testing', () => {
  let consultingPage: ConsultingPage;

  test.beforeEach(async ({ page }) => {
    // Initialize the consulting page object
    consultingPage = new ConsultingPage(page);
    
    // Navigate to the consulting page
    await consultingPage.goto();
  });

  test('should validate all CTA button functionality', async () => {
    // 1. Check presence of CTA buttons
    const ctaButtons = await consultingPage.getAllCtaButtons();
    expect(ctaButtons.length).toBeGreaterThanOrEqual(4);
    console.log(`Found ${ctaButtons.length} CTA buttons on the page`);

    // 2. Verify all buttons have correct destination
    await consultingPage.verifyCtaDestinations();
    console.log('All CTA buttons have correct destination URLs');

    // 3. Verify visibility and clickability
    await consultingPage.verifyCtaButtonsVisibility();
    console.log('All CTA buttons are visible and clickable');

    // 4. Test navigation functionality
    const newPage = await consultingPage.clickFirstCtaButton();
    expect(newPage.url()).toContain('framework-assessment');
    console.log(`Successfully navigated to: ${newPage.url()}`);
  });
}); 
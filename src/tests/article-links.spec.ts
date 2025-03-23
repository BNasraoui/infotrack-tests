import { test, expect } from '@playwright/test';
import { ConsultingPage } from '../pages/ConsultingPage';

/**
 * Test suite for validating Article Links Redirect to correct page
 * on the Ultimate QA Consulting page
 */
test.describe('Article Links Testing', () => {
    let consultingPage: ConsultingPage;
  
    // Define just the essential article details
    const articleLinks = [
      {
        title: 'AUTOMATION PROGRAM FROM SCRATCH',
        expectedUrl: 'https://ultimateqa.com/daily-time-savings/'
      },
      {
        title: 'Insurance company reduces feedback cycle by 82% using automation',
        expectedUrl: 'https://ultimateqa.com/reduces-feedback-cycle/'
      },
      {
        title: '66% FASTER FEEDBACK LOOP',
        expectedUrl: 'https://ultimateqa.com/automation-saves-hospitality-business-66-in-test-execution-time/'
      },
      {
        title: 'Automation Program Development for a Large Healthcare Organization',
        expectedUrl: 'https://ultimateqa.com/automation-development-for-healthcare-organization/'
      },
      {
        title: '150K+ ENGINEERS TRAINED IN 184 COUNTRIES',
        expectedUrl: 'https://ultimateqa.com/from-novice-to-senior-developer/'
      }
    ];
  
    test.beforeEach(async ({ page }) => {
      consultingPage = new ConsultingPage(page);
      await consultingPage.goto();
    });
  
    test('Verify article links navigate to correct URLs', async ({ page, context }) => {
      for (const article of articleLinks) {
        console.log(`\nTesting navigation for article: ${article.title}`);

        // Get the article section containing both heading and link
        const articleSection = page
          .getByRole('heading', { name: article.title })
          .locator('xpath=../../..');  // Go up to the container
        
        // Find the "See Full Story" link within this section
        const storyLink = articleSection.getByRole('link', { name: 'See Full Story 9' });
        
        // Check if link opens in new tab
        const target = await storyLink.getAttribute('target');
        
        if (target === '_blank') {
          const pagePromise = context.waitForEvent('page');
          await storyLink.click();
          const newPage = await pagePromise;
          await newPage.waitForLoadState('networkidle');
          expect(newPage.url()).toBe(article.expectedUrl);
          await newPage.close();
          console.log(`✓ Article opened in new tab with correct URL: ${article.expectedUrl}`);
        } else {
          await storyLink.click();
          await page.waitForURL(article.expectedUrl);
          expect(page.url()).toBe(article.expectedUrl);
          console.log(`✓ Article opened in same window with correct URL: ${article.expectedUrl}`);
        }

        await consultingPage.goto();
      }
    });
});
import { test, expect, Page } from '@playwright/test';
import { ConsultingPage } from '../pages/ConsultingPage';

/**
 * Test suite for validating article sections
 * on the Ultimate QA Consulting page
 */
test.describe('Article Section Testing', () => {
  let consultingPage: ConsultingPage;
  
  // Define expected service sections with their details
  const serviceSections = [
    {
      title: 'Automation Program Creation',
      iconAlt: 'consulting'
    },
    {
      title: 'Framework Assessment',
      iconAlt: 'assessment'
    },
    {
      title: 'Test Strategy Consultation',
      iconAlt: 'strategy'
    },
    {
      title: 'Test Automation Training',
      iconAlt: 'testing'
    },
    {
      title: 'Web, Mobile & API Automation',
      iconAlt: 'Staff Augmentation'
    },
    {
      title: 'Web Development',
      iconAlt: 'Web Development'
    }
  ];

  const enterpriseServices = [
    {
      title: 'Salesforce Automation',
      description: 'Our team excels in automating Salesforce applications'
    },
    {
      title: 'BDD Automation Overhaul',
      description: 'We are masters at improving or eliminating poorly implemented BDD automation'
    },
    {
      title: 'Customized Automation Solutions',
      description: 'Ultimate QA takes pride in building scalable and efficient automation systems'
    }
  ];

  test.beforeEach(async ({ page }) => {
    // Initialize the consulting page object
    consultingPage = new ConsultingPage(page);
    
    // Navigate to the consulting page
    await consultingPage.goto();
  });

  test('Verify Page Content', async ({ page }) => {
    await validateServiceSections(page, serviceSections);
    await validateMainHeadline(page);
    await validateEnterpriseSection(page, enterpriseServices);
    await validateTestimonials(page);
  });
}); 

async function validateMainHeadline(page: Page) {
  console.log('\nValidating main headline section');
  const mainHeadline = page.getByText("World's Best Test Automation Solutions");
  await expect(mainHeadline).toBeVisible();
  console.log('✓ Main headline is visible');
}

async function validateServiceSections(page: Page, serviceSections: { title: string, iconAlt: string }[]) {
  for (const section of serviceSections) {
    console.log(`\nValidating section: ${section.title}`);
    
    // Find the section container
    const sectionHeader = page.getByRole('heading', { name: section.title });
    await expect(sectionHeader).toBeVisible();
    console.log('✓ Section header is visible');

    const sectionContainer = sectionHeader.locator('xpath=../..').first();
    
    const icon = sectionContainer.locator('img').first();
    await expect(icon).toBeVisible();
    const iconAlt = await icon.getAttribute('alt');
    expect(iconAlt?.toLowerCase()).toContain(section.iconAlt.toLowerCase());
    console.log('✓ Section icon is present and correct');
  }
}

async function validateEnterpriseSection(page: Page, enterpriseServices: Array<{ title: string, description: string }>) {
  console.log('\nValidating enterprise section');

  // Verify enterprise section header
  const enterpriseHeader = page.getByRole('heading', { name: 'Leading the World In Automated Testing' });
  await expect(enterpriseHeader).toBeVisible();
  console.log('✓ Enterprise header is visible');

  // Verify enterprise description
  const enterpriseDescription = page.locator('.et_pb_text_2 p');
  await expect(enterpriseDescription).toBeVisible();
  const descriptionText = await enterpriseDescription.textContent();
  expect(descriptionText).toContain('Ultimate QA is your one-stop solution');
  console.log('✓ Enterprise description is present and correct');

  // Verify "For Enterprises:" label
  const enterpriseLabel = page.locator('.et_pb_text_3 p strong');
  await expect(enterpriseLabel).toBeVisible();
  await expect(enterpriseLabel).toHaveText('For Enterprises:');
  console.log('✓ Enterprise label is visible');

  // Verify each enterprise service
  for (const service of enterpriseServices) {
    console.log(`\nValidating enterprise service: ${service.title}`);

    // Find the service container
    const serviceHeader = page.getByRole('heading', { name: service.title });
    await expect(serviceHeader).toBeVisible();
    console.log('✓ Service header is visible');

    // Verify service description
    const serviceContainer = serviceHeader.locator('xpath=../..').first();
    const description = serviceContainer.locator('.et_pb_blurb_description p');
    await expect(description).toBeVisible();
    const descText = await description.textContent();
    expect(descText).toContain(service.description);
    console.log('✓ Service description matches expected text');
  }

  // Verify CTA button
  const ctaButton = page.locator('.et_pb_button_1');
  await expect(ctaButton).toBeVisible();
  await expect(ctaButton).toHaveText('SCHEDULE A FREE DISCOVERY SESSION');
  const href = await ctaButton.getAttribute('href');
  expect(href).toContain('forms.clickup.com');
  console.log('✓ Enterprise CTA button is present and correctly linked');
}

async function validateTestimonials(page: Page) {
   console.log('\nValidating testimonials section');
   const testimonialsHeader = page.getByRole('heading', { name: 'Our clients are thrilled!' });
   await expect(testimonialsHeader).toBeVisible();
   console.log('✓ Testimonials header is visible');

   const testimonials = await page.locator('.et_pb_testimonial').all();
   expect(testimonials.length).toBeGreaterThanOrEqual(3);
   console.log(`✓ Found ${testimonials.length} testimonials`);

  for (let i = 0; i < testimonials.length; i++) {
    const testimonial = testimonials[i];
     
    // Validate testimonial content
    const content = testimonial.locator('.et_pb_testimonial_content');
    await expect(content).toBeVisible();
    const testimonialText = await content.textContent();
    expect(testimonialText?.trim().length).toBeGreaterThan(0);
    
    // Verify Author Exists
    const author = testimonial.locator('.et_pb_testimonial_author');
    await expect(author).toBeVisible();
    const authorName = await author.textContent();
    expect(authorName?.trim().length).toBeGreaterThan(0);
    console.log(`✓ Testimonial ${i + 1} has an author: "${authorName}"`);
    
    // Author Has a Role
    const role = testimonial.locator('.et_pb_testimonial_position');
    await expect(role).toBeVisible();
    const roleText = await role.textContent();
    expect(roleText?.trim().length).toBeGreaterThan(0);
    console.log(`✓ Testimonial ${i + 1} has a role: "${roleText}"`);

    // Author Has a Company
    const company = testimonial.locator('.et_pb_testimonial_company');
    await expect(company).toBeVisible();
    const companyText = await company.textContent();
    expect(companyText?.trim().length).toBeGreaterThan(0);
    console.log(`✓ Testimonial ${i + 1} has a company: "${companyText}"`);
  }
}
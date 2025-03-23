import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Ultimate QA Consulting page
 */
export class ConsultingPage {
  readonly page: Page;
  readonly url: string = 'https://ultimateqa.com/consulting/';
  
  // Main elements
  readonly mainMenu: Locator;
  readonly mobileMenuButton: Locator;
  
  // CTA elements
  readonly ctaButtons: Locator;
  readonly expectedCtaDestination: string = 'https://forms.clickup.com/2314027/p/f/26ktb-6387/56LKNUZ9BDYXSC73SY/unlock-your-automation-potentialwitha-free-framework-assessment';
  
  // Service sections
  readonly serviceHeaders: Locator;
  readonly serviceBlurbs: Locator;
  readonly serviceIcons: Locator;
  
  // Testimonials
  readonly testimonialsHeader: Locator;
  readonly testimonials: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.mainMenu = this.page.locator('#main-menu');
    this.mobileMenuButton = this.page.locator('.et_mobile_nav_menu');
    this.ctaButtons = this.page.getByRole('link', { name: /SCHEDULE A FREE DISCOVERY SESSION/i });
    this.serviceHeaders = this.page.getByRole('heading').filter({ hasText: /(Automation Program Creation|Framework Assessment|Test Strategy Consultation|Test Automation Training|Web, Mobile & API Automation|Web Development)/i });
    this.serviceBlurbs = this.page.locator('.et_pb_blurb_content');
    this.serviceIcons = this.page.locator('.et_pb_blurb_content img');
    this.testimonialsHeader = this.page.getByRole('heading', { name: 'Our clients are thrilled!' });
    this.testimonials = this.page.locator('.et_pb_testimonial');
  }

  /**
   * Navigate to the consulting page
   */
  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get all CTA buttons
   * @returns array of CTA button locators
   */
  async getAllCtaButtons() {
    return await this.ctaButtons.all();
  }

  /**
   * Check if all CTA buttons have the correct href
   */
  async verifyCtaDestinations() {
    const buttons = await this.getAllCtaButtons();
    for (let i = 0; i < buttons.length; i++) {
      const href = await buttons[i].getAttribute('href');
      expect(href).toBe(this.expectedCtaDestination);
    }
  }

  /**
   * Check if all CTA buttons are visible and clickable
   */
  async verifyCtaButtonsVisibility() {
    const buttons = await this.getAllCtaButtons();
    for (const button of buttons) {
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    }
  }

  /**
   * Click the first CTA button and wait for navigation
   * @returns the new page that opens
   */
  async clickFirstCtaButton() {
    const firstButton = this.ctaButtons.first();
    const pagePromise = this.page.context().waitForEvent('page');
    await firstButton.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState('networkidle');
    return newPage;
  }

  /**
   * Get all service section headers
   * @returns array of service section header texts
   */
  async getServiceHeaders() {
    const headers = await this.serviceHeaders.all();
    return Promise.all(headers.map(async (header) => await header.textContent()));
  }

  /**
   * Set viewport size for responsive testing
   * @param width viewport width
   * @param height viewport height
   */
  async setViewport(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  /**
   * Check if main menu or mobile menu is displayed based on viewport
   * @returns true if the appropriate menu is visible
   */
  async isAppropriateMenuVisible() {
    const isMainMenuVisible = await this.mainMenu.isVisible();
    const isMobileMenuVisible = await this.mobileMenuButton.isVisible();
    return isMainMenuVisible || isMobileMenuVisible;
  }

  /**
   * Get service columns in the first row
   * @returns array of service column locators
   */
  async getServiceColumnsInFirstRow() {
    const serviceRows = await this.page.locator('.et_pb_row').filter({ hasText: 'Automation Program Creation' }).all();
    const firstRow = serviceRows[0];
    return await firstRow.locator('.et_pb_column').all();
  }

  /**
   * Check if text elements maintain minimum font size
   * @param minFontSize minimum acceptable font size in pixels
   */
  async verifyTextReadability(minFontSize: number = 12) {
    const descriptions = await this.page.locator('.et_pb_blurb_description').all();
    
    for (const description of descriptions) {
      await expect(description).toBeVisible();
      
      const fontSize = await description.evaluate(el => 
        window.getComputedStyle(el).getPropertyValue('font-size')
      );
      
      const fontSizeValue = parseFloat(fontSize);
      expect(fontSizeValue).toBeGreaterThanOrEqual(minFontSize);
    }
  }

  /**
   * Check if testimonials are displayed correctly
   */
  async verifyTestimonials() {
    await expect(this.testimonialsHeader).toBeVisible();
    
    const testimonials = await this.testimonials.all();
    expect(testimonials.length).toBeGreaterThanOrEqual(3);
    
    for (const testimonial of testimonials) {
      const content = testimonial.locator('.et_pb_testimonial_content');
      const author = testimonial.locator('.et_pb_testimonial_author');
      
      await expect(content).toBeVisible();
      await expect(author).toBeVisible();
    }
  }
} 
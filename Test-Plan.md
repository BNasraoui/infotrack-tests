# Test Plan: Ultimate QA Consulting Page

## 1. Risk-Based Testing

### 1.1 High-Risk Areas
- **Call-to-Action Buttons**: "SCHEDULE A FREE DISCOVERY SESSION" buttons that appear multiple times on the page are critical for lead generation
- **Navigation Menu Functionality**: Essential for users to navigate to other sections of the site
- **Page Performance**: Loading speed and responsiveness affect user experience and engagement
- **Mobile Responsiveness**: The page must function properly across various devices as many users will access via mobile
- **Visual Elements and Service Descriptions**: Correct display of service offerings and icons is critical for business presentation

### 1.2 Medium-Risk Areas
- **Testimonial Section**: Client testimonials that build credibility but aren't critical for page function
- **Search Functionality**: Important but not critical as users can navigate directly
- **Image Loading**: Service icons and other visual elements should display correctly
- **Browser Compatibility**: The page should work on all major browsers
- **Header/Footer Links**: Navigation to other site sections

### 1.3 Low-Risk Areas
- **Social Media Links**: Secondary functionality for marketing purposes
- **Animation Effects**: Visual enhancements that don't affect core functionality
- **Footer Information**: Legal and secondary links
- **Font Rendering**: Minor variations in typography across devices

### 1.4 Risk Mitigation Strategies
- Prioritize testing of the "SCHEDULE A FREE DISCOVERY SESSION" links & Article Links
- Implement automated tests for the main user journey
- Test responsiveness across different viewports (mobile & desktop)
- Verify all service description sections render correctly
- Test navigation menu functionality thoroughly

## 2. What to Test

### 2.1 Functionality

- **Call-to-Action Buttons**:
  - Verify all "SCHEDULE A FREE DISCOVERY SESSION" buttons link to the correct destination
  - Test that these buttons are clickable and redirect the correct form

- **Content Sections**:
  - Verify all six service offering sections display correctly:
    1. Automation Program Creation
    2. Framework Assessment
    3. Test Strategy Consultation
    4. Test Automation Training
    5. Web, Mobile & API Automation
    6. Web Development
  - Test that all testimonial sections load properly

- **Article Links**
 - Verify all article links are redirecting to the correct page

### 2.2 Usability
- Test that important elements are visible without scrolling on standard screens
- Check that service descriptions are clear and legible
- Verify testimonials are displayed in a readable format
- Assess overall user flow from landing on the page to clicking a call-to-action

### 2.3 Compatibility
- **Browser Testing**:
  - Chrome
  - Firefox
  - Safari
  - Edge

- **Device Testing**:
  - Desktop (1920×1080)
  - Mobile (iPhone/375×667, Samsung/360×740)

### 2.4 Visual Validation
- Layout integrity across different viewport sizes
- Service icon alignment and rendering
- Consistent spacing and margins between sections
- Color consistency with brand guidelines
- Text contrast for readability

## 3. What Not to Test

### 3.1 External Links Destinations
- External systems that "SCHEDULE A FREE DISCOVERY SESSION" buttons link to
- Third-party systems beyond the consulting page itself
- Social media platforms linked from the page

### 3.2 Content Accuracy
- Factual accuracy of service descriptions (assuming content has been reviewed)
- Validity of client testimonials (assuming these are verified by the business)
- SEO effectiveness of the page content

### 3.3 Backend Systems
- Server-side processing related to form submissions
- Database operations
- Authentication systems (if the discovery session links to a protected area)

### 3.4 Other Site Pages
- Other pages on the website beyond the consulting page
- Admin interfaces
- Account management functionality

---

## Test Execution Results

### Test Scenario Results

| ID | Test Scenario | Expected Result | Actual Result | Status | Severity | Priority |
|----|---------------|-----------------|--------------|--------|----------|----------|
| F01 | "SCHEDULE A FREE DISCOVERY SESSION" Button Functionality | All CTA buttons link to correct destination | As Expected | Pass | Medium | High |
| F02 | Service Sections Display | All service sections render correctly with associated content| As Expected | Pass | Low | Low |
| F03 | Testimonials Display | Client testimonials display correctly | As Expected | Pass | Low | Low |
| F04 | Article Link Redirects | All articles redirect to an appropriate associated article | Pass | Low | Medium | 
| F05 | Visual Consistency | Visual elements maintain alignment across viewports | As Expected | Pass | Low| Low |

### Bugs Found

#### Bug-01 A Warning Relating to CTA is present in Console On Page Load. 

**Description**: On page load, a warning relating to CTA is present in the console. Looking at the code where the warning is called:

```javascript
init: function() {
        console.log("sniply init called");
        if (sniply.ran)
            return;
        sniply.ran = !0;
        if (sniply.website.should_have_cta) {
            window.ctaData = sniply.ctaData;
            var ctaRendererRootDiv = document.createElement('div');
            ctaRendererRootDiv.id = "sniply-cta-root";
            switch (sniply.ctaData.position) {
            case 'top':
                ctaRendererRootDiv.style.top = '0';
                ctaRendererRootDiv.style.left = '0';
                break;
            case 'top-right':
                ctaRendererRootDiv.style.top = '0';
                ctaRendererRootDiv.style.right = '0';
                break;
            case 'bottom':
                ctaRendererRootDiv.style.bottom = '0';
                ctaRendererRootDiv.style.left = '0';
                break;
            case 'bottom-right':
                ctaRendererRootDiv.style.bottom = '0';
                ctaRendererRootDiv.style.right = '0';
                break;
            default:
                console.warn("Unexpected CTA position value:", sniply.ctaData.position);
                break
            }
```

There appears to be an unssuported position value 'fixed' which is not present as a switch case in the code.

```html
<div id="sniply-cta-root" style="width: 100%; height: 200px; position: fixed; z-index: 1000;"></div>
```
Steps to Reproduce:
1. Open the page in Chrome
2. Open the developer tools
3. Check the console
4. See the warning

This bug does not affect the functionality of the page, but we should verify that the lead is correctly being captured. As such this is a low severity and low priority bug, but should be investigated on the backend. 

### Bug-02 Buttons Failing To Load In MacOS Safari

The following errors can now be seen in the console when running test cases for the Mobile Safari Browser

```
[ERROR] Failed to load resource: the server responded with a status of 403 (Forbidden)
[WARNING] Unexpected CTA position value: 
[ERROR] Button failed to load, iconName = pip-placard, layoutTraits = [MacOSLayoutTraits Inline], src = data:image/png;base64,
[ERROR] Button failed to load, iconName = invalid-placard, layoutTraits = [MacOSLayoutTraits Inline], src = data:image/png;base64,
[ERROR] Button failed to load, iconName = airplay-placard, layoutTraits = [MacOSLayoutTraits Inline], src = data:image/png;base64,
```
This appears to be a compatability issue with ios native components. There does not seem to be any degredation in functionality but ios users may have a degraded experience when using the website.
---

## UI Automation Test Scenarios

The following test scenarios have been selected for UI automation:

1. **CTA Button Testing**: Validate all "SCHEDULE A FREE DISCOVERY SESSION" buttons
   - Verify all CTA buttons are present
   - Confirm they link to the correct destination
   - Check their visibility and clickability

2. **Article Section Testing**: Validate all article sections
   - Verify all article sections are present
   - Confirm they link to the correct destination
   - Check their visibility and clickability

3. **Responsive Design Testing**: Verify the site renders correctly on different viewport sizes
   - Test desktop, tablet, and mobile views
   - Verify service sections maintain proper layout at different screen sizes
   - Check that testimonial sections display correctly across devices

These automation scripts will be implemented using Playwright and the complete project will be available in the accompanying zip file.

---
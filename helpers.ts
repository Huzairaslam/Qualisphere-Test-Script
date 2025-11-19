import { Page, Locator } from '@playwright/test';
import locators from './locators.json';

type LocatorKey = keyof typeof locators;

function getLocator(page: Page, l: any): Locator | null {
  if (l.role) return page.getByRole(l.role, { name: l.name });
  if (l.text) return page.getByText(l.text);
  if (l.placeholder) return page.getByPlaceholder(l.placeholder);
  if (l.id) return page.locator(`#${l.id}`);
  if (l.locator) return page.locator(l.locator);
  return null;
}

export async function clickByName(page: Page, elementName: LocatorKey) {
  const elementLocators = locators[elementName];
  for (const l of elementLocators) {
    try {
      const locator = getLocator(page, l);
      if (!locator) continue;
      await locator.waitFor({ state: 'visible', timeout: 3000 });
      await locator.click();
      console.log(`Clicked ${elementName} using locator`, l);
      return;
    } catch (err) {
      console.warn(`Locator failed for ${elementName}:`, l);
    }
  }
  throw new Error(`All locators failed for ${elementName}`);
}

export async function fillByName(page: Page, elementName: LocatorKey, value: string) {
  const elementLocators = locators[elementName];
  for (const l of elementLocators) {
    try {
      const locator = getLocator(page, l);
      if (!locator) continue;
      await locator.waitFor({ state: 'visible', timeout: 3000 });
      await locator.fill(value);
      console.log(`Filled ${elementName} using locator`, l);
      return;
    } catch (err) {
      console.warn(`Locator failed for ${elementName}:`, l);
    }
  }
  throw new Error(`All locators failed for ${elementName}`);
}

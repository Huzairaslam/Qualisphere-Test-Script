import { Page, Locator } from '@playwright/test';
import locatorsData from './locators.json';
import { healAndAppendLocator } from './llmHealer';
import fs from 'fs';
import path from 'path';

type SingleLocator =
  | { role: string; name?: string }
  | { text: string }
  | { placeholder: string }
  | { id: string }
  | { locator: string };

// Create a mutable copy of locators with proper typing
const locators: Record<string, SingleLocator[]> = locatorsData as Record<string, SingleLocator[]>;
type LocatorKey = string;
const LOCATORS_FILE = path.join(__dirname, 'locators.json');

function getLocator(page: Page, l: SingleLocator): Locator | null {
  if ('role' in l) return page.getByRole(l.role as any, { name: l.name });
  if ('text' in l) return page.getByText(l.text);
  if ('placeholder' in l) return page.getByPlaceholder(l.placeholder);
  if ('id' in l) return page.locator(`#${l.id}`);
  if ('locator' in l) return page.locator(l.locator);
  return null;
}

// --- CLICK ---
export async function clickByName(page: Page, elementName: string) {
  if (!locators[elementName]) {
    throw new Error(`Element "${elementName}" not found in locators.json`);
  }
  
  let elementLocators: SingleLocator[] = locators[elementName];

  for (const l of elementLocators) {
    try {
      const locator = getLocator(page, l);
      if (!locator) continue;
      await locator.waitFor({ state: 'visible', timeout: 3000 });
      await locator.click();
      console.log(`Clicked ${elementName} using locator`, l);
      return;
    } catch (_) {}
  }

  // All locators failed → heal
  console.log(`All locators failed for ${elementName}, invoking LLM healer...`);
  const newLocator = (await healAndAppendLocator(page, elementLocators)) as unknown as SingleLocator | undefined;

  if (newLocator) {
    // Append to JSON and save
    (locators[elementName] as SingleLocator[]).push(newLocator);
    fs.writeFileSync(LOCATORS_FILE, JSON.stringify(locators, null, 2));
    console.log(`Appended new locator for ${elementName}:`, newLocator);

    // Retry with healed locator
    const locator = getLocator(page, newLocator);
    if (locator) {
      await locator.waitFor({ state: 'visible', timeout: 3000 });
      await locator.click();
      console.log(`Clicked ${elementName} using healed locator`, newLocator);
      return;
    }
  }

  throw new Error(`All locators failed for ${elementName} even after LLM healing`);
}

// --- FILL ---
export async function fillByName(page: Page, elementName: string, value: string) {
  if (!locators[elementName]) {
    throw new Error(`Element "${elementName}" not found in locators.json`);
  }
  
  let elementLocators: SingleLocator[] = locators[elementName];

  for (const l of elementLocators) {
    try {
      const locator = getLocator(page, l);
      if (!locator) continue;
      await locator.waitFor({ state: 'visible', timeout: 3000 });
      await locator.fill(value);
      console.log(`Filled ${elementName} using locator`, l);
      return;
    } catch (_) {}
  }

  // All locators failed → heal
  console.log(`All locators failed for ${elementName}, invoking LLM healer...`);
  const newLocator = (await healAndAppendLocator(page, elementLocators)) as unknown as SingleLocator | undefined;

  if (newLocator) {
    (locators[elementName] as SingleLocator[]).push(newLocator);
    fs.writeFileSync(LOCATORS_FILE, JSON.stringify(locators, null, 2));
    console.log(`Appended new locator for ${elementName}:`, newLocator);

    const locator = getLocator(page, newLocator);
    if (locator) {
      await locator.waitFor({ state: 'visible', timeout: 3000 });
      await locator.fill(value);
      console.log(`Filled ${elementName} using healed locator`, newLocator);
      return;
    }
  }

  throw new Error(`All locators failed for ${elementName} even after LLM healing`);
}

import { Page } from '@playwright/test';
import { execSync } from 'child_process';

type SingleLocator =
  | { role: string; name?: string }
  | { text: string }
  | { placeholder: string }
  | { id: string }
  | { locator: string };

// Query Ollama LLM safely with a DOM snippet
function queryLLM(elementLocators: SingleLocator[], domSnippet: string): any | null {
  try {
    const prompt = `Existing locators: ${JSON.stringify(elementLocators)}
Here is the DOM snippet where the element should be: ${domSnippet}
Suggest a new Playwright locator (role, text, placeholder, id, or locator). Return JSON only and dont explain the code just give the locator.`;

    // Use --input for 0.13.0 version instead of --prompt
    const result = execSync(
      `ollama run phi-3.5-mini --input "${prompt}" --json`,
      { encoding: 'utf-8' }
    );

    return JSON.parse(result);
  } catch (err: any) {
    console.error('LLM query failed:', err.message);
    return null;
  }
}

// Heal locator and append to locators.json dynamically
export async function healAndAppendLocator(page: Page, elementLocators: SingleLocator[]) {
  try {
    // Capture only relevant DOM snippet around body
    // You can change 'body' to a closer parent element if available
    let domSnippet = await page.locator('body').innerHTML();

    // Optional: truncate snippet to avoid very long input
    if (domSnippet.length > 3000) {
      domSnippet = domSnippet.slice(0, 3000);
    }

    const newLocator = queryLLM(elementLocators, domSnippet);
    if (!newLocator) return;

    // Here you would append to your locators.json
    console.log('LLM suggested locator:', newLocator);
    // TODO: append to locators.json
  } catch (err) {
    console.error('Failed to heal locator:', err);
  }
}

import { test, expect } from '@playwright/test';
import auditData from '../test-data/auditData.json';
import { fillByName, clickByName } from '../helpers';

test('test', async ({ page }) => {
  await page.goto('http://qualisphere.3em.tech/');
  await expect(page.getByRole('main')).toContainText('Login to continue to your account.');
  await fillByName(page, 'username', auditData.email);
  await fillByName(page, 'password', auditData.password);
  await clickByName(page, 'loginButton');
  await page.waitForTimeout(1000);
});


test ('Configuring TeamType', async ({ page }) => {
  await clickByName(page, 'ConfigurationLink');
  await clickByName(page, 'TeamType');
  await clickByName(page, 'AddBtn' );
  await page.getByRole('textbox', { name: '* Name' }).click();
  await page.getByRole('textbox', { name: '* Name' }).fill('Development team');
  await page.getByRole('button', { name: 'Create' }).click();
});

test ('Configuring Finding Category', async ({ page })=>{
  await page.getByRole('link', { name: 'Finding Category' }).click();
  await page.getByRole('button', { name: '+ Add' }).click();
  await page.getByRole('textbox', { name: '* Name' }).click();
  await page.getByRole('textbox', { name: '* Name' }).fill('Production Bug');
  await page.getByRole('button', { name: 'Create' }).click();
});

test ('configuring Audit Type', async ({ page }) => {
  await page.getByRole('link', { name: 'Audit Type' }).click();
  await page.getByRole('button', { name: '+ Add' }).click();
  await page.getByRole('textbox', { name: '* Name' }).click();
  await page.getByRole('textbox', { name: '* Name' }).fill('Bug#1');
  await page.getByRole('textbox', { name: '* Code' }).click();
  await page.getByRole('textbox', { name: '* Code' }).fill('B-54422');
  await page.getByRole('button', { name: 'Create' }).click();
});

test ('Configuring Audit Category', async ({page})=>{
  await page.getByRole('link', { name: 'Audit Category' }).click();
  await page.getByRole('button', { name: '+ Add' }).click();
  await page.getByRole('textbox', { name: '* Name' }).click();
  await page.getByRole('textbox', { name: '* Name' }).fill('Bug fixes');
  await page.getByRole('combobox', { name: '* Audit Type' }).click();
  await page.getByText('Bug').click();
  await page.getByRole('textbox', { name: '* Code' }).click();
  await page.getByRole('textbox', { name: '* Code' }).fill('B-0002');
  await page.getByRole('button', { name: 'Create' }).click();
});

test ('Configuring AuditClass', async ({page})=>{
  await page.getByRole('link', { name: 'Audit Class' }).click();
  await page.getByRole('button', { name: '+ Add' }).click();
  await page.getByRole('combobox', { name: '* Audit Type' }).click();
  await page.getByText('Bug').click();
  await page.getByRole('textbox', { name: '* Code' }).click();
  await page.getByRole('textbox', { name: '* Code' }).click();
  await page.getByRole('textbox', { name: '* Code' }).fill('B-2201');
  await page.getByRole('textbox', { name: '* Name' }).click();
  await page.getByRole('textbox', { name: '* Name' }).fill('Bug Fix');
  await page.getByRole('button', { name: 'Create' }).click();
});

test ('Configuring Product', async ({page})=>{
  await page.getByRole('link', { name: 'Products' }).click();
  await page.getByRole('button', { name: '+ Add' }).click();
  await page.getByRole('textbox', { name: '* Name' }).click();
  await page.getByRole('textbox', { name: '* Name' }).fill('Courier Management System');
  await page.getByRole('textbox', { name: '* Code' }).click();
  await page.getByRole('textbox', { name: '* Code' }).fill('CORM-002');
  await page.getByRole('button', { name: 'Create' }).click();
});


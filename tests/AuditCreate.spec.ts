import { test, expect } from '@playwright/test';
import auditData from '../test-data/auditData.json';
import { fillByName, clickByName } from '../helpers';

test('Login To Qualisphere', async ({ page }) => {
  await page.goto('http://qualisphere.3em.tech/');
  await expect(page.getByRole('main')).toContainText('Login to continue to your account.');
  await fillByName(page, 'username', auditData.email);
  await fillByName(page, 'password', auditData.password);
  await clickByName(page, 'loginButton');
  await page.waitForTimeout(1000);
  await clickByName(page, 'performAuditLink');
  await clickByName(page, 'createButton');
  await page.waitForTimeout(1000);
  await fillByName(page, 'demandTitle', auditData.demandTitle);
  await fillByName(page, 'demandId', auditData.demandId);
  await clickByName(page, 'demandStatus');
  await page.waitForTimeout(1000);
  await clickByName(page, 'demandStatusApproved');

  await fillByName(page, 'changeRequestTitle', auditData.changeRequestTitle);
  await fillByName(page, 'crId', auditData.crId);
  await clickByName(page, 'crStatus');
  await page.waitForTimeout(1000);
  await clickByName(page, 'crStatusPending');

  await clickByName(page, 'product');
  await page.waitForTimeout(1000);
  await clickByName(page, 'productOption');

  await clickByName(page, 'auditType');
  await page.waitForTimeout(1000);
  await clickByName(page, 'auditTypeOption');

  await clickByName(page, 'auditCategory');
  await page.waitForTimeout(1000);
  await clickByName(page, 'auditCategoryOption');

  await clickByName(page, 'auditClass');
  await page.waitForTimeout(1000);
  await clickByName(page, 'auditClassOption');

  await clickByName(page, 'lineOfBusiness');
  await page.waitForTimeout(1000);
  await clickByName(page, 'lineOfBusinessOption');

  await fillByName(page, 'businessSponsor', auditData.businessSponsor);
  await fillByName(page, 'businessInitiator', auditData.businessInitiator);

  await clickByName(page, 'projectManager');
  await page.waitForTimeout(1000);
  await clickByName(page, 'projectManagerOption');

  await clickByName(page, 'teamSelect');
  await page.waitForTimeout(1000);
  await clickByName(page, 'teamOption');

  await clickByName(page, 'createAuditButton');

  await expect(page).toHaveURL(/.*audit/i);
});
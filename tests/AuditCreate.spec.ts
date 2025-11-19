import { test, expect } from '@playwright/test';
import auditData from '../test-data/auditData.json';
import { fillByName, clickByName } from '../helpers';

test('Create audit record successfully', async ({ page }) => {
  // --- Navigate to Login Page ---
  await page.goto('http://qualisphere.3em.tech/');
  await expect(page.getByRole('main')).toContainText('Login to continue to your account.');

  // --- Login ---
  await fillByName(page, 'username', auditData.email);
  await fillByName(page, 'password', auditData.password);
  await clickByName(page, 'loginButton');

  // --- Navigate to Perform Audit ---
  await clickByName(page, 'performAuditLink');
  await clickByName(page, 'createButton');

  // --- Fill Audit Form ---
  await fillByName(page, 'demandTitle', auditData.demandTitle);
  await fillByName(page, 'demandId', auditData.demandId);
  await clickByName(page, 'demandStatus');
  await clickByName(page, 'demandStatusApproved');

  await fillByName(page, 'changeRequestTitle', auditData.changeRequestTitle);
  await fillByName(page, 'crId', auditData.crId);
  await clickByName(page, 'crStatus');
  await clickByName(page, 'crStatusPending');

  await clickByName(page, 'product');
  await clickByName(page, 'productOption');

  await clickByName(page, 'auditType');
  await clickByName(page, 'auditTypeOption');

  await clickByName(page, 'auditCategory');
  await clickByName(page, 'auditCategoryOption');

  await clickByName(page, 'auditClass');
  await clickByName(page, 'auditClassOption');

  await clickByName(page, 'lineOfBusiness');
  await clickByName(page, 'lineOfBusinessOption');

  await fillByName(page, 'businessSponsor', auditData.businessSponsor);
  await fillByName(page, 'businessInitiator', auditData.businessInitiator);

  await clickByName(page, 'projectManager');
  await clickByName(page, 'projectManagerOption');

  await clickByName(page, 'teamSelect');
  await clickByName(page, 'teamOption');

  await clickByName(page, 'createAuditButton');

  // --- Verify URL ---
  await expect(page).toHaveURL(/.*audit/i);
});

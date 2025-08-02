import { assertEquals } from '@std/assert';
import { processTemplate, createTemplateVars } from './templates.ts';

Deno.test('processTemplate replaces variables correctly', async () => {
  // Create a temporary template file for testing
  const tempFile = await Deno.makeTempFile({ suffix: '.txt' });
  const templateContent = 'Hello {{NAME}}, welcome to {{PROJECT}}!';
  await Deno.writeTextFile(tempFile, templateContent);
  
  const vars = {
    PACKAGE_NAME: 'test-package',
    AUTHOR_NAME: 'Test Author',
    AUTHOR_EMAIL: 'test@example.com',
    AUTHOR_WEBSITE: 'https://test.com',
    GITHUB_USERNAME: 'testuser',
    YEAR: '2024',
    NAME: 'World',
    PROJECT: 'TWS CLI'
  };
  
  try {
    const result = await processTemplate(tempFile, vars);
    assertEquals(result, 'Hello World, welcome to TWS CLI!');
  } finally {
    await Deno.remove(tempFile);
  }
});

Deno.test('createTemplateVars generates correct variables', () => {
  const vars = createTemplateVars('my-test-package');
  
  assertEquals(vars.PACKAGE_NAME, 'my-test-package');
  assertEquals(vars.YEAR, new Date().getFullYear().toString());
  assertEquals(typeof vars.AUTHOR_NAME, 'string');
  assertEquals(typeof vars.GITHUB_USERNAME, 'string');
});

Deno.test('processTemplate handles multiple occurrences', async () => {
  // Create a temporary template file for testing
  const tempFile = await Deno.makeTempFile({ suffix: '.txt' });
  const templateContent = '{{NAME}} and {{NAME}} are both {{NAME}}';
  await Deno.writeTextFile(tempFile, templateContent);
  
  const vars = {
    PACKAGE_NAME: 'test',
    AUTHOR_NAME: 'Test',
    AUTHOR_EMAIL: 'test@test.com',
    AUTHOR_WEBSITE: 'https://test.com',
    GITHUB_USERNAME: 'test',
    YEAR: '2024',
    NAME: 'awesome'
  };
  
  try {
    const result = await processTemplate(tempFile, vars);
    assertEquals(result, 'awesome and awesome are both awesome');
  } finally {
    await Deno.remove(tempFile);
  }
});

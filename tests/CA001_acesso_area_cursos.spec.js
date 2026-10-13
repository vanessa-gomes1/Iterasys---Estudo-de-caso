import { test } from '@playwright/test';
import { LoginPage } from '../pages/1_login.page.js';
import { HomePage } from '../pages/2_home.page.js';

test.describe('CA001 - Visualização das informações da Área do Aluno', () => {
    test('CA001 - Visualizar as informações principais da Área do Aluno', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await page.goto('/');

        await loginPage.acessar_pagina_login();

        await loginPage.fazer_login(
            process.env.TEST_EMAIL,
            process.env.TEST_PASSWORD
        );

        await homePage.validar_identificacao_e_boas_vindas();

        await homePage.validar_indicadores();
    });
});
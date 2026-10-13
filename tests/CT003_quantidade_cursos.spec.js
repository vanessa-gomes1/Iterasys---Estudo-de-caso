import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/1_login.page.js';
import { HomePage } from '../pages/2_home.page.js';

test('CT003 - Validar divergência na quantidade de cursos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await page.goto('/');
    await loginPage.acessar_pagina_login();

    await loginPage.fazer_login(
        process.env.TEST_EMAIL,
        process.env.TEST_PASSWORD
    );

    await expect(page).not.toHaveURL(/msg=not-logged-in/);

    await homePage.validar_indicadores();

    const linhasIndicadores = (
        await homePage.areaIndicadores.innerText()
    ).split('\n');

    const indiceCursos = linhasIndicadores.indexOf('Cursos');

    let quantidadeIndicada = 0;

    for (let indice = indiceCursos - 1; indice >= 0; indice--) {
        const valor = Number(linhasIndicadores[indice]);

        if (Number.isFinite(valor) && valor > 0) {
            quantidadeIndicada = valor;
            break;
        }
    }

    expect(
        quantidadeIndicada,
        'Não foi possível identificar a quantidade indicada de cursos.'
    ).toBeGreaterThan(0);

    const cursos = page.locator('[id^="course-card-heading"]:visible');

    await expect(cursos.first()).toBeVisible();

    for (let tentativa = 0; tentativa < 20; tentativa++) {
        const botaoCarregarMais = homePage.botaoCarregarMais;

        if (await botaoCarregarMais.count() === 0) {
            break;
        }

        if (!await botaoCarregarMais.isVisible()) {
            break;
        }

        const quantidadeAntes = await cursos.count();

        await botaoCarregarMais.click();

        await expect.poll(
            () => cursos.count()
        ).toBeGreaterThan(quantidadeAntes);
    }

    const quantidadeEncontrada = await cursos.count();

    expect(quantidadeEncontrada).toBe(quantidadeIndicada);
});
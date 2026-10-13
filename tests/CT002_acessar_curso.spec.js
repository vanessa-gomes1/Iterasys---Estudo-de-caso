import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/1_login.page.js';
import { HomePage } from '../pages/2_home.page.js';
import { CursoSelecionadoPage } from '../pages/4_curso_selecionado.page.js';
import { lerMassaCursos } from '../utils/ler_massa.js';

const massaCursos = lerMassaCursos();

test.describe('CT002 - Acessar curso pela Home', () => {
    for (const dados of massaCursos) {
        test(
            `CT002 - Massa ${dados.id}: ${dados.cursoHome}`,
            async ({ page }) => {
                const loginPage = new LoginPage(page);
                const homePage = new HomePage(page);
                const cursoPage = new CursoSelecionadoPage(page);

                await page.goto('/');

                await loginPage.acessar_pagina_login();

                await loginPage.fazer_login(
                    process.env.TEST_EMAIL,
                    process.env.TEST_PASSWORD
                );

                await expect(page).not.toHaveURL(
                    /msg=not-logged-in/
                );

                await homePage.acessar_curso(
                    dados.cursoHome
                );

                await cursoPage.validar_titulo_curso(
                    dados.tituloCurso
                );

                await cursoPage.acessar_modulo(
                    dados.modulo
                );

                await cursoPage.acessar_aula(
                    dados.aula
                );

                await cursoPage.validar_conteudo_aula();

                await cursoPage.validar_player_disponivel();
            }
        );
    }
});
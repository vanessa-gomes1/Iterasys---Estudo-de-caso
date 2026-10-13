import { test } from '@playwright/test';
import { LoginPage } from '../pages/1_login.page.js';
import { CursosPage } from '../pages/3_cursos.page.js';
import { lerMassaCA002 } from '../utils/ler_massa.js';

const massaCA002 = lerMassaCA002();

test.describe('CA002 - Visualização dos cursos disponíveis', () => {
    for (const dados of massaCA002) {
        test(
            `CA002 - Massa ${dados.id}: ${dados.curso}`,
            async ({ page }) => {
                const loginPage = new LoginPage(page);
                const cursosPage = new CursosPage(page);

                await page.goto('/');

                await loginPage.acessar_pagina_login();

                await loginPage.fazer_login(
                    process.env.TEST_EMAIL,
                    process.env.TEST_PASSWORD
                );

                await cursosPage.acessar_area_cursos();

                await cursosPage.validar_area_cursos();

                if (dados.statusAluno === 'Não matriculado') {
                    for (let i = 0; i < 3; i++) {
                        await cursosPage.carregar_mais_cursos();
                    }
                }

                await cursosPage.validar_curso_e_acao(
                    dados.curso,
                    dados.acaoEsperada
                );
            }
        );
    }
});
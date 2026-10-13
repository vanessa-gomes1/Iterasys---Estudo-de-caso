import { test } from '@playwright/test';
import { LoginPage } from '../pages/1_login.page.js';
import { HomePage } from '../pages/2_home.page.js';
import { CursoSelecionadoPage } from '../pages/4_curso_selecionado.page.js';
import { lerMassaCA003 } from '../utils/ler_massa.js';

const massaCA003 = lerMassaCA003();

test.describe(
    'CA003 - Navegação entre aulas e reprodução do conteúdo',
    () => {
        for (const dados of massaCA003) {
            test(
                `CA003 - Massa ${dados.id}: ${dados.aulaInicial} → ${dados.aulaSeguinte}`,
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

                    await homePage.acessar_curso(
                        dados.cursoHome
                    );

                    await cursoPage.validar_titulo_curso(
                        dados.tituloCurso
                    );

                    await cursoPage.acessar_modulo(
                        dados.moduloInicial
                    );

                    await cursoPage.acessar_aula(
                        dados.aulaInicial
                    );

                    await cursoPage.validar_conteudo_aula();

                    await cursoPage.validar_player();

                    await cursoPage.expandir_agrupador(
                        dados.agrupadorAulaSeguinte
                    );

                    await cursoPage.acessar_aula(
                        dados.aulaSeguinte
                    );

                    await cursoPage.validar_conteudo_aula();

                    await cursoPage.validar_player();
                }
            );
        }
    }
);
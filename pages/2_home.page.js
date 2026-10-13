import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;

        this.botaoCarregarMais = page.getByRole('button', {
            name: 'Carregar mais'
        });

        this.mensagemBoasVindas = page.locator(
            '#el_1600856593662_49'
        );

        this.areaIndicadores = page.locator(
            '#component_1651838322097_269'
        );

        this.indicadorMensagens = page
            .locator('div.learnworlds-overline-text')
            .filter({
                hasText: 'mensagens'
            });

        this.cardsCursos = page.locator(
            '[id^="course-card-heading"]'
        );

        this.cardsCursosVisiveis = page.locator(
            '[id^="course-card-heading"]:visible'
        );
    }

    async validar_identificacao_e_boas_vindas() {
        await expect(this.mensagemBoasVindas).toBeVisible();
        await expect(this.mensagemBoasVindas).not.toHaveText('');
    }

    async validar_indicadores() {
        await expect(this.areaIndicadores).toBeVisible();

        await expect(this.areaIndicadores).toContainText('Cursos');
        await expect(this.areaIndicadores).toContainText('horas');
        await expect(this.areaIndicadores).toContainText('Posts');
        await expect(this.areaIndicadores).toContainText('certificados');

        await expect(
            this.indicadorMensagens.first()
        ).toBeVisible();
    }

    async localizar_curso(nomeCurso) {
        const cursoVisivel = this.cardsCursosVisiveis
            .filter({
                hasText: nomeCurso
            })
            .first();

        for (let tentativa = 0; tentativa < 10; tentativa++) {
            if (await cursoVisivel.count() > 0) {
                await expect(cursoVisivel).toBeVisible();
                return cursoVisivel;
            }

            const quantidadeAntes =
                await this.cardsCursosVisiveis.count();

            await this.botaoCarregarMais.click();

            await expect.poll(
                async () => await this.cardsCursosVisiveis.count()
            ).toBeGreaterThan(quantidadeAntes);
        }

        await expect(cursoVisivel).toBeVisible();

        return cursoVisivel;
    }

    async acessar_curso(nomeCurso) {
        const curso = await this.localizar_curso(nomeCurso);

        const cardCurso = curso.locator(
            'xpath=ancestor::*[.//button[contains(@class, "product-card-enroll-button")]][1]'
        );

        const botaoContinuar = cardCurso.getByRole('button', {
            name: 'Continue aprendendo',
            exact: true
        });

        await expect(botaoContinuar).toBeVisible();
        await expect(botaoContinuar).toBeEnabled();

        await botaoContinuar.click();
    }
}
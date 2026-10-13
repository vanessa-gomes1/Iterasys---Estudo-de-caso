import { expect } from '@playwright/test';

export class CursosPage {
    constructor(page) {
        this.page = page;

        this.linkCursos = page.getByRole('link', {
            name: 'Cursos',
            exact: true
        });

        this.tituloCursos = page.getByText('Cursos', {
            exact: true
        }).first();

        this.cardsCursos = page.locator(
            'h3[id^="course-card-heading"]'
        );

        this.botaoCarregarMais = page.getByRole('button', {
            name: 'Carregar mais'
        });
    }

    async acessar_area_cursos() {
        await this.linkCursos.click();
    }

    async validar_area_cursos() {
        await this.tituloCursos.waitFor({
            state: 'visible'
        });

        await this.cardsCursos.first().waitFor({
            state: 'visible'
        });
    }

    async localizar_curso(nomeCurso) {
        const curso = this.cardsCursos.filter({
            hasText: nomeCurso
        }).first();

        await curso.waitFor({
            state: 'visible'
        });

        return curso;
    }

    async carregar_mais_cursos() {
        await this.botaoCarregarMais.waitFor({
            state: 'visible'
        });

        await this.botaoCarregarMais.click();
    }

    async validar_curso_e_acao(nomeCurso, acaoEsperada) {
        const curso = await this.localizar_curso(nomeCurso);

        await expect(curso).toContainText(nomeCurso);

        const cardCurso = curso.locator(
            'xpath=ancestor::*[.//button[contains(normalize-space(), "Continue aprendendo") or contains(normalize-space(), "Inscreva-se")]][1]'
        );

        const botaoAcao = cardCurso.getByRole('button', {
            name: acaoEsperada,
            exact: true
        });

        await expect(botaoAcao).toBeVisible();
        await expect(botaoAcao).toBeEnabled();
    }
}
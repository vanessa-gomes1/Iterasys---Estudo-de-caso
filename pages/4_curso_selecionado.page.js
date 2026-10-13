import { expect } from '@playwright/test';

export class CursoSelecionadoPage {
    constructor(page) {
        this.page = page;

        this.iframeConteudo = page.locator(
            'iframe[title="Conteúdo da unidade"]'
        );
    }

    async validar_titulo_curso(nomeCursoInterno) {
        const tituloCurso = this.page.getByText(nomeCursoInterno, {
            exact: true
        }).first();

        await expect(tituloCurso).toBeVisible();
    }

    async acessar_modulo(nomeModulo) {
        const modulo = this.page.getByText(nomeModulo, {
            exact: true
        }).first();

        await expect(modulo).toBeVisible();
    }

    async localizar_aula(nomeAula) {
        const aula = this.page
            .getByText(nomeAula, { exact: true })
            .filter({ visible: true })
            .first();

        await expect(aula).toBeVisible();

        return aula;
    }

    async acessar_aula(nomeAula) {
        const aula = await this.localizar_aula(nomeAula);

        await aula.click();
    }

    async expandir_agrupador(nomeAgrupador) {
        const agrupador = this.page.getByRole('button', {
            name: nomeAgrupador
        }).first();

        await expect(agrupador).toBeVisible();

        await agrupador.click();
    }

    async validar_conteudo_aula() {
        await expect(this.iframeConteudo).toBeVisible();
    }

    async validar_player_disponivel() {
        await expect(this.iframeConteudo).toBeVisible();
    }

    async validar_reproducao_automatica() {
        await expect(this.iframeConteudo).toBeVisible();

        const player = this.iframeConteudo.contentFrame();
        const video = player.locator('video').first();

        await expect(video).toBeAttached();

        await expect.poll(
            async () => video.evaluate(elemento =>
                !elemento.paused && elemento.readyState >= 2
            )
        ).toBe(true);
    }

    async validar_player() {
        await this.validar_reproducao_automatica();
    }

    async pausar_video() {
        const player = this.iframeConteudo.contentFrame();
        const video = player.locator('video').first();

        await video.evaluate(elemento => elemento.pause());
    }
}
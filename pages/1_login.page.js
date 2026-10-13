import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        this.emailInput = page.getByRole('textbox', {
            name: 'Digite seu e-mail:'
        });

        this.passwordInput = page.getByRole('textbox', {
            name: 'Digite sua senha:'
        });

        this.entrarButton = page.getByRole('button', {
            name: 'Entrar'
        });
    }

    async acessar_pagina_login() {
        await this.page.getByRole('link', {
            name: 'Entrar'
        }).click();
    }

    async preencher_email(email) {
        await this.emailInput.fill(email);
    }

    async preencher_senha(senha) {
        await this.passwordInput.fill(senha);
    }

    async clicar_entrar() {
        await this.entrarButton.click();

        await this.page.waitForLoadState('domcontentloaded');
    }

    async fazer_login(email, senha) {
        await this.preencher_email(email);
        await this.preencher_senha(senha);
        await this.clicar_entrar();
    }
}
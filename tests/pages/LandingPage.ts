import { Page, expect } from "@playwright/test";

export class LandingPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("http://localhost:3000");
  }

  async openLeadModal() {
    // Poderia usar Xpath //button[text()="Aperte o play... se tiver coragem"] mas é melhor usar o getByRole, pois é mais semântico e acessível
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();

    // Técnica de Checkpoint
    await expect(
      this.page.getByTestId("modal").getByRole("heading"),
    ).toHaveText("Fila de espera");
  }

  async submitLeadForm(name: string, email: string) {
    await this.page.getByPlaceholder("Informe seu nome").fill(name);
    await this.page.getByPlaceholder("Informe seu email").fill(email);

    // Do modal interagimos com o filho (botão) impedindo falhas se implementarem outro botão com o mesmo texto no futuro.
    await this.page
      .getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click();
  }

  async alertHaveText(expectedText: string | string[]) {
    await expect(this.page.locator(".alert")).toHaveText(expectedText);
  }
}

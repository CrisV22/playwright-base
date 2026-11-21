import { Page, expect } from "@playwright/test";

export class MoviesPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isLoggedIn() {
    // Espera até que a página seja carregada completamente
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(/\/admin/);
  }

  async create(
    title: string,
    overview: string,
    company: string,
    release_year: string,
  ) {
    await this.page.locator('a[href$="register"]').click();

    // Campo input localizado por label
    await this.page.getByLabel("Titulo do filme").fill(title);
    await this.page.getByLabel("Sinopse").fill(overview);

    // Campo select/dropdown
    await this.page
      .locator("#select_company_id .react-select__indicator")
      .click();

    // Exbibe HTML da mágina no console para encontrar o elemento de lista das opções
    // const html = await this.page.content();
    // console.log(html);

    // Classe que representa as opções do select/dropdown
    await this.page
      .locator(".react-select__option")
      .filter({
        hasText: company,
      })
      .click();

    // Campo select/dropdown
    await this.page.locator("#select_year .react-select__indicator").click();

    // Classe que representa as opções do select/dropdown
    await this.page
      .locator(".react-select__option")
      .filter({
        hasText: release_year,
      })
      .click();

    await this.page.getByRole("button", { name: "Cadastrar" }).click();
  }
}

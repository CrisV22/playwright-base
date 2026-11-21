import { test as base, Page } from "@playwright/test";
import { Toast } from "../pages/Components";
import { MoviesPage } from "../pages/MoviesPage";
import { LoginPage } from "../pages/LoginPage";
import { LandingPage } from "../pages/LandingPage";

// Segundo o Papito não impactou na performance usar essa abordagem.
// Ab ordagem recomendada apenas para automações de teste.
// Define as propriedades extras que serão anexadas à instância de `page`
type CustomPages = {
  landing: LandingPage;
  login: LoginPage;
  movies: MoviesPage;
  toast: Toast;
};

// Sobrescreve o tipo da fixture `page` para incluir `Page` + `CustomPages`
// Isso evita o erro ts(2353) ao passar propriedades adicionais para `use(...)`
type MyFixtures = {
  page: Page & CustomPages;
};

export const test = base.extend<MyFixtures>({
  // Estende a fixture nativa `page` recebendo a instância original do Playwright
  page: async ({ page }, use) => {
    // Object.assign copia as novas propriedades para a própria instância de `page`,
    // preservando todos os métodos nativos (como page.goto, page.locator, etc.)
    // — diferente de `{ ...page }`, que perderia métodos do prototype
    const extendedPage = Object.assign(page, {
      landing: new LandingPage(page),
      login: new LoginPage(page),
      movies: new MoviesPage(page),
      toast: new Toast(page),
    });

    // Disponibiliza a `page` estendida para os testes
    await use(extendedPage);
  },
});

export { expect } from "@playwright/test";

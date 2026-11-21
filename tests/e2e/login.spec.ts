import { test } from "../support/index";

test("Deve logar admin com credenciais válidas", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "pwd123");
  await page.movies.isLoggedIn();
});

test("Não deve logar admin com senha incorreta", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "wrongpassword");
  const message =
    "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
  await page.toast.containText(message);
});

test("Não deve cadastrar um lead com email sem @", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("email.com", "wrongpassword");
  await page.login.alertHaveText("Email incorreto");
});

test("Não deve logar admin com email vazio", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("", "wrongpassword");
  await page.login.alertHaveText("Campo obrigatório");
});

test("Não deve logar admin com senha vazia", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "");
  await page.login.alertHaveText("Campo obrigatório");
});

test("Não deve logar admin com email e senha vazios", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("", "");
  // valida os dois alerts porque o locator utilizado localiza 2
  await page.login.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});

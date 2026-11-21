import { test, expect } from "../support/index";
import { faker } from "@faker-js/faker";

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.firstName();
  const leadEmail = faker.internet.email();

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await page.toast.containText(message);
});

test("Não deve cadastrar um lead quando o email já existe", async ({
  page,
  request,
}) => {
  const leadName = faker.person.firstName();
  const leadEmail = faker.internet.email();

  // Colocando chamada à API para preparar a massa mais rapido
  const newLead = await request.post("http://localhost:3333/leads", {
    data: {
      name: leadName,
      email: leadEmail,
    },
  });

  expect(newLead.ok()).toBeTruthy();

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);
  const message =
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await page.toast.containText(message);
});

test("Não deve cadastrar um lead com email sem @", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("Fernando Papito", "papitoyahoo.com");

  await page.landing.alertHaveText("Email incorreto");
});

test("Não deve cadastrar um lead com nome vazio", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("", "papito@yahoo.com");

  await page.landing.alertHaveText("Campo obrigatório");
});

test("Não deve cadastrar um lead com email vazio", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("Fernando Papito", "");

  await page.landing.alertHaveText("Campo obrigatório");
});

test("Não deve cadastrar um lead com nome e email vazio", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("", "");

  await page.landing.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});

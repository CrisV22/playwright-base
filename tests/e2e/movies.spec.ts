import { test } from "../support/index";
import moviesData from "../support/fixtures/movies.json";
import type { MoviesFixture } from "../support/types/movie.type"; // ajusta o caminho conforme onde está movie.ts
import { executeSQL } from "../support/database";

const moviesFactoryData = moviesData as MoviesFixture;

test("Deve cadastrar um novo filme", async ({ page }) => {
  const movie = moviesFactoryData.create;

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`);

  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "pwd123");
  await page.movies.isLoggedIn();
  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year,
  );
  await page.toast.containText("Cadastro realizado com sucesso!");
});

const pool = require("../db_test");
const request = require("supertest");
const app = require("../index");
const dotenv = require("dotenv");
dotenv.config();

beforeAll(async () => {
  // create recipe table
  await pool.query(
    "CREATE TABLE recipe (recipe_id SERIAL PRIMARY KEY, description TEXT, owner VARCHAR(50))"
  );
});

beforeEach(async () => {
  // seed with some data
  await pool.query(
    "INSERT INTO recipe (owner, description) VALUES ('test', 'Tomato'), ('test', 'Brocolli')"
  );
});

afterEach(async () => {
  await pool.query("DELETE FROM recipe");
});

afterAll(async () => {
  await pool.query("DROP TABLE recipe");
  pool.end();
});

// Testing endpoint responses and properties

// Test get recipe route

describe("GET /recipe", () => {
  test("It should fetch our recipes", async (done) => {
    const response = await request(app).get("/recipe");
    expect(response.body[0]).toHaveProperty("recipe_id");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.statusCode).toBe(200);
    done();
  });
});

// Test post recipe route

describe("POST /recipe", () => {
  test("It should post recipes", async (done) => {
    const newRecipe = await request(app).post("/recipe").send({
      description: "Broccoli is good",
    });
    expect(newRecipe.body.description).toBe("Broccoli is good");
    expect(newRecipe.body).toHaveProperty("recipe_id");
    expect(newRecipe.body).toHaveProperty("description");
    expect(newRecipe.statusCode).toBe(200);
    done();
  });
});

// Test update recipe route

describe("PUT /recipe/:id", () => {
  test("It should update recipes", async (done) => {
    const updatedRecipe = await request(app).put(`/recipe/1/recipe updated`);
    expect(updatedRecipe.body).toBe("recipe updated");
    expect(updatedRecipe.statusCode).toBe(200);
    done();
  });
});

// Test delete recipe route

describe("DELETE /recipe/:id", () => {
  test("It should delete recipes", async (done) => {
    const newRecipe = await request(app).post("/recipe").send({
      description: "Broccoli is bad",
    });
    const removedRecipe = await request(app).delete(
      `/recipe/${newRecipe.body.recipe_id}`
    );
    expect(removedRecipe.body).toEqual("Recipe deleted");
    expect(removedRecipe.statusCode).toBe(200);
    done();
  });
});

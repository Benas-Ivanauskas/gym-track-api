import request from "supertest";
import app from "../../server.js";
import JWT from "jsonwebtoken";

describe("POST /register", () => {
  test("should create a new user and return a token", async () => {
    const user = {
      name: "Johnas",
      email: "testaas@gmail.com",
      password: "Test123+",
    };

    const response = await request(app).post("/v1/api/register").send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User was created successfully!"
    );
    expect(response.body).toHaveProperty("token");
  });

  test("should return 409 if email is already taken", async () => {
    const user = {
      name: "John",
      email: "test@gmail.com",
      password: "Test123+",
    };

    const response = await request(app).post("/v1/api/register").send(user);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      "error",
      "Email already exists. Please provide other email"
    );
  });

  test("should return 400 if all fields are empty", async () => {
    const response = await request(app).post("/v1/api/register").send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Fields can't be empty. Please fill all fields"
    );
  });

  test("should return 400 emails is wrong", async () => {
    const user = {
      name: "John",
      email: "Johnassss",
      password: "Test123+",
    };
    const response = await request(app).post("/v1/api/register").send(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid email. Please provide a correct email"
    );
  });

  test("should return 400 password is too short", async () => {
    const user = {
      name: "John",
      email: "Johnassss@gmail.com",
      password: "test",
    };
    const response = await request(app).post("/v1/api/register").send(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid password. Please write a stronger password"
    );
  });

  test("should return 400 password is only numbers", async () => {
    const user = {
      name: "John",
      email: "Johnassss@gmail.com",
      password: "12345678",
    };
    const response = await request(app).post("/v1/api/register").send(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid password. Please write a stronger password"
    );
  });

  test("should return 400 password is only symbols", async () => {
    const user = {
      name: "John",
      email: "Johnassss@gmail.com",
      password: "+-!@#$$",
    };
    const response = await request(app).post("/v1/api/register").send(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid password. Please write a stronger password"
    );
  });
});

describe("POST /login", () => {
  test("should login user", async () => {
    const user = {
      email: "test@gmail.com",
      password: "Test123+",
    };

    const response = await request(app).post("/v1/api/login").send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Login successful");
    expect(response.body).toHaveProperty("token");
  });

  test("should throw 400 if input fields are empty", async () => {
    const response = await request(app).post("/v1/api/login").send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Fields cannot be empty. Please fill all fields"
    );
  });

  test("should throw 400 if password is empty", async () => {
    const user = {
      email: "test@gmail.com",
    };
    const response = await request(app).post("/v1/api/login").send(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Fields cannot be empty. Please fill all fields"
    );
  });

  test("should throw 400 if email is empty", async () => {
    const user = {
      password: "Test123+",
    };
    const response = await request(app).post("/v1/api/login").send(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Fields cannot be empty. Please fill all fields"
    );
  });

  test("should throw 404 is email dont exist", async () => {
    const user = {
      email: "dontexists@gmail.com",
      password: "Test123+",
    };
    const response = await request(app).post("/v1/api/login").send(user);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "error",
      "User with this email doesnt exist. Please provide correct email"
    );
  });

  test("should throw 401 if invalid email or password", async () => {
    const user = {
      email: "test@gmail.com",
      password: "Test123++",
    };
    const response = await request(app).post("/v1/api/login").send(user);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid email or password");
  });
});

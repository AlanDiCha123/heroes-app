import { types } from "../../../src/auth/types/types";

describe("Pruebas en types", () => {
  test("should return those types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    });
  });
});

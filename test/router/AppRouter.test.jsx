import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router";

describe("Pruebas en el AppRouter", () => {
  test("should show login if is not authenticated", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("should show login if is authenticated", () => {
    const contextValue = {
      logged: true,
      user: {
        id: "ABC",
        name: "Juan Carlos",
      },
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText("MarvelPage").length).toBeGreaterThanOrEqual(1);
  });
});

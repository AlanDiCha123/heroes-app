import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Pruebas en PublicRoute", () => {
  test("should show children if he is not authenticated", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <div>Hola</div>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Hola")).toBeTruthy();
  });

  test("should navigate if is not authenticated", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Strider",
        id: "ABC123",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Ruta Publica</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Pagina Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Pagina Marvel")).toBeTruthy();
  });
});

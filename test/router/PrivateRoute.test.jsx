import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en PrivateRoute", () => {
  test("should show children if he is authenticated", () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: "abc",
        name: "Juan carlos",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <PrivateRoute>
            <div>Hola</div>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Hola")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/login");
  });
});

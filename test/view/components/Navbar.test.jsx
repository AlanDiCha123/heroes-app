import { MemoryRouter, useNavigate } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth/context";
import { Navbar } from "../../../src/view/components/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en Navbar", () => {
  const contextValue = {
    logged: true,
    user: {
      id: "ABC",
      name: "Juan",
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test("should show name on login", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText("Juan")).toBeTruthy();
  });

  test("should call logout and navigate when logout button is clicked", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const buttonlogout = screen.getByRole("button");

    fireEvent.click(buttonlogout);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});

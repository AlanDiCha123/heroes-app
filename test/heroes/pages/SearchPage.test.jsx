const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");
const { SearchPage } = require("../../../src/heroes/pages/SearchPage");

const useNavigateMock = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => useNavigateMock,
}));

describe("Pruebas en SearchPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should show correct with default values", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test("should show batman and the input with its queryString", () => {
    render(
      <MemoryRouter initialEntries={"/search?q=batman"}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    const img = screen.getByRole("img");
    const div = screen.getByLabelText("search-hero");

    expect(input.value).toBe("batman");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
    expect(div.style.display).toBe("none");
  });

  test("should show an error if a hero is not found", () => {
    render(
      <MemoryRouter initialEntries={"/search?q=batman123"}>
        <SearchPage />
      </MemoryRouter>
    );

    const div = screen.getByLabelText("search-hero");

    expect(div.style.display).not.toBe("none");
  });

  test("should call navigate to a new screen", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.change(input, {
      target: {
        name: "searchText",
        value: "superman",
      },
    });

    fireEvent.submit(form);

    expect(useNavigateMock).toHaveBeenCalledWith("?q=superman");
  });
});

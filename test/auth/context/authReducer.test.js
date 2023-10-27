import { authReducer, types } from "../../../src/auth";

describe("Pruebas en authReducer", () => {
  test("should return an state by default", () => {
    const state = authReducer({ logged: false }, {});

    expect(state).toEqual({ logged: false });
  });

  test("debe de llamar el login autenticar y establecer el uso", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Juan",
        id: "123",
      },
    };

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("should logout and remove the user name and set logged on false", () => {
    const action = {
      type: types.logout,
    };

    const state = authReducer(
      {
        logged: true,
        user: {
          name: "Juan",
          id: "123",
        },
      },
      action
    );

    expect(state).toEqual({
      logged: false,
    });

    expect(state).not.toContain({ user: { name: "Juan", id: "123" } });
  });
});

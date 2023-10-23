import {
  mockRequest,
  mockResponse,
  mockExpectedResponse
} from "../../utils/interceptors";
jest.mock("../../data/user");
import * as userData from "../../data/user";
import { createUser } from "./service";
import { buildError } from "../../utils/error_builder";
import * as sharedErrors from "../../utils/shared_errors";
import { User } from "../../model/user";

describe("User tests", () => {
  test("should create new user ", async () => {
    const user: Partial<User> = {
      firstName: "stk",
      lastName: "himself",
      phone: "235959404",
      email: "stk@gmail.com",
      gender: "Male",
      password: "some pass"
    };

    (userData.getUser as jest.Mock).mockResolvedValue(Promise.resolve(null));

    const res = mockResponse();
    const req = mockRequest(user, {}, {});
    await createUser(req, res);

    //expected values
    const errs = buildError(
      sharedErrors.Required,
      "role is required",
      "role",
      user
    );

    delete user.password;
    user["roles"] = undefined;
    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    const ret = (res.json as jest.Mock).mock.calls[0][0];
    expect(ret.data).toBe(null);
    expect(ret.errors).toHaveLength(1);
    expect(ret.errors[0].err_code).toBe(sharedErrors.Required);
    expect(ret.errors[0].err_code).toBe(sharedErrors.Required);
    expect(ret.errors[0].field).toBe("role");
  });
});

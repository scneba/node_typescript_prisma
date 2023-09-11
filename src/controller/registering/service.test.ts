import { createUser } from "./service";
import { prismaMock } from "../../../singleton";
import { mockRequest, mockResponse } from "../../utils/interceptors";

test("should create new user ", async () => {
  const user = {
    id: 1,
    name: "Rich",
    email: "hello@prisma.io",
    age: 11
  };

  prismaMock.user.create.mockResolvedValue(user);

  const req = mockRequest(user);
  const res = mockResponse();
  await createUser(req, res);
  expect(res.status).toBeCalledWith(200);
  expect(res.send).toBeCalledWith(user);
});

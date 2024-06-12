import { http } from "@/utils/http";
import { EmployeeProfile } from "./employee.api";

export type EmployeeLoginDTO = {
  accessToken: string;
  refreshToken: string;
  employeeDto: EmployeeProfile;
};

export const authApi = {
  login: async (employeeID: string, password: string) => {
    const response = http
      .post("/employee/login", {
        employeeID,
        password,
      })
      .then((res) => res.data)
      .catch((err) => console.log("error", err));

    return response;
  },
};

import { http } from "@/utils/http";

export type PostEmployeeApplyREQ = {
  fullName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
};

export type EmployeeProfile = {
  id: string;
  employeeID: number;
  fullName: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  roleName: string;
  restaurantID: number;
  isActive: boolean;
  dateJoined: string;
};

export const employeeApi = {
  postEmployeeApply: async ({
    fullName,
    email,
    dateOfBirth,
    phoneNumber,
    address,
  }: PostEmployeeApplyREQ) => {
    const response = http
      .post("/employee/apply", {
        fullName,
        email,
        dateOfBirth,
        phoneNumber,
        address,
      })
      .then((res) => res.data)
      .catch((err) => err);
    return response;
  },

  getEmployeeProfile: async ({}: EmployeeProfile) => {
    const response = http
      .get("/employee/{employee_id}")
      .then((res) => res.data)
      .catch((err) => err);
    return response;
  },
};

import { http } from "@/utils/http";

export type PostEmployeeApplyREQ = {
  fullName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
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
};

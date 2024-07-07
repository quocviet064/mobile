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

export type EmployeeShift = {
  title: string;
  start: string;
  end: string;
  allDay: string | number | null;
  resource: {
    id: string;
    restaurantID: string;
    shift: string | number | null;
    dateOfWork: string;
    month: string;
    year: string;
    checkIn: string;
    checkOut: string;
    actual_CheckIn: string;
    actual_CheckOut: string | number | null;
    totalHours: string | number | null;
    isOnTime: string | number | null;
    status: string;
    employeeNote: string;
    note: string | number | null;
    employee: EmployeeProfile;
  };
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

  getEmployeeShift: async (date: string) => {
    try {
      const response = await http.get(
        `employeeshift/week?date=${date}&IsMonth=false`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching employee shifts:", error);
      throw error;
    }
  },
};

import { EmployeeProfile } from "./../api/employee.api";
import { create } from "zustand";

export type EmployeeProfileState = {
  userProfile: EmployeeProfile | null;
  updateProfile: (newProfile: Partial<EmployeeProfile>) => void;
  clearProfile: () => void;
};

export const employeeStore = create<EmployeeProfileState>((set) => ({
  userProfile: null,

  //get profile when user login
  updateProfile: (newProfile: any) =>
    set((state: any) => ({
      userProfile: { ...state.userProfile, ...newProfile },
    })),

  //clear profile when user logout
  clearProfile: () =>
    set({
      userProfile: null,
    }),
}));

import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/employee/employeeSlice";
import departmentReducer from "../features/department/departmentSlice";
import designationReducer from "../features/designation/designationSlice";
import leaveReducer from "../features/leave/leaveSlice";
import gradeReducer from "../features/grade/gradeSlice";
import salaryReducer from "../features/salary/salarySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    department: departmentReducer,
    designation: designationReducer,
    leave: leaveReducer,
    grade: gradeReducer,
    salary: salaryReducer,
  },
});

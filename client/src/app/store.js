import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/employee/employeeSlice";
import departmentReducer from "../features/department/departmentSlice";
import designationReducer from "../features/designation/designationSlice";
import leaveReducer from "../features/leave/leaveSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    department: departmentReducer,
    designation: designationReducer,
    leave: leaveReducer,
  },
});

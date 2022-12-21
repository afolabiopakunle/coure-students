import { DepartmentModel } from './department.model';

export interface StudentModel {
  id?: number;
  firstName: string;
  lastName: string;
  title: string;
  phoneNumber: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  departmentId: number;
  department: DepartmentModel;
}


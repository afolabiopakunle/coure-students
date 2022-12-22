import { SchoolModel } from './school.model';

export interface DepartmentModel {
  id?: number,
  name?: string,
  schoolId: number,
  school: SchoolModel
}

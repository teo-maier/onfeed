import { Employee } from '../employee/employee';
import { Question } from '../form/form';
import { Option } from '../form/form';

export interface Answer {
  id?: string | number;
  value: string | null;
  question: Question;
  employee: Employee;
  options?: Option[];
}

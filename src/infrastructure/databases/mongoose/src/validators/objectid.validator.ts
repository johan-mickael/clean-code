import { Types } from 'mongoose';

export default class ObjectIdValidator {
  static isValid(id: string): boolean {
    return Types.ObjectId.isValid(id);
  }
}

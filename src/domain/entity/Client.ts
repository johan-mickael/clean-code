import { Permis } from './Permis';
import { Profession } from './Profession';

export class Client {
  constructor(
    public id: number,
    public permis: Permis,
    public profession: Profession,
    public lastName: string,
    public firstName: string,
    public email: string,
    public address: string,
  ) {}
}

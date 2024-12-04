export type PermisStatus = 'VALID' | 'EXPIRED' | 'SUSPENDED';

export class Permis {
  constructor(
    public id: number,
    public date: Date,
    public status: PermisStatus,
    public country: string,
  ) {
    if (country.length !== 2) {
      throw new Error('Country code must be exactly 2 characters.');
    }
  }
}

export default class UserDTO {
  constructor(
    public id: string | null,
    public email: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public dealerId: string,
  ) {}
}

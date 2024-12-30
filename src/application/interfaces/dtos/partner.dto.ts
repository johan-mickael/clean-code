export default class PartnerDTO {
  constructor(
    public id: string | null,
    public name: string,
    public email: string,
    public dealerId: string,
  ) {}
}

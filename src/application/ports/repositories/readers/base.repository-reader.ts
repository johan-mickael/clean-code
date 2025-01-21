export default abstract class BaseRepositoryReader<Entity> {
  abstract list(): Promise<any>;
  abstract getById(id: string): Promise<Entity | null>;
}

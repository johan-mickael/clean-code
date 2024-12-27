export default abstract class BaseRepositoryReader<Entity> {
  abstract list(): Promise<Entity[]>;
  abstract getById(id: string): Promise<Entity | null>;
}
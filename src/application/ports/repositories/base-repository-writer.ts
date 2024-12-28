export default abstract class BaseRepositoryWriter<Entity> {
  abstract create(): Promise<Entity>;
  abstract update(id: string): Promise<Entity>;
  abstract delete(id: string): Promise<void>;
}
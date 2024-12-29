export default abstract class BaseRepositoryWriter<Entity, EntityDTO> {
  abstract create(entityDTO: EntityDTO): Promise<Entity>;
  abstract update(id: string, entityDTO: EntityDTO): Promise<Entity>;
  abstract delete(id: string): Promise<void>;
}

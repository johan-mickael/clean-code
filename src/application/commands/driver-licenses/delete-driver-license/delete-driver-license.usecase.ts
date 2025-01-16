import DeleteDriverLicenseCommand from './delete-driver-license.command';

export default abstract class DeleteDriverLicenseUseCase {
  /**
   * @throws InvalidCommandError
   * @throws DriverLicenseNotFoundError
   */
  abstract execute(deleteDriverLicenseCommand: DeleteDriverLicenseCommand): Promise<void>;
}

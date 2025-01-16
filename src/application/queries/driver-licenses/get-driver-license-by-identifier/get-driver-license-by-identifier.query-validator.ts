import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetDriverLicenseByIdentifierQuery from './get-driver-license-by-identifier.query';

export default class GetDriverLicenseByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getDriverLicenseByIdentifierQuery: GetDriverLicenseByIdentifierQuery): void {
    const driverLicenseId = getDriverLicenseByIdentifierQuery.id.trim();

    if (!driverLicenseId) {
      throw new InvalidQueryError();
    }
  }
}

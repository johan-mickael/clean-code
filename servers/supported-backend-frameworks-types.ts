export const EXPRESS_SERVER = 'express';
export const NEST_SERVER = 'nest';

export type SupportedBackendFrameworkType = typeof EXPRESS_SERVER | typeof NEST_SERVER;

export const supportedBackendFrameworks: SupportedBackendFrameworkType[] = [EXPRESS_SERVER, NEST_SERVER];
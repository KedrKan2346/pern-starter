import { tryGetNumericValue } from "./utils";

/**
 * Get required process env value and throws exception if value does not exist.
 * @param envParamName Env parameter name.
 * @returns Env parameter value.
 */
export function getEnvValueOrThrow(envParamName: string): string {
  const envValue = process.env[envParamName];

  if (!envValue) {
    throw new Error(`[${envParamName}] is required but not defined.`);
  }

  return envValue;
}

/**
 * Declaration of service parameters which are passed via process env variables.
 */
export interface ServiceConfiguration {
  webServerPort?: number;
  webApiUrl: string;
}

/**
 * Get service parameters which are passed via process env variables.
 * @returns Service parameters which are passed via process env variables.
 */
export function getServiceConfiguration(): ServiceConfiguration {
  return {
    webApiUrl: getEnvValueOrThrow("WEB_API_URL"),
    webServerPort: tryGetNumericValue(getEnvValueOrThrow("WEB_SERVER_PORT")),
  };
}

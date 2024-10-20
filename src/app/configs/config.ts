function _validateEnvVar(variable: any, variableName: string) {
  if (!variable) throw new Error("Missing ENV Var: " + variableName);
  return variable as string;
}

const CUSTODIAN_PRIVATE_KEY: string = _validateEnvVar(
  process.env.NEXT_PUBLIC_CUSTODIAN_PRIVATE_KEY,
  "CUSTODIAN_PRIVATE_KEY"
);

const WSS_URL: string = _validateEnvVar(
  process.env.NEXT_PUBLIC_WSS_URL,
  "WSS_URL"
);

export { CUSTODIAN_PRIVATE_KEY, WSS_URL };

export const verifyEnvironemntVariable = (
  envVar: string | undefined,
  name: string
) => {
  if (!envVar) {
    throw new Error(`Environment Variable ${name} must be set!`);
  }
  return envVar as string;
};

import "dotenv/config";

export function getRequiredEnvironmentVariable(
  variableName: string
): string {
  const value = process.env[variableName];

  if (!value) {
    throw new Error(
      `Required environment variable "${variableName}" is missing.`
    );
  }

  return value;
}

export function getBaseUrl(): string {
  return process.env.BASE_URL ?? "https://mrq.com";
}

export function isBrowserStackRun(): boolean {
  return process.env.RUN_TARGET === "browserstack";
}
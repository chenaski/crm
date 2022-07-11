import getConfig from "next/config";

export class ServerProcessor {
  static buildPath(path: string): string {
    const { publicRuntimeConfig } = getConfig();

    return `${publicRuntimeConfig.serverUrl}${path}`;
  }
}

export const serverProcessor = new ServerProcessor();

// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

// move the interfaces to libs
export interface EnvironmentModel {
	apiUrl: string;
	appUrl: string;
	port?: number;
	production?: boolean;
}

export interface UiEnvironmentModel extends EnvironmentModel {
  baseHref?: string;
}

export const environment: Partial<UiEnvironmentModel> = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
};

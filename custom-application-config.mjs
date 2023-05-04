import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptions}
 */
const config = {
  name: 'AAFES POC Custom Application',
  entryPointUriPath,
  cloudIdentifier: 'gcp-us',
  env: {
    development: {
      initialProjectKey: 'aafes-poc',
    },
    production: {
      applicationId: 'clh0jjqbf0002yl018afz165x',
      url: 'https://aafes-poc.netlify.app',
    },
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products']
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/settings.svg}',
  mainMenuLink: {
    defaultLabel: 'AAFES POC',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [
    {
      uriPath: 'custom-objects',
      defaultLabel: 'Custom Objects',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    }
  ],
};

export default config;

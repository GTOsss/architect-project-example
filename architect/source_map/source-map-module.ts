export const aliases = {
  c: 'component',
  h: 'hook',
  i: 'index',
  s: 'store',
  api: 'api',
};

export const map = {
  /******************************** ↓ api module ↓ ***********************************/
  'src/api': {
    main: { template: 'api', specFileSourceName: 'swagger', serviceName: 'main' },
  },
  /******************************** ↓ app module ↓ ***********************************/
  'src/app/providers': {
    NotificationProvider: 'c',
  },
  'src/app/store': {
    notification: 's',
  },
  /******************************** ↓ auth module ↓ ***********************************/
  'src/auth/components/forms': {
    authForm: 'c',
  },
  'src/auth/containers': {
    AuthPage: 'c',
  },
  'src/auth/store': {
    user: 's',
    auth: 's',
  },
  /******************************** ↓ common module ↓ ***********************************/
  'src/common/components/inputs': {
    Input: 'c',
    Button: 'c',
    Select: 'c',
    Checkbox: 'c',
    // Textarea: 'c',
    // Dropzone: 'c',
    index: 'i',
  },
  'src/common/layouts': {
    PrimaryLayout: 'c',
  },
  'src/common/layouts/components': {
    Header: 'c',
    Sidebar: 'c',
    PageContent: 'c',
    index: 'i',
  },
  'src/common/components': {
    Link: 'c',
    LinkButton: 'c',
    Text: 'c',
    ListPlaceholder: 'c',
    Table: 'c',
    Skeleton: 'c',
    index: 'i',
  },
  'src/common/hooks': {
    // useBreakpoint: 'h',
  },
};

import type { GlobalProvider } from '@ladle/react';
import * as React from 'react';

export const Provider: GlobalProvider = ({ children, globalState }) =>
  React.cloneElement(children as React.ReactElement, { rtl: globalState.rtl });

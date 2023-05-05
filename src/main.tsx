import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { store } from './app/redux/store';
import { themeOverrides } from './app/theme/mantine-overrides';
import { environment } from './environments/environment';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter basename={environment.baseHref}>
      {/* <MantineProvider theme={themeOverrides} withNormalizeCSS withGlobalStyles> */}
        <StrictMode>
          <App />
        </StrictMode>
      {/* </MantineProvider> */}
    </BrowserRouter>
  </Provider>
);

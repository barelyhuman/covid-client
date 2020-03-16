import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import OverallData from './components/OverallData';
import CountryBasedData from './components/CountryBasedData';

const engine = new Styletron();

export default function Hello() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <OverallData />
        <CountryBasedData />
      </BaseProvider>
    </StyletronProvider>
  );
}

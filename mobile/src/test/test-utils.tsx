import { FC, ReactElement } from 'react'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { RenderOptions, render } from '@testing-library/react-native'

import { THEME } from '../theme'

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const AllTheProviders: FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react-native'

// override render method
export {customRender as render}
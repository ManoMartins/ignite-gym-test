import { ExerciseCard } from '@components/ExerciseCard'
import {act, render, fireEvent, screen} from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import { THEME } from '../../theme'

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('ExerciseCard', () => {
  it('should be able to render with button', () => {
    const data = {
      id: '1', 
      demo: "Teste", 
      group: 'Antebraço', 
      name: 'Rosca punho', 
      repetitions: '12', 
      series: 4,
      thumb: 'rosca-punho',
      updated_at: '2023-04-29'
    }

    const handlePress = jest.fn()
  
    render(
      <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
        <ExerciseCard data={data} onPress={handlePress} />
      </NativeBaseProvider>
    )

    fireEvent.press(screen.getByText('Rosca punho'))
    expect(handlePress).toHaveBeenCalled()
  })

  it('should be able to render ExerciseCard with correct exercise name and details', () => {
    const data = {
      id: '1', 
      demo: "Teste", 
      group: 'Antebraço', 
      name: 'Rosca punho', 
      repetitions: '12', 
      series: 4,
      thumb: 'rosca-punho',
      updated_at: '2023-04-29'
    }
  
    const { getByText } = render(
      <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
        <ExerciseCard data={data} />
      </NativeBaseProvider>
    )
  
    expect(getByText('Rosca punho')).toBeTruthy()
    expect(getByText('4 séries x 12 repetições')).toBeTruthy()
  })
})

import { HistoryCard } from '@components/HistoryCard'
import {render} from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import { THEME } from '../../theme'

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('HistoryCard', () => {
  it('should be able render component with valid data', () => {
    const currentDate = new Date()
    
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const time = `${hour}:${minutes}`;
    
    const data = {
      id: '1',
      name: 'Rosca punho',
      group: 'Antebraço',
      hour: time,
      created_at: currentDate.toISOString()
    }
    
    const { getAllByText } = render(
      <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
        <HistoryCard data={data} />
      </NativeBaseProvider>
    )
    

    
    expect(getAllByText(time)).toBeTruthy()
    expect(getAllByText('Antebraço')).toBeTruthy()
    expect(getAllByText('Rosca punho')).toBeTruthy()
  })
})

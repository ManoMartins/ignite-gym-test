import { HistoryCard } from '@components/HistoryCard'
import { render } from '../../test/test-utils'


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
    
    const { getAllByText } = render(<HistoryCard data={data} />)
    

    
    expect(getAllByText(time)).toBeTruthy()
    expect(getAllByText('Antebraço')).toBeTruthy()
    expect(getAllByText('Rosca punho')).toBeTruthy()
  })
})

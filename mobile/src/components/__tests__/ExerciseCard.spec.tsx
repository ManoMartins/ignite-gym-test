import { ExerciseCard } from '@components/ExerciseCard'
import { render, fireEvent, screen } from '../../test/test-utils'

describe('ExerciseCard', () => {
  it('should invoke onPress callback when "Rosca punho" exercise card is pressed', () => {
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
  
    render(<ExerciseCard data={data} onPress={handlePress} />)

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
  
    const { getByText } = render(<ExerciseCard data={data} />)
  
    expect(getByText('Rosca punho')).toBeTruthy()
    expect(getByText('4 séries x 12 repetições')).toBeTruthy()
  })
})

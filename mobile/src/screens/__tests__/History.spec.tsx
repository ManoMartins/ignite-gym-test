
import { NativeBaseProvider } from 'native-base'
import {act, render, screen, waitFor} from '@testing-library/react-native'

import { History } from '@screens/History';

import { THEME } from '../../theme'
import { NavigationContainer } from '@react-navigation/native';
import { api } from '@services/api';
import moment from 'moment';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const data = [
  {
    "title": "18-11-2023",
    "data": [
      {
        "id": "1",
        "name": "Rosca punho",
        "group": "Antebraço",
        "hour": "09:30",
        "created_at": "2023-11-18T09:30:00Z"
      },
      {
        "id": "2",
        "name": "Supino inclinado com barra",
        "group": "Peito",
        "hour": "11:30",
        "created_at": "2023-11-18T11:30:00Z"
      },
      {
        "id": "3",
        "name": "Pulley frontal",
        "group": "Costas",
        "hour": "13:30",
        "created_at": "2023-11-18T13:30:00Z"
      },
      {
        "id": "4",
        "name": "Crucifixo reto",
        "group": "Peito",
        "hour": "15:00",
        "created_at": "2023-11-18T15:00:00Z"
      },
      {
        "id": "5",
        "name": "Elevação lateral com halteres sentado",
        "group": "Ombro",
        "hour": "16:30",
        "created_at": "2023-11-18T16:30:00Z"
      }
    ]
  },
  {
    "title": "19-11-2023",
    "data": [
      {
        "id": "6",
        "name": "Remada baixa",
        "group": "Costas",
        "hour": "10:00",
        "created_at": "2023-11-19T10:00:00Z"
      },
      {
        "id": "7",
        "name": "Martelo em pé",
        "group": "Bíceps",
        "hour": "12:00",
        "created_at": "2023-11-19T12:00:00Z"
      },
      {
        "id": "8",
        "name": "Leg press 45 graus",
        "group": "Pernas",
        "hour": "14:30",
        "created_at": "2023-11-19T14:30:00Z"
      }
    ]
  },
  {
    "title": "20-11-2023",
    "data": [
      {
        "id": "9",
        "name": "Corda Cross",
        "group": "Tríceps",
        "hour": "09:00",
        "created_at": "2023-11-20T09:00:00Z"
      },
      {
        "id": "10",
        "name": "Stiff",
        "group": "Pernas",
        "hour": "11:30",
        "created_at": "2023-11-20T11:30:00Z"
      },
      {
        "id": "11",
        "name": "Encolhimento com halteres",
        "group": "Trapézio",
        "hour": "14:00",
        "created_at": "2023-11-20T14:00:00Z"
      },
      {
        "id": "12",
        "name": "Neck Press",
        "group": "Ombro",
        "hour": "16:30",
        "created_at": "2023-11-20T16:30:00Z"
      }
    ]
  }
]

describe('History', () => {
  it('should be able to display Loading component during data fetching', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data })

    const { getByTestId, queryByTestId } = render(
      <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
        <NavigationContainer>
          <History />
        </NavigationContainer>
      </NativeBaseProvider>
    )

    expect(getByTestId('loading-indicator')).toBeTruthy()
    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull()
    })
  })
  
  it('should be able to display Toast on API error', async () => {
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('API error'))

    const { getByText, getByTestId, queryByTestId } = await waitFor(() => render(
      <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
        <NavigationContainer>
          <History />
        </NavigationContainer>
      </NativeBaseProvider>
    ))

    expect(getByTestId('toast-message')).toBeTruthy()
    expect(getByText('Não foi possível carregar os detalhes do exercício')).toBeTruthy()

    await waitFor(() => {
      expect(queryByTestId('toast-message')).toBeNull()
    }, {
      timeout: 2200
    })
  })
  
  it('should be able to render the list correctly with data', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data })

    const { getByText, queryByText } = await waitFor(() => render(
      <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
        <NavigationContainer>
          <History />
        </NavigationContainer>
      </NativeBaseProvider>
    ))

    expect(getByText(data[0].title)).toBeTruthy()
    expect(getByText(data[1].title)).toBeTruthy()
    expect(queryByText(data[2].title)).toBeFalsy()
  })

  it('should be able to display correct message on empty list', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: [] })

    const { getByText } = await waitFor(() => render(
      <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
        <NavigationContainer>
          <History />
        </NavigationContainer>
      </NativeBaseProvider>
    ))

    expect(getByText('Não há exercícios registrados ainda. Vamos fazer exercícios hoje?')).toBeTruthy()
  })
})
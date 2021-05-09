import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import BetList from './BetList';
import api from 'utils/api';
const BETS = [
  {
    ticketValue: 99,
    customerName: 'John Doe',
    customerPhone: '11 5555-1122',
    customerEmail: 'johndoe@test.com',
  },
  {
    ticketValue: 98,
    customerName: 'Jane Doe',
    customerPhone: '11 5555-2233',
    customerEmail: 'janedoe@test.com',
  },
];

describe('BetList component', () => {
  it('should render bet details correctly', async () => {
    jest.spyOn(api, 'getAllBets').mockResolvedValue(BETS);

    const { findByText } = render(<BetList></BetList>);

    expect(await findByText('99')).toBeInTheDocument();
    expect(await findByText('John Doe')).toBeInTheDocument();
    expect(await findByText('11 5555-1122')).toBeInTheDocument();
    expect(await findByText('johndoe@test.com')).toBeInTheDocument();

    expect(await findByText('98')).toBeInTheDocument();
    expect(await findByText('Jane Doe')).toBeInTheDocument();
    expect(await findByText('11 5555-2233')).toBeInTheDocument();
    expect(await findByText('janedoe@test.com')).toBeInTheDocument();
  });
});

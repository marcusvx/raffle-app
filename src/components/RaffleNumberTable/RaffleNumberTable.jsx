import { React, useEffect, useState } from 'react';
import './RaffleNumberTable.css';
import { useModal } from 'react-modal-hook';
import { Box } from 'react-bulma-components';
import { toast } from 'react-toastify';
import RaffleNumber from '../RaffleNumber';
import FormModal from '../FormModal';
import api from '../../utils/api';

export default () => {
  const [selectedTicket, setSelectedTicket] = useState();
  const [tickets, setTickets] = useState();

  useEffect(() => {
    async function getAllTickets() {
      const result = await api.readAll();
      setTickets(
        result.map((item) => {
          const [value, taken, ref] = item;

          return {
            value,
            taken,
            id: ref['@ref'].id,
          };
        }),
      );
    }
    getAllTickets();
  }, []);

  const confirmedNumber = (ticket) => {
    const { value } = ticket;

    setTickets((state) => {
      const takenTicket = state.find((n) => n.value === value);
      takenTicket.taken = true;
      return state;
    });

    toast.success(`Pronto! O número ${value} é seu!`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const [showModal, hideModal] = useModal(
    () => (
      <FormModal
        hideModal={hideModal}
        selectedTicket={selectedTicket}
        onConfirm={confirmedNumber}
      />
    ),
    [selectedTicket],
  );

  const handleClick = (ticket) => {
    setSelectedTicket(ticket);
    showModal();
  };

  return (
    <Box className="numbers-table">
      {tickets
        && tickets.map((ticket) => (
          <RaffleNumber
            key={ticket.value}
            ticket={ticket}
            onClick={handleClick}
          />
        ))}
    </Box>
  );
};

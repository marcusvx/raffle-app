import "./RaffleNumberTable.css";
import FormModal from "../FormModal";
import RaffleNumber from "../RaffleNumber";
import { useModal } from "react-modal-hook";
import { useEffect, useState } from "react";
import { Box } from "react-bulma-components";
import { toast } from "react-toastify";
import api from "../../utils/api";

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
            id: ref["@ref"].id,
          };
        })
      );
    }
    getAllTickets();
  }, []);

  const confirmedNumber = (ticket) => {
    const { value } = ticket;

    setTickets((state) => {
      state.find((n) => n.value === value).taken = true;
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
      ></FormModal>
    ),
    [selectedTicket]
  );

  const handleClick = (ticket) => {
    setSelectedTicket(ticket);
    showModal();
  };

  return (
    <Box className="numbers-table">
      {tickets &&
        tickets.map((ticket) => (
          <RaffleNumber
            key={ticket.value}
            ticket={ticket}
            onClick={handleClick}
          ></RaffleNumber>
        ))}
    </Box>
  );
};

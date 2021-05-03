import "./styles.css";
import { FormModal } from "../FormModal";
import { RaffleNumber } from "../RaffleNumber";
import { useModal } from "react-modal-hook";
import { useEffect, useState } from "react";
import { Box, Heading } from "react-bulma-components";

export const NumbersTable = () => {
  const [selectedNumber, setSelectedNumber] = useState();
  const [numbers, setNumbers] = useState();

  useEffect(() => {
    const numbers = Array(100)
      .fill(1)
      .map((c, i) => ({ value: (i + 1) * c, taken: false }));

    setNumbers(numbers);
  }, []);

  const confirmedNumber = (number) => {
    setNumbers((state) => {
      state.find((n) => n.value === number).taken = true;
      return state;
    });
    console.log(number);
  };

  const [showModal, hideModal] = useModal(
    () => (
      <FormModal
        hideModal={hideModal}
        selectedNumber={selectedNumber}
        onConfirm={confirmedNumber}
      ></FormModal>
    ),
    [selectedNumber]
  );

  const handleClick = (n) => {
    setSelectedNumber(n);
    showModal();
  };

  return (
    <>
      <Heading subtitle className="m-4">
        Clique em um número para concorrer ao sorteio
      </Heading>
      <Box className="numbers-table">
        {numbers &&
          numbers.map((n) => (
            <RaffleNumber
              taken={n.taken}
              value={n.value}
              onClick={handleClick}
            ></RaffleNumber>
          ))}
      </Box>
    </>
  );
};

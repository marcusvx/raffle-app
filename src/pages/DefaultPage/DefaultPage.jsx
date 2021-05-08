import TopNavbar from "../../components/TopNavbar";
import { Heading } from "react-bulma-components";
import RaffleNumberTable from "../../components/RaffleNumberTable";

export default () => {
  return (
    <>
      <TopNavbar></TopNavbar>
      <Heading subtitle className="m-4">
        Clique em um número para concorrer ao sorteio
      </Heading>
      <RaffleNumberTable></RaffleNumberTable>
    </>
  );
};

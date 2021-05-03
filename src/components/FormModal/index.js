import "./styles.css";
import { Modal, Button, Form } from "react-bulma-components";
import { useState } from "react";

export const FormModal = (props) => {
  const { hideModal, selectedNumber, onConfirm } = props;
  const [name, setName] = useState("");
  const [nameState, setNameState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const confirmAndClose = () => {
    onConfirm(selectedNumber);
    hideModal();
  };

  const invalidName = () => {
    return !name || name.length <= 2 || (name.match(/ /g) || []).length === 0;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameState(() => {
      return invalidName() ? "danger" : "success";
    });
  };

  return (
    <Modal show={true} onClose={() => hideModal()}>
      <Modal.Card>
        <Modal.Card.Header showClose={true}>
          <Modal.Card.Title>
            Você escolheu o número <strong>{selectedNumber}</strong>
          </Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <p className="mt-2 mb-4">
            Você escolheu o número <strong>{selectedNumber}</strong>. Por favor,
            informe os dados abaixo para que possamos registrar seu número no
            sorteio.
          </p>
          <form>
            <Form.Field>
              <Form.Label htmlFor="name">
                Nome completo (obrigatório)
              </Form.Label>
              <Form.Control>
                <Form.Input
                  color={nameState}
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  onBlur={handleNameChange}
                />
              </Form.Control>
              {nameState === "danger" && (
                <Form.Help color={nameState}>
                  Informe seu nome completo
                </Form.Help>
              )}
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="phone">Telefone</Form.Label>
              <Form.Control>
                <Form.Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="email"> E-mail</Form.Label>
              <Form.Control>
                <Form.Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Control>
            </Form.Field>
          </form>
        </Modal.Card.Body>
        <Modal.Card.Footer align="right">
          <Button
            color="success"
            onClick={confirmAndClose}
            disabled={invalidName()}
          >
            Confirmar Número
          </Button>
          <Button onClick={hideModal}>Escolher outro</Button>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  );
};
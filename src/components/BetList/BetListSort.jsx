import React from 'react';
import {
  Button, Form, Heading, Icon,
} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortAmountDown,
  faSortAmountUp,
  faSortNumericDown,
  faSortNumericUp,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const BetListSort = ({
  changeSort, sortDesc, sortType,
}) => (
  <div>
    <Heading className="is-hidden-mobile" heading>Ordenação</Heading>
    <Form.Field className="has-addons is-justify-content-flex-end">
      <Form.Control>
        <Button
          className={sortType === 'default' ? 'is-primary is-selected' : ''}
          onClick={() => changeSort('default')}
        >
          {sortType === 'default' && (
          <Icon className="is-small">
            <FontAwesomeIcon icon={sortDesc ? faSortAmountDown : faSortAmountUp} />
          </Icon>
          )}
          <span className="is-size-7-mobile">Registro</span>
        </Button>
      </Form.Control>
      <Form.Control>
        <Button
          className={sortType === 'name' ? 'is-primary is-selected' : ''}
          onClick={() => changeSort('name')}
        >
          {sortType === 'name' && (
          <Icon className="is-small">
            <FontAwesomeIcon icon={sortDesc ? faSortAlphaUp : faSortAlphaDown} />
          </Icon>
          )}
          <span className="is-size-7-mobile">Nome</span>
        </Button>
      </Form.Control>
      <Form.Control>
        <Button
          className={sortType === 'number' ? 'is-primary is-selected' : ''}
          onClick={() => changeSort('number')}
        >
          {sortType === 'number' && (
          <Icon className="is-small">
            <FontAwesomeIcon icon={sortDesc ? faSortNumericUp : faSortNumericDown} />
          </Icon>
          )}
          <span className="is-size-7-mobile">Número</span>
        </Button>
      </Form.Control>
    </Form.Field>
  </div>
);

BetListSort.propTypes = {
  changeSort: PropTypes.func.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  sortType: PropTypes.string.isRequired,
};

export default BetListSort;

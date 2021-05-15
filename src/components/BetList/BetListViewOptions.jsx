import PropTypes from 'prop-types';
import {
  Button, Form, Heading, Icon,
} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const BetListViewOptions = ({ changeView, showAsTable }) => (
  <div>
    <Heading className="is-hidden-mobile" heading>Exibição</Heading>
    <Form.Field className="has-addons is-justify-content-flex-end">
      <Form.Control>
        <Button
          className={showAsTable ? '' : 'is-primary is-selected'}
          onClick={() => changeView(false)}
        >
          <Icon className="is-small">
            <FontAwesomeIcon icon={faThLarge} />
          </Icon>
        </Button>
      </Form.Control>
      <Form.Control>
        <Button
          className={showAsTable ? 'is-primary is-selected' : ''}
          onClick={() => changeView(true)}
        >
          <Icon className="is-small">
            <FontAwesomeIcon icon={faThList} />
          </Icon>
        </Button>
      </Form.Control>
    </Form.Field>
  </div>
);

BetListViewOptions.propTypes = {
  changeView: PropTypes.func.isRequired,
  showAsTable: PropTypes.bool.isRequired,
};

export default BetListViewOptions;

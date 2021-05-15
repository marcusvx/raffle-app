import { Button, Form, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const BetSearchForm = ({ onSearch, loading }) => {
  const searchRef = useRef(null);

  const search = (e) => {
    e.preventDefault();
    onSearch(searchRef.current.value);
  };

  const clearSearch = () => {
    onSearch('');
    searchRef.current.value = '';
  };

  return (
    <form>
      <Form.Field kind="addons">
        <Form.Control className={`has-icons-left ${loading ? 'is-loading' : ''}`}>
          <input
            type="text"
            className="input"
            placeholder="Nome ou número"
            ref={searchRef}
          />
          <Icon align="left" className="is-small">
            <FontAwesomeIcon icon={faSearch} />
          </Icon>
        </Form.Control>
        <Form.Control>
          <Button type="submit" onClick={search}>
            Buscar
          </Button>
        </Form.Control>
        <Form.Control>
          <Button type="button" onClick={clearSearch}>
            <Icon className="is-small">
              <FontAwesomeIcon icon={faTimes} />
            </Icon>
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
  );
};

BetSearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default BetSearchForm;

import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import './styles.css';

import PricesSingle from '../components/PriceSingle/';
import PricesBox from '../../_common/PricesBox/'
import ButtonIcon from '../../_common/ButtonIcon/';

import * as helpers from '../helpers';
import * as actions from '../actions';

import { withHooks } from '../../../utils/withHooks';

const List = props => {
  const { list, interest, handleAddNewPrice, handleOnChangePrice, handleRemovePrice } = props;

  return (
    <PricesBox
      title='Lista de precios'
      button={
        <ButtonIcon
          icon='plus'
          type='primary'
          label='Agregar nuevo'
          onClick={handleAddNewPrice}
        />
      }
    >
      <section className='table'>
        <table>
          <tr>
            <th style={{ textAlign: 'left' }}>Precio efectivo</th>
            <th>Precio 3 cuotas ({interest.due3}%)</th>
            <th>Precio 12 cuotas ({interest.due12}%)</th>
            <th><FontAwesome name='trash-o' /></th>
          </tr>

          { list.map((item, i) =>
            <PricesSingle
              id={i}
              item={item}
              interest={interest}
              handleOnChangePrice={handleOnChangePrice}
              handleRemovePrice={handleRemovePrice}
            />
          )}

          <tr className='last'>
            <td style={{ textAlign: 'left' }}>🛒 Cantidad: # {list.length}</td>
          </tr>
        </table>
      </section>
    </PricesBox>
  );
};


const mapStateToProps = state => ({
  list: state.prices.list,
  interest: state.config.interest
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleAddNewPrice: () => dispatch(actions.addPrice()),
  handleRemovePrice: prices => dispatch(actions.removePrice({ ...prices })),
  handleOnChangePrice: prices =>  dispatch(actions.onChangePrice({ id: prices.id, prices: helpers.generatePricesList(prices) }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHooks(List));

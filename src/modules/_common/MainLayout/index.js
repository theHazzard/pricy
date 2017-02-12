import React from 'react';
import { connect } from 'react-redux';
import './styles.css';

import MainMenu from '../MainMenu/';
import FixedNavbar from '../FixedNavbar/';
import Alert from '../Alert';

import pdfGenerator from '../../../utils/pdfGenerator';

const MainLayout = props => {
  return (
    <div id="main">
      <div id="container">
        <MainMenu />
        <Alert
          type='warning'
          text={`
            ¿Qué es esto? Es una aplicación para imprimir etiquetas de precios en tandas.
            Por disposición del Gobierno argentino los locales desde 2017 tienen que mostrar
            a sus clientes los precios en tres formatos: efectivo, interés en 3 cuotas e interés en 12 cuotas.
            Esta aplicación ayuda a generar automáticamente los dos últimos precios y a imprimir las etiquetas.
          `}
        />

        {props.children}
      </div>
      <FixedNavbar {...props} />
    </div>
  )
};

const mapStateToProps = state => ({
  list: state.prices.list,
  interest: state.config.interest
});

const mapDispatchToProps = dispatch => ({
  handlePrint: (list, interest) => pdfGenerator(list, interest)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);


import React from 'react';
import { ThemeProvider } from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faMoneyBillAlt,
  faVenusMars,
  faLocationArrow,
  faArrowLeft,
  faGenderless,
  faMars,
  faNeuter,
  faTransgender,
  faVenus,
  faBath,
  faBed,
  faBeer,
  faBicycle,
  faBuilding,
  faCar,
  faCoffee,
  faGamepad,
  faHome,
  faHospital,
  faPhoneVolume,
  faPlane,
  faShower,
  faStreetView,
  faSubway,
  faTaxi,
  faTrain,
  faUniversity,
} from '@fortawesome/fontawesome-free-solid';
import {
  faCcAmazonPay,
  faCcAmex,
  faCcApplePay,
  faCcDiscover,
  faCcMastercard,
  faCcPaypal,
  faCcVisa,
  faEthereum,
  faGoogleWallet,
} from '@fortawesome/fontawesome-free-brands';

import PieMenu, { PieCenter, Slice } from 'src';

import * as styles from './PreferenceSelector.style';

const theme = {
  pieMenu: {
    container: styles.container,
    center: styles.center,
  },
  slice: {
    container: styles.slice,
  },
};

const INITIAL = 0;
const PAYMENT = 1;
const GENDERS = 2;
const LOCATIONS = 3;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentOption: null,
      gender: null,
      location: null,
      choice: 0,
    };
  }

  showPayments = () => {
    this.setState({ choice: PAYMENT });
  }

  selectPayment = paymentOption => () => {
    this.setState({ paymentOption });
  }

  showGenders = () => {
    this.setState({ choice: GENDERS });
  }

  selectGender = gender => () => {
    this.setState({ gender });
  }

  showLocations = () => {
    this.setState({ choice: LOCATIONS });
  }

  selectLocation = location => () => {
    this.setState({ location });
  }

  goBack = () => {
    const { choice } = this.state;
    if (choice === INITIAL) return;
    this.setState({ choice: INITIAL });
  }

  render() {
    const { paymentOption, gender, location, choice } = this.state;
    const Center = props => (
      <PieCenter {...props} onClick={this.goBack}>
        {choice !== 0 && <FontAwesomeIcon icon={faArrowLeft} size="2x" />}
      </PieCenter>
    );
    return (
      <ThemeProvider theme={theme}>
        <PieMenu centerRadius="30px" Center={Center}>
          {choice === 0 && (
            <React.Fragment>
              <Slice onSelect={this.showPayments} attrs={{ filled: `${paymentOption != null}` }}>
                <FontAwesomeIcon icon={paymentOption || faMoneyBillAlt} size="2x" />
              </Slice>
              <Slice onSelect={this.showGenders} attrs={{ filled: `${gender != null}` }}>
                <FontAwesomeIcon icon={gender || faVenusMars} size="2x" />
              </Slice>
              <Slice onSelect={this.showLocations} attrs={{ filled: `${location != null}` }}>
                <FontAwesomeIcon icon={location || faLocationArrow} size="2x" />
              </Slice>
            </React.Fragment>
          )}
          {choice === PAYMENT && (
            <React.Fragment>
              <Slice
                onSelect={this.selectPayment(faCcAmazonPay)}
                attrs={{ active: `${paymentOption === faCcAmazonPay}` }}
              >
                <FontAwesomeIcon icon={faCcAmazonPay} size="2x" />
              </Slice>
              <Slice
                onSelect={this.selectPayment(faCcAmex)}
                attrs={{ active: `${paymentOption === faCcAmex}` }}
              >
                <FontAwesomeIcon icon={faCcAmex} size="2x" />
              </Slice>
              <Slice
                onSelect={this.selectPayment(faCcApplePay)}
                attrs={{ active: `${paymentOption === faCcApplePay}` }}
              >
                <FontAwesomeIcon icon={faCcApplePay} size="2x" />
              </Slice>
              <Slice
                onSelect={this.selectPayment(faCcDiscover)}
                attrs={{ active: `${paymentOption === faCcDiscover}` }}
              >
                <FontAwesomeIcon icon={faCcDiscover} size="2x" />
              </Slice>
              <Slice
                onSelect={this.selectPayment(faCcMastercard)}
                attrs={{ active: `${paymentOption === faCcMastercard}` }}
              >
                <FontAwesomeIcon icon={faCcMastercard} size="2x" />
              </Slice>
              <Slice
                onSelect={this.selectPayment(faCcPaypal)}
                attrs={{ active: `${paymentOption === faCcPaypal}` }}
              >
                <FontAwesomeIcon icon={faCcPaypal} size="2x" />
              </Slice>
              <Slice
                onSelect={this.selectPayment(faCcVisa)}
                attrs={{ active: `${paymentOption === faCcVisa}` }}
              >
                <FontAwesomeIcon icon={faCcVisa} size="2x" />
              </Slice>
              <Slice
                onSelect={this.selectPayment(faEthereum)}
                attrs={{ active: `${paymentOption === faEthereum}` }}
              >
                <FontAwesomeIcon icon={faEthereum} size="2x" />
              </Slice>
              <Slice
                onSelect={this.selectPayment(faGoogleWallet)}
                attrs={{ active: `${paymentOption === faGoogleWallet}` }}
              >
                <FontAwesomeIcon icon={faGoogleWallet} size="2x" />
              </Slice>
            </React.Fragment>
          )}
          {choice === GENDERS && (
            <React.Fragment>
              faGenderless
              <Slice
                onSelect={this.selectGender(faGenderless)}
                contentHeight="66px"
                attrs={{ active: `${gender === faGenderless}` }}
              >
                <div>
                  <FontAwesomeIcon icon={faGenderless} size="2x" />
                  <p>
                    {'Genderless'}
                  </p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectGender(faVenus)}
                contentHeight="66px"
                attrs={{ active: `${gender === faVenus}` }}
              >
                <div>
                  <FontAwesomeIcon icon={faVenus} size="2x" />
                  <p>
                    {'Female'}
                  </p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectGender(faNeuter)}
                contentHeight="66px"
                attrs={{ active: `${gender === faNeuter}` }}
              >
                <div>
                  <FontAwesomeIcon icon={faNeuter} size="2x" />
                  <p>
                    {'Neuter'}
                  </p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectGender(faTransgender)}
                contentHeight="66px"
                attrs={{ active: `${gender === faTransgender}` }}
              >
                <div>
                  <FontAwesomeIcon icon={faTransgender} size="2x" />
                  <p>
                    {'Transgender'}
                  </p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectGender(faMars)}
                contentHeight="66px"
                attrs={{ active: `${gender === faMars}` }}
              >
                <div>
                  <FontAwesomeIcon icon={faMars} size="2x" />
                  <p>
                    {'Male'}
                  </p>
                </div>
              </Slice>
            </React.Fragment>
          )}
          {choice === LOCATIONS && (
            <React.Fragment>
              <Slice
                onSelect={this.selectLocation(faBath)}
                attrs={{ active: `${location === faBath}` }}
              >
                <FontAwesomeIcon icon={faBath} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faBed)}
                attrs={{ active: `${location === faBed}` }}
              >
                <FontAwesomeIcon icon={faBed} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faBeer)}
                attrs={{ active: `${location === faBeer}` }}
              >
                <FontAwesomeIcon icon={faBeer} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faBicycle)}
                attrs={{ active: `${location === faBicycle}` }}
              >
                <FontAwesomeIcon icon={faBicycle} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faBuilding)}
                attrs={{ active: `${location === faBuilding}` }}
              >
                <FontAwesomeIcon icon={faBuilding} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faCar)}
                attrs={{ active: `${location === faCar}` }}
              >
                <FontAwesomeIcon icon={faCar} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faCoffee)}
                attrs={{ active: `${location === faCoffee}` }}
              >
                <FontAwesomeIcon icon={faCoffee} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faGamepad)}
                attrs={{ active: `${location === faGamepad}` }}
              >
                <FontAwesomeIcon icon={faGamepad} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faHome)}
                attrs={{ active: `${location === faHome}` }}
              >
                <FontAwesomeIcon icon={faHome} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faHospital)}
                attrs={{ active: `${location === faHospital}` }}
              >
                <FontAwesomeIcon icon={faHospital} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faPhoneVolume)}
                attrs={{ active: `${location === faPhoneVolume}` }}
              >
                <FontAwesomeIcon icon={faPhoneVolume} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faPlane)}
                attrs={{ active: `${location === faPlane}` }}
              >
                <FontAwesomeIcon icon={faPlane} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faShower)}
                attrs={{ active: `${location === faShower}` }}
              >
                <FontAwesomeIcon icon={faShower} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faStreetView)}
                attrs={{ active: `${location === faStreetView}` }}
              >
                <FontAwesomeIcon icon={faStreetView} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faSubway)}
                attrs={{ active: `${location === faSubway}` }}
              >
                <FontAwesomeIcon icon={faSubway} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faTaxi)}
                attrs={{ active: `${location === faTaxi}` }}
              >
                <FontAwesomeIcon icon={faTaxi} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faTrain)}
                attrs={{ active: `${location === faTrain}` }}
              >
                <FontAwesomeIcon icon={faTrain} />
              </Slice>
              <Slice
                onSelect={this.selectLocation(faUniversity)}
                attrs={{ active: `${location === faUniversity}` }}
              >
                <FontAwesomeIcon icon={faUniversity} />
              </Slice>
            </React.Fragment>
          )}
        </PieMenu>
      </ThemeProvider>
    );
  }
}

import PropTypes from 'prop-types';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import { useMemo } from 'react';
import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {
  const convertedAmount = useMemo(() => {
    if (from === 'USD' && to === 'PLN') return convertUSDToPLN(amount);
    if (from === 'PLN' && to === 'USD') return convertPLNToUSD(amount);
    return formatAmountInCurrency(amount, from);
  }, [from, to, amount]);

  const formattedAmount = useMemo(
    () => formatAmountInCurrency(amount, from),
    [amount, from]
  );

  if (amount < 0) {
    return (
      <div className={styles.result} data-testid='resultBox'>
        Wrong value...
      </div>
    );
  } else
    return (
      <div className={styles.result} data-testid='resultBox'>
        {formattedAmount} = {convertedAmount}
      </div>
    );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default ResultBox;

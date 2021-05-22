import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const PreviousNext = ({
  current,
  next,
  nextButtonType,
  totalSteps,
  prev
}) => (
  <div className="steps-action">
    {current > 0 && (
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: '0 8px' }}
        onClick={prev}
      >
        Previous
      </Button>
    )}
    {current < totalSteps - 1 && nextButtonType !== 'submit' && (
      <Button color="primary" variant="contained" onClick={next}>
        Next
      </Button>
    )}
    {current < totalSteps - 1 && nextButtonType === 'submit' && (
      <Button color="primary" variant="contained" type="submit">
        Next
      </Button>
    )}
    {current === totalSteps - 1 && (
      <Button
        color="primary"
        variant="contained"
        // onClick={() => message.success('Processing complete!')}
      >
        Done
      </Button>
    )}
  </div>
);

PreviousNext.propTypes = {
  current: PropTypes.number,
  next: PropTypes.func,
  nextButtonType: PropTypes.string,
  totalSteps: PropTypes.number,
  prev: PropTypes.func
};

PreviousNext.defaultProps = {
  current: 0,
  totalSteps: 4,
  nextButtonType: 'button'
};

export default PreviousNext;

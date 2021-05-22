import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Steps, message } from 'antd';
import { Button } from '@material-ui/core';
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined
} from '../icons/icons';

const { Step } = Steps;

const Wizard = ({ steps, showPreviousNext, currentStep }) => {
  const [current, setCurrent] = React.useState(currentStep);

  // Runs when ever currentStep changes
  useEffect(() => {
    setCurrent(currentStep);
  }, [currentStep]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Steps current={current}>
        {steps.map((step) => (
          <Step
            key={step.title}
            status={step.status}
            title={step.title}
            icon={step.icon}
          />
        ))}
      </Steps>
      {steps.length > 0 && (
        <div className="steps-content">{steps[current].content}</div>
      )}
      {showPreviousNext && (
        <div className="steps-action">
          {current > 0 && (
            <Button
              variant="outlined"
              color="primary"
              style={{ margin: '0 8px' }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button color="primary" variant="contained" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => message.success('Processing complete!')}
            >
              Done
            </Button>
          )}
        </div>
      )}
    </>
  );
};

Wizard.propTypes = {
  steps: PropTypes.array,
  showPreviousNext: PropTypes.bool,
  currentStep: PropTypes.number
};

Wizard.defaultProps = {
  steps: [
    {
      status: 'finish',
      title: 'Login',
      icon: <UserOutlined />,
      content: 'First - content'
    },
    {
      status: 'finish',
      title: 'Verification',
      icon: <SolutionOutlined />,
      content: 'Second - content'
    },
    {
      status: 'process',
      title: 'Pay',
      icon: <LoadingOutlined />,
      content: 'Third - content'
    },
    {
      status: 'wait',
      title: 'Done',
      icon: <SmileOutlined />,
      content: 'Fourth - content'
    }
  ],
  showPreviousNext: true,
  currentStep: 0
};

export default Wizard;

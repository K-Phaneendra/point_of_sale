import { Button } from '@material-ui/core';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const CustomModal = ({
  title,
  visible,
  handleOk,
  handleCancel,
  primaryButtonName,
  ...rest
}) => {
  const { children } = rest;
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button color="secondary" variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>,
        <>&nbsp;</>,
        <Button color="primary" variant="contained" onClick={handleOk}>
          {primaryButtonName}
        </Button>
      ]}
    >
      {children}
    </Modal>
  );
};

CustomModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  primaryButtonName: PropTypes.string
};

CustomModal.defaultProps = {
  title: 'Basic title',
  visible: false,
  primaryButtonName: 'Submit'
};

export default CustomModal;

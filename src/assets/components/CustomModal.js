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
      maskClosable={false}
      footer={[
        <Button color="secondary" variant="outlined" onClick={handleCancel} key="1" className="mr-2">
          Cancel
        </Button>,
        <Button color="primary" variant="contained" onClick={handleOk} key="2">
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

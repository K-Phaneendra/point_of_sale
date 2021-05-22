import { notification } from 'antd';
import PropTypes from 'prop-types';

/*
  Note:
    type can be any one of these 'info', 'success', 'warning', 'error'
*/
const ToastMessage = (type, title, message, duration) => {
  notification[type]({
    message: title,
    description: <div dangerouslySetInnerHTML={{ __html: message }} />,
    duration
  });
};

ToastMessage.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  duration: PropTypes.number
};

ToastMessage.defaultProps = {
  type: 'info',
  title: 'Info',
  message: 'You need to pass a message to see it.',
  duration: 5000
};

export default ToastMessage;

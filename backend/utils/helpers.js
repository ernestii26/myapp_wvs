// 工具函數

const formatResponse = (success, message, data = null) => {
  return {
    success,
    message,
    data
  };
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

module.exports = {
  formatResponse,
  validateEmail
};

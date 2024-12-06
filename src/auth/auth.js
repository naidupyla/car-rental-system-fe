exports.auth_token = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("auth_token")) {
      return localStorage.getItem("auth_token");
    } else {
      return false;
    }
  } else {
    return false;
  }
};

exports.isAdmin = () => {
  if (typeof window !== "undefined") {
    if (
      localStorage.getItem("user_data") &&
      JSON.parse(localStorage.getItem("user_data")).role === 1
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

exports.isCustomer = () => {
  if (typeof window !== "undefined") {
    if (
      localStorage.getItem("user_data") &&
      JSON.parse(localStorage.getItem("user_data")).role === 0
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/**
 * validateUserForm Function
 *
 * @description Validates the form fields for required inputs like name and UIN.
 * If the fields are not valid, sets the formError state accordingly.
 *
 * @returns {boolean} - Returns `true` if the form is valid, otherwise `false`.
 */
export const validateUserForm = (user, setFormError) => {
  const errors = {
    first_name: false,
    last_name: false,
    uin: false,
    major: false,
    year: false,
    email: false,
    phone: false,
    tshirt_size: false,
    aggie_ring_day: false,
    birthday: false,
    graduation_day: false,
  };

  let isValid = true;

  // Validate first name
  if (user.first_name.trim() === "") {
    errors.first_name = true;
    isValid = false;
  }

  // Validate last name
  if (user.last_name.trim() === "") {
    errors.last_name = true;
    isValid = false;
  }

  // Validate UIN (assuming it should be a number and exactly 9 digits)
  if (!user.uin || isNaN(user.uin) || user.uin.toString().length !== 9) {
    errors.uin = true;
    isValid = false;
  }

  // Validate major (required field)
  if (user.major.trim() === "") {
    errors.major = true;
    isValid = false;
  }

  // Validate year (required and a valid number)
  if (!user.year || isNaN(user.year) || user.year < 1900) {
    errors.year = true;
    isValid = false;
  }

  // Validate email (basic email format check)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(user.email)) {
    errors.email = true;
    isValid = false;
  }

  // Validate phone (basic length check, assuming 10 digits for US numbers)
  if (!user.phone || user.phone.length !== 10) {
    errors.phone = true;
    isValid = false;
  }

  // Validate t-shirt size (required field)
  if (user.tshirt_size.trim() === "") {
    errors.tshirt_size = true;
    isValid = false;
  }

  // Validate aggie ring day (optional, but if provided, should be a valid date)
  if (user.aggie_ring_day && isNaN(Date.parse(user.aggie_ring_day))) {
    errors.aggie_ring_day = true;
    isValid = false;
  }

  // Validate birthday (required and must be a valid date)
  if (!user.birthday || isNaN(Date.parse(user.birthday))) {
    errors.birthday = true;
    isValid = false;
  }

  // Validate graduation day (required and must be a valid date)
  if (!user.graduation_day || isNaN(Date.parse(user.graduation_day))) {
    errors.graduation_day = true;
    isValid = false;
  }

  // Update the form error state
  setFormError(errors);

  return isValid;
};

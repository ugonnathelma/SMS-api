export const isValidFormInput = input => {
  const isNotEmpty =
    input.trim() !== "" && input.trim() !== undefined && input.trim() !== null;

  const isAlphabetic = /^[a-zA-Z]+$/.test(input.trim());

  return isNotEmpty && isAlphabetic;
};

export const isValidPhoneNumber = number => {
  const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return regex.test(number.trim());
};

export const sendErrorMessageAndStatus = res => {
  res.status(500).json({ error: err.message });
};

export const sendDoesntExistMessageAndStatus = (res, nonExistentData) => {
  res.status(404).json({ message: `${nonExistentData} doesn't exist` });
};

export const sendDeletedMessageAndStatus = (res, deletedData) => {
  res.status(200).json({ message: `${nonExistentData} has been deleted` });
};

export const sendInvalidInputMessageAndStatus = (res, invalidData) => {
  res.status(422).json({ message: `Invalid ${invalidData}` });
};

export const sendAlreadyExistsMessageAndStatus = (res, existingData) => {
  res.status(409).json({ message: `${existingData} already exists` });
};

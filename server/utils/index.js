export const isValidFormInput = input => {
  let isNotEmpty = false;
  let isAlphabetic = false;
  if (input) {
    isNotEmpty =
      input.trim() !== "" &&
      input.trim() !== undefined &&
      input.trim() !== null;

    isAlphabetic = /^[a-zA-Z]+$/.test(input.trim());
  }

  return isNotEmpty && isAlphabetic;
};

export const isValidPhoneNumber = number => {
  let isValid = false;
  const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

  if (number) isValid = regex.test(number.trim());
  return isValid;
};

export const sendErrorMessageAndStatus = (res, err) => {
  res.status(500).json({ error: err.message });
};

export const sendDoesntExistMessageAndStatus = (res, nonExistentData) => {
  res.status(404).json({ message: `${nonExistentData} doesn't exist` });
};

export const sendDeletedMessageAndStatus = (res, deletedData) => {
  res.status(200).json({ message: `${deletedData} has been deleted` });
};

export const sendInvalidInputMessageAndStatus = (res, invalidData) => {
  res.status(422).json({ message: `Invalid ${invalidData}` });
};

export const sendAlreadyExistsMessageAndStatus = (res, existingData) => {
  res.status(409).json({ message: `${existingData} already exists` });
};

export const getErrorMessageAndStatus = (res, err) => {
  res.status(500).json({ error: err.message });
};

export const sendFailedGetMessageMessageAndStatus = (res, messageId) => {
  res.status(404).json({ error: `Message with Id: ${messageId} doesn't exist` });
};
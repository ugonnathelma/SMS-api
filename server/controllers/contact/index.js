import { Contact } from "../../models";
import {
  isValidFormInput,
  isValidPhoneNumber,
  sendErrorMessageAndStatus,
  sendDoesntExistMessageAndStatus,
  sendDeletedMessageAndStatus,
  sendInvalidInputMessageAndStatus,
  sendAlreadyExistsMessageAndStatus,
} from "../../utils";

export const addContact = (
  { body: { phoneNumber, firstName, lastName } },
  res
) => {
  if (
    isValidFormInput(firstName) &&
    isValidFormInput(lastName) &&
    isValidPhoneNumber(phoneNumber)
  ) {
    const contactData = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phoneNumber.trim()
    };
    // check if contact exists already
    Contact.find({
      where: {
        phone: contactData.phone
      }
    })
      .then(contact => {
        contact
          ? sendAlreadyExistsMessageAndStatus(res, "Contact")
          : Contact.create(contactData)
              .then(contact => {
                res.status(201).json(contact);
              })
              .catch(err => {
                sendErrorMessageAndStatus(res, err);
              });
      })
      .catch(err => {
        sendErrorMessageAndStatus(res, err);
      });
  } else {
    sendInvalidInputMessageAndStatus(res, "input");
  }
};

export const deleteContact = ({ body: { phoneNumber } }, res) => {
  if (isValidPhoneNumber(phoneNumber)) {
    Contact.find({
      where: {
        phone: phoneNumber.trim()
      }
    })
      .then(contact => {
        contact
          ? Contact.destroy({
              where: {
                phone: contact.phone
              }
            })
              .then(() => {
                sendDeletedMessageAndStatus(res, "Contact");
              })
              .catch((err) => {
                sendErrorMessageAndStatus(res, err);
              })
          : sendDoesntExistMessageAndStatus(res, "Contact");
      })
      .catch((err) => {
        sendErrorMessageAndStatus(res, err);
      });
  } else {
    sendInvalidInputMessageAndStatus(res, "Phone Number");
  }
};

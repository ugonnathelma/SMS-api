import { Message, Contact } from "../../models";
import {
  isValidFormInput,
  isValidPhoneNumber,
  sendErrorMessageAndStatus,
  sendDoesntExistMessageAndStatus,
  sendDeletedMessageAndStatus,
  sendInvalidInputMessageAndStatus,
  getErrorMessageAndStatus,
  sendFailedGetMessageMessageAndStatus
} from "../../utils";

export const addMessage = (
  { body: { message }, params: { receiverNumber, senderNumber } },
  res
) => {
  if (
    isValidFormInput(message) &&
    isValidPhoneNumber(senderNumber) &&
    isValidPhoneNumber(receiverNumber)
  ) {
    const messageData = {
      message: message.trim(),
      receiver: receiverNumber.trim(),
      sender: senderNumber.trim(),
      status: "sent"
    };
    Message.create(messageData)
      .then(message => {
        res.status(201).json(message);
      })
      .catch(err => {
        sendErrorMessageAndStatus(res, {
          message:
            "An error occured. Check that receiver or sender number exists"
        });
      });
  } else {
    sendInvalidInputMessageAndStatus(res, "input");
  }
};

export const deleteMessage = ({ params: { id } }, res) => {
  if (id && !isNaN(id.trim())) {
    Message.find({
      where: {
        id: id.trim()
      }
    })
      .then(message => {
        message
          ? Message.destroy({
              where: {
                id: message.id
              }
            })
              .then(() => {
                sendDeletedMessageAndStatus(res, "Message");
              })
              .catch(err => {
                sendErrorMessageAndStatus(res, err);
              })
          : sendDoesntExistMessageAndStatus(res, "Message");
      })
      .catch(err => {
        sendErrorMessageAndStatus(res, err);
      });
  } else {
    sendInvalidInputMessageAndStatus(res, "Message Id");
  }
};

export const getMessage = ({ params: { id } }, res) => {
  if (id && !isNaN(id.trim())) {
    Message.find({
      where: {
        id: id.trim()
      }
    })
      .then(message => {
        message
          ? res.status(200).json(message)
          : sendFailedGetMessageMessageAndStatus(res, id);
      })
      .catch(err => {
        getErrorMessageAndStatus(res, err);
      });
  } else {
    sendInvalidInputMessageAndStatus(res, "input");
  }
};

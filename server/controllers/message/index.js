import { Message, Contact } from "../../models";
import {
  isValidFormInput,
  isValidPhoneNumber,
  sendErrorMessageAndStatus,
  sendDoesntExistMessageAndStatus,
  sendDeletedMessageAndStatus,
  sendInvalidInputMessageAndStatus
} from "../../utils";

export const addMessage = (
  { body: { receiverNumber, message, senderNumber } },
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

export const deleteMessage = ({ body: { messageId } }, res) => {
  if (messageId && !isNaN(messageId.trim())) {
    Message.find({
      where: {
        id: messageId.trim()
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

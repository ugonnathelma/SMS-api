import { Message, Contact } from "../../models";
import {
  isValidFormInput,
  isValidPhoneNumber,
  sendErrorMessageAndStatus,
  sendDoesntExistMessageAndStatus,
  sendDeletedMessageAndStatus,
  sendInvalidInputMessageAndStatus,
  sendAlreadyExistsMessageAndStatus
} from "../../utils";

export const addMessage = (
  { body: { receiverNumber, message }, headers: { sendernumber } },
  res
) => {
  if (
    isValidFormInput(message) &&
    isValidPhoneNumber(sendernumber) &&
    isValidPhoneNumber(receiverNumber)
  ) {
    const messageData = {
      message: message.trim(),
      receiver: receiverNumber.trim(),
      sender: sendernumber.trim(),
      status: "sent"
    };
    console.log(messageData);
    Message.create(messageData)
      .then(message => {
        res.status(201).json(message);
      })
      .catch(err => {
        sendErrorMessageAndStatus(res, err);
      });
  } else {
    sendInvalidInputMessageAndStatus(res, "input");
  }
};

export const deleteMessage = ({ body: { messageId } }, res) => {
  if (!isNaN(messageId.trim())) {
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
              .catch((err) => {
                sendErrorMessageAndStatus(res, err);
              })
          : sendDoesntExistMessageAndStatus(res, "Message");
      })
      .catch((err) => {
        sendErrorMessageAndStatus(res, err);
      });
  } else {
    sendInvalidInputMessageAndStatus(res, "Message Id");
  }
};

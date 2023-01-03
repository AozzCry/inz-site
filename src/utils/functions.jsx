import fetch from "../hooks/fetchHooks";

export function daysSince(date) {
  return (new Date().getTime() - date.getTime()) / (1000 * 3600 * 24);
}

export function banUserById(userId, refetch = null, notify = null) {
  fetch.patch("user/ban/" + userId).then(({ error, message }) => {
    if (!error) {
      notify && notify(message);
      refetch && refetch();
    }
  });
}

export function deleteDocument(action, _id, refetch = null, notify = null) {
  fetch.delete(action + "/" + _id).then(({ error, message }) => {
    if (!error) {
      notify && notify(message);
      refetch && refetch();
    }
  });
}

export function reactionSubmit(
  action,
  _id,
  refetch = null,
  notify = null,
  secondId = null
) {
  fetch.patch(action, { _id, secondId }).then(({ error, message }) => {
    if (!error) {
      notify && notify(message);
      refetch && refetch();
    }
  });
}

export function updateOrderStatus(
  orderId,
  status,
  refetch,
  notify,
  successMessage
) {
  fetch.patch("order/status", { orderId, status }).then(({ error }) => {
    if (!error) {
      refetch();
      notify(successMessage);
    }
  });
}

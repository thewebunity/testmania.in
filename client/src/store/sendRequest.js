import { notificationActions } from "./notification-slice";

const sendRequest = async ({
  getState,
  dispatch,
  url,
  method,
  body,
  functionName,
}) => {
  const { auth } = getState();



  try {
    const response =
      method === `GET`
        ? await fetch(`${url}`, {
            method: method,
            headers: {
              Authorization: `Bearer ${auth.currentUser?.idToken}`,
            },
          })
        : await fetch(`${url}`, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.currentUser?.idToken}`,
              "Access-Control-Allow-Origin": "*",
            },
            body: body,
          });

    const data = await response.json();

    if (!response.ok) {
      dispatch(
        notificationActions.showNotification({
          color: `error`,
          message: `${data.message}`,
        })
      );
      throw new Error(`${data.message}`);
    }

   
    dispatch(
      notificationActions.showNotification({
        color: `success`,
        message: `Success ${method} ${functionName}`,
      })
    );
    return data;
  } catch (error) {
    dispatch(
      notificationActions.showNotification({
        color: `error`,
        message: `${error.message}`,
      })
    );
    throw new Error(`Error in ${method} ${functionName}`);
  }
};

export default sendRequest;

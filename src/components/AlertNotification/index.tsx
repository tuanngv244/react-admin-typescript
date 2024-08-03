import React, { useEffect, useState } from "react";
import { MainStyled, AlertStyled } from "./styled";

export interface IAlert {
  type: "error" | "warning" | "info" | "success";
  content: string;
}

const refAlerts = React.createRef<IAlert[]>();
const refDispatch = React.createRef();
let refAlertsCurrent = refAlerts.current as IAlert[];
let refDispatchCurrent = refDispatch.current as React.Dispatch<
  React.SetStateAction<IAlert[]>
>;
refAlertsCurrent = [];

const AlertNotification = () => {
  const [alerts, setAlerts] = useState<IAlert[]>(refAlertsCurrent || []);

  useEffect(() => {
    refDispatchCurrent = setAlerts;
  }, []);

  if (!!!alerts.length) return null;

  return (
    <MainStyled>
      {alerts?.map((alert, index) => {
        return (
          <AlertStyled
            severity={alert.type}
            key={index}
            onClose={() => setAlerts(alerts.filter((_, idx) => idx !== index))}
          >
            {alert.content}
          </AlertStyled>
        );
      })}
    </MainStyled>
  );
};

AlertNotification.useAlertNotification = ({
  autoCloseTime = 2000,
}: { autoCloseTime?: number } | undefined = {}) => {
  const [cancelInteral, setCancelInterval] = useState(false);
  const [onAlertActions] = useState({
    setAlert: (data: IAlert) => {
      if (refAlertsCurrent?.length === 5) onAlertActions.close();
      refDispatchCurrent?.([...(refAlertsCurrent || []), data]);
      refAlertsCurrent?.push(data);
      setCancelInterval(false);
    },
    warning: (content: string) =>
      onAlertActions.setAlert({ type: "warning", content }),
    info: (content: string) =>
      onAlertActions.setAlert({ type: "info", content }),
    success: (content: string) =>
      onAlertActions.setAlert({ type: "success", content }),
    error: (content: string) =>
      onAlertActions.setAlert({ type: "error", content }),
    close: () => {
      const alerts = [...refAlertsCurrent];
      alerts?.shift();
      refDispatchCurrent?.(alerts);
      refAlertsCurrent = alerts;
    },
  });

  useEffect(() => {
    if (!autoCloseTime || cancelInteral) return;
    const timer = setInterval(() => {
      onAlertActions.close();
      if (!!!refAlertsCurrent?.length) setCancelInterval(true);
    }, autoCloseTime);

    return () => clearTimeout(timer);
  }, [autoCloseTime, cancelInteral]);

  return [onAlertActions];
};

export default AlertNotification;

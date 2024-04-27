import { IoMdAlert } from "react-icons/io";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type IAlertError = {
  title: string;
  children: React.ReactNode;
};

export const AlertError: React.FC<IAlertError> = ({ title, children }) => {
  return (
    <Alert variant="destructive">
      <IoMdAlert className="h-6 w-6" />
      <AlertTitle className="text-sm font-semibold"> {title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

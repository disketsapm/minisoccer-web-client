import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AlertCircle, HelpCircle } from "lucide-react";
import { Button } from "./button";

type IConfirmationDialog = {
  content: React.ReactNode;
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  submitTitle?: string;
  title?: string;
};

const ConfirmationDialog: React.FC<IConfirmationDialog> = ({
  content,
  isOpen,
  onChange,
  onSubmit,
  isLoading,
  submitTitle,
  title,
}) => {
  return (
    <Dialog open={isOpen || isLoading} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base">
            <div className="flex gap-2 items-center">
              <HelpCircle className="text-blue-500" />

              <p className="text-base">{title}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-full rounded-sm border border-gray-100">
          {content}
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onChange(false)}>
            Tutup
          </Button>

          <Button variant="accent-1" onClick={onSubmit} isLoading={isLoading}>
            {submitTitle ? submitTitle : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;

import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AlertCircle } from "lucide-react";
import { Button } from "./button";

type IErrorDialog = {
  content: React.ReactNode;
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
};

const ErrorDialog: React.FC<IErrorDialog> = ({ content, isOpen, onChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base">
            <div className="flex gap-2 items-center">
              <AlertCircle className="text-red-500" />

              <p className="text-base">Terjadi Kesalahan!</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-full rounded-sm border border-gray-100">
          <div className="flex  flex-col  w-full h-full p-4 gap-2">
            <div className="text-red-400 font-semibold text-sm">{content}</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onChange(false)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;

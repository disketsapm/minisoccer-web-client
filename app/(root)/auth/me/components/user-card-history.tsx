import { Card } from "@/components/ui/card";
import React from "react";

type IItemCardHistory = {
  label: string;
  value: string;
};

const UserCardHistory = () => {
  const ItemCardHistory: React.FC<IItemCardHistory> = ({ label, value }) => {
    return (
      <div className="w-full flex justify-between">
        <p>{label}</p>
        <p className="font-semibold italic">{value}</p>
      </div>
    );
  };

  return (
    <Card className=" p-2">
      <ItemCardHistory label="Kode Booking" value="012AD1240ZXZV3030V" />
      <ItemCardHistory label="Tanggal Booking" value="30/01/2024 | 20:45 WIB" />
      <ItemCardHistory
        label="Tanggal dan Jam Main"
        value="30/01/2024 | 20:45 WIB"
      />
      <ItemCardHistory label="Tipe" value="GAME" />
      <ItemCardHistory label="Total Biaya" value="Rp500.000" />
    </Card>
  );
};

export default UserCardHistory;

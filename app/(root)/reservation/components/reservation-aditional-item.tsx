import React, { useCallback, useEffect, useState } from "react";
import useGetFieldById from "../hooks/useGetFieldById";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type IReservationAdditionalItem = {
  onChange: (value: any) => void;
  value: any;
};

const ReservationAditionalItem: React.FC<IReservationAdditionalItem> = ({
  value,
  onChange,
}) => {
  const { getValues, watch } = useFormContext();

  const fieldId = getValues("field_id");

  const schedule_id = watch("schedule_id");

  const { data, isLoading } = useGetFieldById({
    key: ["aditional-item", fieldId],
    enabled: !!fieldId,
  });

  const isAdditionalItem = (data?.data?.additional_item?.length ?? 0) > 0;

  const [itemQuantities, setItemQuantities] = useState<{
    [itemId: string]: number;
  }>({});

  const convertObjectToArray = (quantities: { [itemId: string]: number }) => {
    return Object.entries(quantities).map(([itemId, quantity]) => ({
      id: itemId,
      quantity: quantity,
    }));
  };

  const handleDecrement = (itemId: string) => {
    setItemQuantities((prevQuantities) => {
      return {
        ...prevQuantities,
        [itemId]: Math.max((prevQuantities[itemId] || 0) - 1, 0),
      };
    });
  };

  const handleIncrement = (itemId: string) => {
    setItemQuantities((prevQuantities) => {
      return {
        ...prevQuantities,
        [itemId]: (prevQuantities[itemId] || 0) + 1,
      };
    });
  };

  const isAdditionalItemButtonDisabled = useCallback(() => {
    const sessionSelected = schedule_id?.length;
    return sessionSelected === 0;
  }, [schedule_id]);

  const isDecrementDisabled = useCallback(
    (itemId: string) => {
      const quantity = itemQuantities[itemId];
      return (
        quantity === undefined ||
        quantity <= 0 ||
        isAdditionalItemButtonDisabled()
      );
    },
    [itemQuantities, isAdditionalItemButtonDisabled]
  );

  const isIncrementDisabled = useCallback(
    (itemId: string) => {
      const sessionSelected = schedule_id?.length || 0;
      return (
        itemQuantities[itemId] >= sessionSelected ||
        isAdditionalItemButtonDisabled()
      );
    },
    [itemQuantities, schedule_id, isAdditionalItemButtonDisabled]
  );

  const renderLabel = useCallback(
    (itemId: string) => {
      if (
        schedule_id?.length === itemQuantities[itemId] &&
        schedule_id?.length !== 0
      )
        return <p className="font-semibold text-sm">Semua Sesi</p>;

      return (
        <p className="font-semibold text-sm">
          {itemQuantities[itemId] || 0} /Sesi
          {schedule_id?.length}
        </p>
      );
    },
    [itemQuantities, schedule_id]
  );

  useEffect(() => {
    onChange(convertObjectToArray(itemQuantities));
  }, [itemQuantities, schedule_id]);

  return (
    <div className="w-full h-full flex gap-2">
      {isLoading && !isAdditionalItem && (
        <Skeleton className="w-full h-[250px]" />
      )}
      {!isLoading &&
        isAdditionalItem &&
        data?.data?.additional_item?.map((item) => {
          return (
            <Card>
              <CardContent className="p-2 flex-col gap-2 flex">
                <img
                  className="w-full h-[240px] rounded-lg object-contain"
                  src={item?.url}
                />
                <p className="w-full text-center font-semibold">
                  {item?.name || ""}
                </p>
              </CardContent>

              <CardFooter>
                <div className="w-full justify-between flex gap-2 items-center">
                  <Button
                    className="rounded-full bg-[#45825A] text-center flex justify-center items-center"
                    disabled={isDecrementDisabled(item?._id)}
                    onClick={() => handleDecrement(item?._id)}
                  >
                    -
                  </Button>
                  {renderLabel(item?._id)}
                  <Button
                    className="rounded-full bg-[#45825A] text-center flex justify-center items-center"
                    disabled={isIncrementDisabled(item?._id)}
                    onClick={() => handleIncrement(item?._id)}
                  >
                    +
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
};

export default ReservationAditionalItem;

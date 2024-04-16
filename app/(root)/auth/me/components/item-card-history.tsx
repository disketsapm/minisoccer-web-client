import { cn } from "@/lib/utils";

type IItemCardHistory = {
  label: string;
  value: string;
  size?: string;
};

const ItemCardHistory: React.FC<IItemCardHistory> = ({
  label,
  value,
  size,
}) => {
  return (
    <div className="w-full flex justify-between">
      <p
        className={cn("text-gray-600 text-sm", {
          "text-base": size === "large",
        })}
      >
        {label}
      </p>
      <p
        className={cn("font-semibold italic text-sm", {
          "text-base": size === "large",
        })}
      >
        {value}
      </p>
    </div>
  );
};

export default ItemCardHistory;

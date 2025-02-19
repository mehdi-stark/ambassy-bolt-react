import React from "react";
import classNames from "classnames";

interface PlatformItemProps {
  logo: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const PlatformItem: React.FC<PlatformItemProps> = ({
  logo,
  name,
  checked,
  onChange,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-row w-full border border-2 border-red-300 p-3 rounded-xl justify-between",
        {
          "bg-purple-100": checked,
          //   "border-gradient-primary bg-purple-100": checked,
          //   "border-gray-300": !checked,
        }
      )}
    >
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt={`${name} logo`}
          className="platform-logo h-8 rounded-xl p-1"
        />
        <span className="platform-name">{name}</span>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="platform-checkbox flex justify-end"
      />
    </div>
  );
};

export default PlatformItem;

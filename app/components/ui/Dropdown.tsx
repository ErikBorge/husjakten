"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode, useState } from "react";

const Dropdown = ({
  items = [],
  label = "Open",
  openLabel,
}: {
  items: { label: string; onClick: () => void }[];
  label?: string | ReactNode;
  openLabel?: string | ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggle = () => setIsOpen(!isOpen);
  if (items.length === 0) return null;
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="w-10 h-10 p-2 grid place-content-center"
        onClick={handleToggle}
      >
        {!isOpen ? label : isOpen && openLabel ? openLabel : label}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map(({ label, onClick }, i) => (
          <DropdownMenuItem key={label + i} onClick={onClick}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;

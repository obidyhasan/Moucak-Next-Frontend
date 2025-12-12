"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface OrderFiltersProps {
  setStatusFilter: (status: string | undefined) => void;
}

export default function OrderFilters({ setStatusFilter }: OrderFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedStatus = searchParams.get("status") || "";

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", value);
    router.replace(`?${params.toString()}`); // updates the URL
    setStatusFilter(value); // update parent state
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    router.replace(`?${params.toString()}`);
    setStatusFilter(undefined); // clear parent filter state
  };

  return (
    <div className="flex items-center gap-1">
      <Select onValueChange={handleStatusChange} value={selectedStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirm">Confirm</SelectItem>
            <SelectItem value="Picked">Picked</SelectItem>
            <SelectItem value="InTransit">In Transit</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button size="icon" variant="outline" onClick={handleClearFilter}>
        <X />
      </Button>
    </div>
  );
}

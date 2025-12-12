/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { SearchIcon } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import StatusUpdateAlertDialog from "./StatusUpdateAlertDialog";

import { getAllUsers, updateUser } from "@/services/user/user";

export function AllUsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);
  const [searchTitle, setSearchTitle] = useState("");

  const [users, setUsers] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchUsers() {
      setLoading(true);

      const res = await getAllUsers({
        searchTerm: searchTitle,
        page: currentPage,
        limit,
      });

      if (!ignore && res?.success) {
        setUsers(res.data);
        setTotalPage(res.meta?.totalPage || 1);
      }

      if (!ignore) setLoading(false);
    }

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, [currentPage, searchTitle, limit]);

  const handleStatusUpdate = async (value: string, id: string) => {
    const toastId = toast.loading("Updating role...");

    const res = await updateUser({
      id,
      data: { role: value },
    });

    if (res?.success) {
      toast.success("Role updated successfully", { id: toastId });

      setCurrentPage(1);
      setSearchTitle("");
    } else {
      toast.error(res?.message || "Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 my-2 pb-5">
        <h1 className="text-lg font-bold mb-4">Users</h1>

        <div className="flex gap-2 items-center flex-wrap w-full justify-end">
          <div className="*:not-first:mt-2 max-w-sm w-full">
            <div className="relative w-full">
              <Input
                onChange={(e) => setSearchTitle(e.target.value)}
                className="peer ps-9 max-w-2xl"
                placeholder="Search by name, email, role, phone, address"
                type="search"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                <SearchIcon size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user: any) => (
              <TableRow key={user?._id}>
                <TableCell className="font-medium">
                  {user?.name || "N/A"}
                </TableCell>

                <TableCell>{user?.email}</TableCell>

                <TableCell>
                  <Select
                    value={user?.role}
                    onValueChange={(value) => {
                      setSelectedValue(value);
                      setSelectedId(user?._id || null);
                      setOpenDialog(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="USER">USER</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>{user?.phone || "N/A"}</TableCell>

                <TableCell>
                  {user?.address || "N/A"} - {user?.division || "N/A"}
                </TableCell>

                <TableCell className="text-right">
                  {format(new Date(user?.createdAt), "MMMM dd, yyyy")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="flex justify-end my-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPage }, (_, idx) => idx + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={
                  currentPage === totalPage
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* ROLE CONFIRMATION DIALOG */}
      <StatusUpdateAlertDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedValue={selectedValue}
        selectedId={selectedId}
        onConfirm={handleStatusUpdate}
        title="Confirm Status Update"
      />
    </>
  );
}

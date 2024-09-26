import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { GetUsersOptions } from "../Queries/Authentication/GetUsersOptions";
import {
  CustomCard,
  CustomCardHeader,
  CustomCardTitle,
} from "./ReusableComponents/CustomCard";
import HeadingElement from "./ReusableComponents/HeadingElement";
import SearchItemBar from "./ReusableComponents/SearchItemBar";
import { FaEdit, FaRegUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import {
  CustomDialog,
  CustomDialogBody,
  CustomDialogFooter,
} from "./ReusableComponents/CustomDialog";
import { CustomButton } from "./ReusableComponents/CutomButton";
import { useState } from "react";
import React from "react";
import UserForm from "./UserForm";
import { TUsers } from "../Types/AuthenticationTypes";
import { useToggleModal } from "../Hooks";

function SelectUser() {
  const { name } = useSearch({ from: "/admin/users/" });
  const { data: users } = useSuspenseQuery(GetUsersOptions(name));
  const [index, setIndex] = useState(0);
  const { toggleDialog, dialogRef } = useToggleModal();

  return (
    <div className="space-y-6">
      <HeadingElement>Select a user</HeadingElement>
      <SearchItemBar urlReference="/admin/users" />
      <section className="flex flex-col gap-4">
        {users.data.map((user, index) => (
          <React.Fragment key={user.id}>
            <CustomCard
              size="variable"
              className="flex cursor-pointer"
              onClick={() => {
                toggleDialog();
                setIndex(index);
              }}
            >
              <IconContext.Provider
                value={{ className: "text-rose-gold-400 p-2", size: "80" }}
              >
                <FaRegUserCircle />
              </IconContext.Provider>
              <CustomCardHeader>
                <CustomCardTitle className="text-gold-500">
                  {user.userName}
                </CustomCardTitle>
                <p>{user.role}</p>
              </CustomCardHeader>
            </CustomCard>
          </React.Fragment>
        ))}
        <Modal
          user={users.data[index]}
          toggleDialog={toggleDialog}
          dialogRef={dialogRef}
        />
      </section>
    </div>
  );
}

function Modal({
  user,
  toggleDialog,
  dialogRef,
}: {
  user: TUsers;
  toggleDialog: () => void;
  dialogRef: React.RefObject<HTMLDialogElement>;
}) {
  return (
    <CustomDialog
      ref={dialogRef}
      className="w-[25rem]"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleDialog();
        }
      }}
    >
      <CustomDialogBody className="flex flex-col gap-4">
        <HeadingElement heading={"h4"} className="text-center">
          Edit user {user.userName}
        </HeadingElement>
        <div className="flex items-center gap-8">
          <IconContext.Provider
            value={{ className: "text-secondary-blue-400", size: "200" }}
          >
            <FaEdit />
          </IconContext.Provider>
          <UserForm userId={user.id} toggleDialog={toggleDialog} />
        </div>
      </CustomDialogBody>
      <CustomDialogFooter>
        <CustomButton size={"small"} onClick={toggleDialog} className="ml-auto">
          Cancel
        </CustomButton>
      </CustomDialogFooter>
    </CustomDialog>
  );
}

export default SelectUser;

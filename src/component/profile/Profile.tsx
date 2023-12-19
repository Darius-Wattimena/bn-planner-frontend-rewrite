import React from "react";
import PageHeader from "../generic/PageHeader";
import {IoPerson} from "react-icons/io5";
import {UserContext} from "../../models/Types";
import ProfileStatistics from "./profileStatistics/ProfileStatistics";

interface ProfileProps {
  userContext: UserContext
}

export default function Profile(props: ProfileProps) {
  return (
    <>
      <PageHeader title={"Profile"} icon={<IoPerson />} />
      <div className={`page-container profile-page`}>
        <ProfileStatistics userContext={props.userContext} />
      </div>
    </>
  )
}
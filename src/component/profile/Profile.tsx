import React from "react";
import PageHeader from "../generic/PageHeader";
import {FaUser} from "react-icons/fa6";
import {UserContext} from "../../models/Types";
import ProfileStatistics from "./profileStatistics/ProfileStatistics";

interface ProfileProps {
  userContext: UserContext
}

export default function Profile(props: ProfileProps) {
  return (
    <>
      <PageHeader title={"Profile"} icon={<FaUser />} />
      <div className={`page-container profile-page`}>
        <ProfileStatistics userContext={props.userContext} />
      </div>
    </>
  )
}
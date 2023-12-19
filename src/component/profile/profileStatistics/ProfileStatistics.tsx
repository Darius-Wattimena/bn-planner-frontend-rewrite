import React from "react";
import {UserContext} from "../../../models/Types";
import ProfileStatisticsPairCard from "./ProfileStatisticsPairCard";
import "./ProfileStatistics.scss"

interface ProfileStatisticsProps {
  userContext: UserContext
}

export default function ProfileStatistics(props: ProfileStatisticsProps) {
  return (
    <div className={"profile-statistics"}>
      <ProfileStatisticsPairCard userContext={props.userContext} />
      <div className={"profile-statistics-card"}>

      </div>
      <div className={"profile-statistics-card"}>

      </div>
    </div>
  )
}
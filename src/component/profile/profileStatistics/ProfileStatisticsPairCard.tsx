import React from "react";
import {ProfileStatisticsPairInfo, UserContext} from "../../../models/Types";
import useAxios from "axios-hooks";
import Api from "../../../resources/Api";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import CustomTooltip from "../../generic/CustomTooltip";

interface ProfileStatisticsPairCardProps {
  userContext: UserContext
}

export default function ProfileStatisticsPairCard(props: ProfileStatisticsPairCardProps) {
  const [{data, loading}] = useAxios<ProfileStatisticsPairInfo[]>(Api.fetchProfilePairings(props.userContext.user.osuId))

  return (
    <div className={"profile-statistics-card"}>
      <h3 className={"profile-statistics-card-title"}>Nomination Pairings</h3>

      { loading
        ? <div className={"profile-statistics-card-chart"}>Loading</div>
        : <div className={"profile-statistics-card-chart"}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="name"/>
                <YAxis allowDecimals={false}/>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="pairingPending" name={"Pending"} stackId="a" fill="#538ea5" />
                <Bar dataKey="pairingRanked" name={"Ranked"} stackId="a" fill="#5aa500" />
                <Bar dataKey="pairingGraved" name={"Graved"} stackId="a" fill="#a5a5a5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
      }
    </div>
  )
}
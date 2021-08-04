import React from "react";

interface BeatmapTableNominatorProps {
  osuId: number
}

function BeatmapTableNominator({ osuId }: BeatmapTableNominatorProps) {
  return (
    <td>
      <p>
        {osuId}
      </p>
    </td>
  )
}

export default BeatmapTableNominator
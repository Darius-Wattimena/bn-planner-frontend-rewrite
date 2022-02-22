import React from "react";

interface BeatmapTableNominatorProps {
  osuId: string
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
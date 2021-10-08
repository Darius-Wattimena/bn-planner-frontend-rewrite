import React, {useEffect, useState} from "react";
import {BeatmapFilter, NominatorSelectFilterItem, User} from "../../../models/Types";
import {instantFilter} from "../../../utils/FilterUtils";
import * as _ from 'lodash'
import Collapsible from "react-collapsible";
import {getRole} from "../../../utils/UserUtils";

interface BeatmapNominatorFilterProps {
  nominators: User[]
  beatmapFilter: BeatmapFilter
  setBeatmapFormFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  timeout: number
  setQueryFilter: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function BeatmapNominatorFilter({ nominators, beatmapFilter, setBeatmapFormFilter, timeout, setQueryFilter }: BeatmapNominatorFilterProps) {
  const [selectedNominators, setSelectedNominators] = useState<number[]>([])
  const [filterItems, setFilterItems] = useState<NominatorSelectFilterItem[]>([])

  useEffect(() => {
    const preparedNominators = nominators.map((nominator, index) => {
      const selectedNominator = selectedNominators.find(item => item === nominator.osuId)
      const item: NominatorSelectFilterItem = {
        index: index,
        label: nominator.osuName,
        value: nominator.osuId,
        role: nominator.role,
        selected: selectedNominator != null || selectedNominator !== undefined
      };

      return item
    })

    setFilterItems(preparedNominators)
  }, [nominators, selectedNominators])

  function removeNumber(value: number, numbers: number[]){
    numbers.forEach( (item, index) => {
      if(item === value) numbers.splice(index,1);
    });
  }

  function updateSelectedItems(value: number, checked: boolean) {
    const selectedNominators = beatmapFilter["nominators"]
    const newSelectedNominators: number[] = [];

    selectedNominators.forEach(val => newSelectedNominators.push(val))

    if (checked) {
      newSelectedNominators.push(value)
    } else {
      removeNumber(value, newSelectedNominators)
    }

    setSelectedNominators(newSelectedNominators)

    instantFilter(
      beatmapFilter,
      "nominators",
      newSelectedNominators,
      setBeatmapFormFilter,
      timeout,
      setQueryFilter
    )
  }

  const groupedFilterItems = _.groupBy(filterItems, item => item.role)

  return (
    <div className={"beatmap-filter-nominators"}>
      <Collapsible
        trigger={"Nominator"}
        className={"collapsible-parent-group"}
        openedClassName={"collapsible-parent-group"}
      >
        <div className={"beatmap-filter-nominators-groups"}>
          {Object.keys(groupedFilterItems).map((key, index) => {
            let nominatorRoleClass = getRole(key)?.className

            return (
              <Collapsible
                key={index}
                trigger={key}
                className={`collapsible-child-group`}
                triggerClassName={nominatorRoleClass}
                triggerOpenedClassName={nominatorRoleClass}
                openedClassName={`collapsible-child-group`}>
                <div className={`beatmap-filter-nominators-group`}>
                  { groupedFilterItems[key].map((selectItem, groupIndex) => {

                    return (
                      <div className={`beatmap-filter-user`} key={groupIndex}>
                        <input
                          type="checkbox"
                          id={`${selectItem.index}-nominator`}
                          checked={selectItem.selected}
                          onChange={event => {
                            updateSelectedItems(selectItem.value, event.target.checked)
                          }}
                        />
                        <label htmlFor={`${selectItem.index}-nominator`}>
                          {selectItem.label}
                        </label>
                      </div>
                    )})}
                </div>
              </Collapsible>

            )
          })}
        </div>
      </Collapsible>

    </div>
  )
}

export default BeatmapNominatorFilter
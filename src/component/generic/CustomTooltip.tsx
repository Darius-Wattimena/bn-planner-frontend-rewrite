import {TooltipProps} from "recharts";
import {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({active, payload, label,}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <div className="label">{label}</div>
        {payload?.map(it => {
        return (<div className="value">{it.name}: {it.value}</div>)
      })}


      </div>
    );
  }

  return null;
};

export default CustomTooltip
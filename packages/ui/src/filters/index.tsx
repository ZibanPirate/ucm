import type { FC } from "React";

import { CheckBox } from "../checkbox";
import { NumberInput } from "../number-input";
import { Text } from "../text";

interface BaseFilter {
  label: string;
  name: string;
}

interface OptionsFilter extends BaseFilter {
  type: "options";
  options: Array<{
    name: string;
    checked: boolean;
  }>;
}

interface RangeFilter extends BaseFilter {
  type: "range";
  options: {
    min: number;
    max: number;
  };
}

export type Filter = OptionsFilter | RangeFilter;

export const Filters: FC<{
  filters: Filter[];
  onChange?: (filterName: string, optionName: string, checked: boolean) => void;
}> = ({ onChange = () => null, filters }) => {
  return (
    <div style={{ padding: "0 1rem 1rem" }}>
      {filters.map((filter, index) => (
        <div key={index} style={{ paddingTop: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <Text size="lg" margin="0 0 .5rem">
              {filter.label}
            </Text>
          </div>
          <div>
            {filter.type === "options"
              ? filter.options.map((option, index) => (
                  <CheckBox key={index} label={option.name} checked={option.checked} />
                ))
              : Object.keys(filter.options).map((name, index) => (
                  <NumberInput key={index} value={0} label={name} />
                ))}
          </div>
        </div>
      ))}
    </div>
  );
};

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
  onChange?: (filterName: string, optionName: string, value: number | boolean) => void;
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
            {filter.type === "options" ? (
              filter.options.map((option, index) => (
                <CheckBox
                  key={index}
                  label={option.name}
                  checked={option.checked}
                  onChange={(checked) => onChange(filter.name, option.name, checked)}
                />
              ))
            ) : (
              <>
                <NumberInput
                  value={filter.options.min}
                  label={"Min"}
                  onChange={(value) => onChange(filter.name, "min", value)}
                />
                <NumberInput
                  value={filter.options.max}
                  label={"Max"}
                  onChange={(value) => onChange(filter.name, "max", value)}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

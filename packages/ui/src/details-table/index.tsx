import type { FC } from "react";
import { Fragment } from "react";

import { Text } from "../text";
import { Toolbar } from "../toolbar";

type RowValue = string | number | boolean | null;

export interface DetailsTableRow<T extends string = string> {
  label: string;
  fields: Partial<
    Record<
      T,
      {
        label: string;
        mapper?: (value: RowValue, params: Record<string, RowValue>) => string;
      }
    >
  >;
}

export const DetailsTable: FC<{
  rows: DetailsTableRow[];
  values: Record<string, RowValue>;
  mapperParams?: Record<string, RowValue>;
}> = ({ rows: items, values, mapperParams = {} }) => (
  <div>
    {items.map(({ label, fields }, index) => (
      <div key={index}>
        <Text size="md">{label}</Text>
        {Object.keys(fields).map((key, keyIndex) => {
          const field = fields[key];
          const value = values[key];
          return (
            <Fragment key={keyIndex}>
              <Toolbar itemsAlignment="space-between">
                <Text size="sm">{field?.label}</Text>
                <Text size="sm">{field?.mapper?.(value, mapperParams) || value}</Text>
              </Toolbar>
              <br />
            </Fragment>
          );
        })}
      </div>
    ))}
  </div>
);

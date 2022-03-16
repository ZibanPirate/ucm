import { CarsQuery } from "@ucm/api/dist/car/resolver";
import { Filter } from "@ucm/ui/dist/filters";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

import { urlQueryToRecord } from "../../utils/url-query";

export const carsQueryResultFiltersToHomePageFilters = (
  carsQueryResultFilters: CarsQuery["filters"],
  filtersOnURLQuery: Record<string, string[]>,
): Filter[] => {
  return carsQueryResultFilters.map(({ label, name, type, values }) => {
    switch (type) {
      case "range":
        return {
          label,
          name,
          type,
          options: {
            min: Number(filtersOnURLQuery[name]?.[0] || 0),
            max: Number(filtersOnURLQuery[name]?.[1] || 0),
          },
        };
      case "options":
        return {
          label,
          name,
          type,
          options: values.map((value) => ({
            name: value,
            checked: filtersOnURLQuery[name]?.includes(value),
          })),
        };
    }
  });
};

export const urlQueryToGraphQLQueryFilters = (query: NextParsedUrlQuery): string[] => {
  const filtersOnURLQuery = urlQueryToRecord(query);
  const filters = Object.keys(filtersOnURLQuery).map(
    (filterName) => `${filterName}:${filtersOnURLQuery[filterName].join(",")}`,
  );

  return filters;
};

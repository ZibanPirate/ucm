import { Filter } from "@ucm/ui/dist/filters";

export const extractSelectedFilters = (filters: Filter[]) => {
  const graphQLQueryFilters: string[] = [];
  const newFiltersOnURLQuery: Record<string, string[]> = {};
  filters.forEach((filter) => {
    const checkedFilterOptions =
      filter.type === "options"
        ? filter.options.filter(({ checked }) => checked).map(({ name }) => name)
        : filter.options.min || filter.options.max
        ? [String(filter.options.min), String(filter.options.max)]
        : [];
    if (checkedFilterOptions.length > 0) {
      graphQLQueryFilters.push(`${filter.name}:${checkedFilterOptions.join(",")}`);
      newFiltersOnURLQuery[filter.name] = checkedFilterOptions;
    }
  });
  return {
    graphQLQueryFilters,
    newFiltersOnURLQuery,
  };
};

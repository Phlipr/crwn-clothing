import { createSelector } from "reselect";

const selectDirectory = (state) => {
  console.log(state.directory);
  return state.directory;
};

export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);

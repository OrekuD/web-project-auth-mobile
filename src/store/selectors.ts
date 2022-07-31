import { RootState, useTypedSelector } from ".";

export const useSelectState = () => {
  return useTypedSelector<RootState>((state) => state);
};

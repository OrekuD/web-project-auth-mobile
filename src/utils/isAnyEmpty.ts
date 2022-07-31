const isAnyEmpty = (values: Array<string | Date | null | undefined>) => {
  for (const value of values) {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === "string" && value.trim() === "") {
      return true;
    }
  }

  return false;
};

export default isAnyEmpty;

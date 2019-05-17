export default function castToFloat(valueToCast, idKey) {
  try {
    const value = parseFloat(valueToCast);

    if (Number.isNaN(value)) {
      throw TypeError(
        `Expected a numeric value on datum with id: "${idKey}" but got ${JSON.stringify(
          valueToCast
        )}`
      );
    }

    return value;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);

    return 0;
  }
}

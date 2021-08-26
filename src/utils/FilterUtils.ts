import React from "react";

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

export function setArrayValue<T> (
  values: T,
  key: keyof T,
  value: any,
  setValues: React.Dispatch<React.SetStateAction<T>>
) {
  values[key] = value

  setValues({
    ...values
  })
}

export function debouncingFilter<T> (
  formValues: T,
  group: keyof T,
  value: any,
  setFormValues: React.Dispatch<React.SetStateAction<T>>,
  timeoutValue: number,
  setTimeoutValue: React.Dispatch<React.SetStateAction<number>>,
  setFilter: React.Dispatch<React.SetStateAction<T>>
) {
  formValues[group] = value
  setFormValues({
    ...formValues
  })

  if (timeoutValue) {
    clearTimeout(timeoutValue)
  }

  setTimeoutValue(setTimeout(() => {
    setFilter({
      ...formValues
    })
    clearTimeout(timeoutValue)
  }, 500)[Symbol.toPrimitive])
}

export function instantFilter<T> (
  formValues: T,
  group: keyof T,
  value: any,
  setFormValues: React.Dispatch<React.SetStateAction<T>>,
  timeoutValue: number,
  setFilter: React.Dispatch<React.SetStateAction<T>>
) {
  formValues[group] = value

  if (timeoutValue) {
    clearTimeout(timeoutValue)
  }

  setFormValues({
    ...formValues
  })
  setFilter({
    ...formValues
  })
}
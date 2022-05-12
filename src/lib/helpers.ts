export const shuffle = (arr: any[]) => {
  let i = arr.length
  while (--i > 0) {
    let randIndex = Math.floor(Math.random() * (i + 1))
    ;[arr[randIndex], arr[i]] = [arr[i], arr[randIndex]]
  }
  return arr
}

export const toSubarrays = (arr: any[], numberOfGroups: number) => {
  if (!Array.isArray(arr) || typeof numberOfGroups !== "number") return
  let mainArray: any[] = []
  let groupNumber = 0

  // Create all subarrays
  for (let i = 0; i < numberOfGroups; i++) mainArray.push([])

  // divide array items into subarrays
  arr.forEach((arrItem) => {
    if (groupNumber > numberOfGroups - 1) groupNumber = 0

    mainArray[groupNumber].push(arrItem)
    groupNumber += 1
  })

  // Remove empty arrays
  const cleanedUpArrays = mainArray.filter((arr) => arr.length > 0)

  return cleanedUpArrays
}

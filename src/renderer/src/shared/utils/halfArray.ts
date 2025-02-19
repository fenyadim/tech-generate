import _ from 'lodash'

export const halfArray = <T>(array: T[]) => [
  _.drop(array, array.length / 2),
  _.take(array, array.length / 2)
]

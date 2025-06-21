import { IProcess, ITechCard } from '@/store'
import _ from 'lodash'

export const totalSum = (obj: IProcess, techCards: ITechCard[]) => {
  if (_.isEmpty(obj) || _.isEmpty(techCards)) return 0

  const sumArr = techCards.map(({ id, count }) => {
    return !_.isEmpty(obj[id])
      ? obj[id].reduce((acc, item) => acc + (item.time ? Number(item.time) : 0), 0) * count
      : 0
  })

  return _.sum(sumArr).toFixed(2)
}

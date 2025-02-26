import { IProccess } from '@/store/processStore'
import { ITechCard } from '@/store/techCardStore'
import _ from 'lodash'

export const totalSum = (obj: IProccess, techCards: ITechCard[]) => {
  if (_.isEmpty(obj) || _.isEmpty(techCards)) return 0

  const sumArr = techCards.map(({ id, count }) => {
    return !_.isEmpty(obj[id])
      ? obj[id].reduce((acc, item) => acc + (item.time ? Number(item.time) : 0), 0) * count
      : 0
  })

  return _.sum(sumArr).toFixed(2)
}

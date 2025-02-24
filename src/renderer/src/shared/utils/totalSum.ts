import { IProccess } from '@/store/processStore'

export const totalSum = (obj: IProccess) => {
  return Object.values(obj)
    .reduce((acc, item) => acc + item.reduce((acc, techCard) => acc + Number(techCard.time), 0), 0)
    .toFixed(2)
}

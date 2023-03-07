import Store from '../store'

export default function useStore (modulo) {
  if (modulo) {
    return Store[modulo]
  } else {
    return Store
  }
}

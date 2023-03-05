import Store from '../store'

export default useStore = (modulo) => {
  if(modulo){
    return Store[modulo]
  } else{
    return Store
  }
}

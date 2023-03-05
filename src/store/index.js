import { readonly } from 'vue'
import UserModule from './user'
import GlobalModule from './global'

//com o readonly eu não consigo alterar os valores de estado do usuário por meio de, por exemplo, User.currentUser,
//eu só consigo alterar os estados do usuário por meio dos seus métodos
export default readonly({
  User: UserModule,
  Global: GlobalModule
})

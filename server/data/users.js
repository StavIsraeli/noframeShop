import bcrypt from 'bcryptjs'

const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true
    },
    {
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'Ervin Howell',
        email: 'Shanna@melissa.tv',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'Clementine Bauch',
        email: 'Nathan@yesenia.net',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
  ]
  
  export default users
  
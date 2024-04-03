const bcrypt = require('bcrypt');

async function run(){
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash('1234', salt)
  console.log(salt)
  //  $2b$10$Zjgr/o.g/0MvPG8ykdZdDO
  console.log(hashed)
  //  $2b$10$Zjgr/o.g/0MvPG8ykdZdDOAX043Floq7x1MlY0udbujqijxVRVZ8.
}
run();
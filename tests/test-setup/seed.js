const User = require('../../database/models/user')
const Contact = require('../../database/models/contact')

const seedUser = async () => {
  let userToCreate = {
    firstname: 'steven',
    lastname: 'robert',
    source: 'local',
    email: 'steven@example.com',
    password: 'Subhash@1234',
  }
  const seededUser = await User.create(userToCreate)

  return seededUser
}

const seedContact = async () => {
  const contacts = []
  const seededTeams = await Contact.insertMany(contacts)

  return seededTeams
}

module.exports = {
  seedUser,
}

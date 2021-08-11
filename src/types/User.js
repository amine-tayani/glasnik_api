const { objectType, enumType, asNexusMethod } = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')

const DateTime = asNexusMethod(DateTimeResolver, 'date')
const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.date('createdAt')
    t.date('updateAt')
    t.field('role', {
      type: 'Role',
    })
  },
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', {
      type: 'User',
    })
  },
})

const Role = enumType({
  name: 'Role',
  members: ['MOD', 'BOT', 'USER'],
})
module.exports = {
  User,
  AuthPayload,
  Role,
  DateTime,
}
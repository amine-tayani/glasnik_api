const { ValidationError } = require('apollo-server')
const { nonNull, stringArg, mutationField } = require('nexus')

const joinCommunity = mutationField('joinCommunity', {
  description: 'mutation for joining a Community',
  type: 'ResponseMessage',
  args: {
    name: nonNull(stringArg()),
  },
  resolve: async (_parent, args, { prisma, userId }) => {
    const checkIfCommunityExists = await prisma.community.findUnique({
      where: { name: args.name },
    })
    const checkIfUserAlreadyExist = await prisma.community.findFirst({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    })
    if (!checkIfCommunityExists) {
      throw new ValidationError('community does not exists.')
    }
    if (checkIfUserAlreadyExist) {
      throw new ValidationError('user already joined the community.')
    }
    await prisma.community.update({
      where: {
        name: args.name,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return {
      message: 'user joined the community',
    }
  },
})

module.exports = { joinCommunity }
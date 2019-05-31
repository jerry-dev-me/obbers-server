const _ = require("lodash")

const User = require("../../../../models/user")
const Post = require("../../../../models/post")
const Comment = require("../../../../models/comment")
const Response = require("../../../../models/response")

module.exports.basicProfile = {
  _id: 1,
  "info.avatar": 1,
  "info.username": 1,
  "info.name": 1,
  "info.lastName": 1,
  posts: 1,
  following: 1,
  followers: 1,
}

module.exports.fullProfile = {
  _id: 1,
  "local.email": 1,
  // info: 1,
  "info.avatar": 1,
  "info.username": 1,
  "info.name": 1,
  "info.lastName": 1,
  "info.phone": 1,
  "info.website": 1,
  "info.bio": 1,
  "info.sex": 1,
  posts: 1,
  // totalPosts: 1,
  taggedPosts: 1,
  following: 1,
  // totalFollowing: 1,
  followers: 1,
  // totalFollowers: 1
}

module.exports.personalProfile = {
  _id: 1,
  "local.email": 1,
  "local.password": 1,
  "facebook.id": 1,
  "twitter.id": 1,
  "google.id": 1,
  // info: 1,
  "info.avatar": 1,
  "info.username": 1,
  "info.name": 1,
  "info.lastName": 1,
  "info.phone": 1,
  "info.website": 1,
  "info.bio": 1,
  "info.sex": 1,
  posts: 1,
  // totalPosts: 1,
  taggedPosts: 1,
  archivedPosts: 1,
  collections: 1,
  following: 1,
  // totalFollowing: 1,
  followers: 1,
  // totalFollowers: 1
}

module.exports.profileFields = async (readerId, idToRead) => {
  const foundUser = await User.findOne(
    { _id: idToRead },
    { followers: 1, blockedUsers: 1, "account.status": 1, settings: 1 }
  )
  const { followers, blockedUsers, account, settings } = foundUser

  if (foundUser === null || foundUser === undefined) {
    return null
  } else {
    if (this.isSameUser(readerId, idToRead) === true) {
      return this.personalProfile
    } else {
      if ((await this.isAccountActive(account.status)) !== true) {
        return null
      } else {
        if ((await this.isAccountPrivate(settings.private)) !== true) {
          if ((await this.isUserBlocked(readerId, blockedUsers)) === true) {
            return null
          } else {
            return this.fullProfile
          }
        } else {
          if ((await this.isReaderFollowing(readerId, followers)) !== true) {
            if ((await this.isUserBlocked(readerId, idToRead)) === true) {
              return null
            } else {
              return this.basicProfile
            }
          } else {
            if ((await this.isUserBlocked(readerId, idToRead)) === true) {
              return null
            } else {
              return this.fullProfile
            }
          }
        }
      }
    }
  }
}

module.exports.isSameUser = (readerId, idToRead) => {
  if (readerId.toString() === idToRead.toString()) {
    return true
  } else {
    return false
  }
}

module.exports.isAccountActive = async accountStatusOrIdToRead => {
  if (accountStatusOrIdToRead === "ACTIVE") return true
  else return false
  // let val = accountStatusOrIdToRead;
  // if(typeof val === 'string' || val instanceof String || val.constructor === String) {
  //     if(val === 'ACTIVE') return true;
  //         else return false;
  // } else {
  //     let idToRead = accountStatusOrIdToRead;
  //     const foundUser = await User.findOne({ _id: idToRead }, { account: 1 });
  //     if(foundUser.account.status === 'ACTIVE') return true;
  //         else return false;
  // };
}

module.exports.isAccountPrivate = async privateSettingsOrIdToRead => {
  if (privateSettingsOrIdToRead === true) return true
  else return false
  // if(typeof privateSettingsOrIdToRead === 'bool') {
  //     if(privateSettingsOrIdToRead === true) return true;
  //         else return false;
  // } else {
  //     let idToRead = privateSettingsOrIdToRead;
  //     const foundUser = await User.findOne({ _id: idToRead }, { settings: 1 });
  //     return settings.private;
  // };
}

module.exports.isUserBlocked = async (readerId, idToRead) => {
  let blockedUsers
  if (this.shouldWeFindUser(idToRead) === true) {
    const foundUser = await User.findOne({ _id: idToRead }, { blockedUsers: 1 })
    blockedUsers = foundUser.blockedUsers
  } else {
    blockedUsers = idToRead
  }

  if (blockedUsers === null || blockedUsers === undefined) {
    return false
  } else {
    if (blockedUsers.length === 0) {
      return false
    } else {
      let users = []
      blockedUsers.map(blockedUser => {
        users.push(blockedUser.toString())
      })
      return users.includes(readerId.toString())
    }
  }
}

module.exports.isReaderFollowing = async (readerId, idToRead) => {
  let followers
  if (this.shouldWeFindUser(idToRead) === true) {
    const foundUser = await User.findOne({ _id: idToRead }, { followers: 1 })
    followers = foundUser.followers
  } else {
    followers = idToRead
  }

  if (followers === null || followers === undefined) {
    return false
  } else {
    if (followers.length === 0) {
      return false
    } else {
      let users = []
      followers.map(follower => {
        users.push(follower.toString())
      })
      return users.includes(readerId.toString())
    }
  }
}

module.exports.shouldWeFindUser = idToRead => {
  if (idToRead.constructor === Array) {
    return false
  } else if (
    typeof idToRead === "string" ||
    idToRead instanceof String ||
    idToRead.constructor === String
  ) {
    return true
  } else if (idToRead instanceof Object) {
    if (_.size(idToRead) <= 2) return true
  }
}

// module.exports.canUserReadUser = async (readerId, idToRead) => {
//   const foundUser = await User.findOne(
//     { _id: idToRead },
//     { followers: 1, blockedUsers: 1, "account.status": 1, settings: 1 }
//   );
//
//   if (foundUser === null || foundUser === undefined) {
//     return null;
//   } else {
//     const { account, blockedUsers, settings, followers } = foundUser;
//     if (account.status === "ACTIVE" || account.status === "SUSPENDED") {
//       if (this.isSameUser(readerId, idToRead) === true) {
//         return true;
//       } else {
//         if ((await this.isAccountPrivate(settings.private)) === true) {
//           if ((await this.isReaderFollowing(readerId, followers)) === true) {
//             if ((await this.isUserBlocked(readerId, blockedUsers)) === true) {
//               return false;
//             } else {
//               return true;
//             }
//           } else {
//             return false;
//           }
//         } else {
//           if ((await this.isUserBlocked(readerId, blockedUsers)) === true) {
//             return false;
//           } else {
//             return true;
//           }
//         }
//       }
//     } else {
//       return false;
//     }
//   }
// };
//
// module.exports.canUserWrite = async writerId => {
//   const foundUser = await User.findOne({ _id: writerId }, { account: 1 });
//   if (foundUser === null || foundUser === undefined) {
//     return null;
//   } else {
//     const { status, permissions } = foundUser.account;
//     if (status === "ACTIVE" && permissions === "READ_WRITE") return true;
//     else return false;
//   }
// };

module.exports.canUserReadUser = async (readerId, idToRead) => {
  const foundUser = await User.findOne(
    { _id: idToRead },
    { followers: 1, blockedUsers: 1, "account.status": 1, settings: 1 }
  )
  if (foundUser === null || foundUser === undefined) {
    console.log("\n[x] User is null or undefined")
    console.log(foundUser)
    return null
  } else {
    const { account, blockedUsers, settings, followers } = foundUser
    if (account.status === "ACTIVE" || account.status === "SUSPENDED") {
      if (this.isSameUser(readerId, idToRead) === true) {
        return true
      } else {
        if ((await this.isAccountPrivate(settings.private)) === true) {
          if ((await this.isReaderFollowing(readerId, followers)) === true) {
            if ((await this.isUserBlocked(readerId, blockedUsers)) === true) {
              console.log(
                "\n[x] User cannot read user because it has been blocked"
              )
              return false
            } else {
              return true
            }
          } else {
            console.log(
              "\n[x] User cannot read user because id to read is private"
            )
            console.log("and user reader is not a follower of user id to read")
            return false
          }
        } else {
          if ((await this.isUserBlocked(readerId, blockedUsers)) === true) {
            console.log(
              "\n[x] User cannot read user because it has been blocked"
            )
            return false
          } else {
            return true
          }
        }
      }
    } else {
      console.log("\n[x] User cannot read user because of account status")
      console.log("account status: " + account.status)
      return false
    }
  }
}

module.exports.canUserRead = async readerId => {
  const foundUser = await User.findOne(
    { _id: readerId },
    { "account.status": 1, "account.permissions": 1 }
  )
  if (foundUser === null || foundUser === undefined) {
    console.log("\n[x] User is null or undefined")
    console.log(foundUser)
    return null
  } else {
    const { account } = foundUser
    if (
      !(
        account.status === "ACTIVE" ||
        (account.status === "SUSPENDED" &&
          account.permissions === "READ_WRITE") ||
        account.permissions === "READ_ONLY"
      )
    ) {
      console.log(
        "\n[x] User can not read because of account status or permisions"
      )
      console.log("account status: " + account.status)
      console.log("account permissions: " + account.permissions)
      return false
    } else {
      return true
    }
  }
}

module.exports.canUserWrite = async writerId => {
  const foundUser = await User.findOne({ _id: writerId }, { account: 1 })
  if (foundUser === null || foundUser === undefined) {
    console.log("\n[x] User is null or undefined")
    console.log(foundUser)
    return null
  } else {
    const { status, permissions } = foundUser.account
    if (!(status === "ACTIVE" && permissions === "READ_WRITE")) {
      console.log(
        "\n[x] User does not have write permission or account is not ACTIVE"
      )
      console.log(foundUser.account)
      return false
    } else {
      return true
    }
  }
}

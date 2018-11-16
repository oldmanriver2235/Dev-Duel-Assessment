export const getProfile = (obj, repos) => {
  return {
    username: obj.login,
    name: obj.name,
    location: obj.location,
    email: obj.email,
    bio: obj.bio,
    avatar_url: obj.avatar_url,
    // titles: generateTitles(
    //   forkedRepos,
    //   publicRepos,
    //   followers,
    //   following,
    //   languages,
    //   repos
    // ),
    // titles: [
    //   isForker(repos),
    //   isOneTrickPony(repos),
    //   isJackOfAllTrades(repos),
    //   isStalker(user),
    //   isMrPopular(user)
    // ].filter(title => title),
    favoriteLanguage: generateFavLanguage(repos),
    publicRepos: obj.public_repos,
    totalStars: generateTotalStars(repos),
    highestStarred: generateHighestStarred(repos),
    perfectRepos: generatePerfectRepos(repos),
    followers: obj.followers,
    following: obj.following
  }
}

// let generateTitles = (
//   forkedRepos,
//   publicRepos,
//   followers,
//   following,
//   repos,
//   languages
// ) => {
//   let titles = []

//   if (forkedRepos > publicRepos / 2) {
//     titles.push('Forker')
//   }
//   if (languages == 1) {
//     titles.push('One Trick Pony')
//   }
//   if (languages >= 10) {
//     titles.push('Jack of all Trades')
//   }
//   if (following > 0 && following >= followers * 2) {
//     titles.push('Stalker')
//   }
//   if (followers > 0 && followers >= following * 2) {
//     titles.push('Mr. Popular')
//   }
//   if (followers <= 2 && following >= 10) {
//     titles.push('Pied piper')
//   }

//   return titles
// }
const generateForkedRepos = repos => {
  let forkedRepos = 0
  for (let repo of repos) {
    if (repo.fork) {
      forkedRepos++
    }
  }
  return forkedRepos
}
const generateFavLanguage = repos => {
  let languages = {}
  for (let repo of repos) {
    if (repo.language) {
      if (languages[`${repo.language}`]) {
        languages[`${repo.language}`] += 1
      } else {
        languages[`${repo.language}`] = 1
      }
    }
    return languages
  }
  let favoriteLanguage = Object.entries(languages).reduce(
    (acc, language) => (acc[1] > language[1] ? acc : language),
    [null, 0]
  )[0]
  return favoriteLanguage
}
// const languageTotals = repos =>
//   repos.map(repo => repo.language).reduce(
//     (languageTotals, language) => ({
//       ...languageTotals,
//       [language]: languageTotals[language] ? languageTotals[language] + 1 : 1
//     }),
//     {}
//   )

// const generateLanguages = repos => {
//   let languages = {}
//   for (let repo of repos) {
//     if (repo.language) {
//       if (languages[`${repo.language}`]) {
//         languages[`${repo.language}`] += 1
//       } else {
//         languages[`${repo.language}`] = 1
//       }
//     }
//   }
//   return languages
// }

const generateTotalStars = repos => {
  let initialValue = 0
  let totalStars = repos.reduce(
    (accumulator, currentValue) => accumulator + currentValue.stargazers_count,
    initialValue
  )

  return totalStars
}

const generateHighestStarred = repos => {
  let allStars = repos.reduce(
    (accumulator, currentValue) => [
      ...accumulator,
      currentValue.stargazers_count
    ],
    0
  )
  let highestStarred = Math.max.apply(null, allStars)
  return highestStarred
}

const generatePerfectRepos = repos => {
  let perfectRepos = 0
  for (let repo of repos) {
    if (repo.open_issues_count == 0) {
      perfectRepos++
    }
  }
  return perfectRepos
}
// const isForker = repos =>
//   (repos.filter(repo => repo.fork).length > repos.length / 2 ? 'Forker' : '')

// const isOneTrickPony = repos =>
//   (repos.map(repo => repo.language).filter(onlyUnique).length === 1
//     ? 'One-Trick Pony'
//     : '')

// const isJackOfAllTrades = repos =>
//   (repos.map(repo => repo.language).filter(onlyUnique).length >= 10
//     ? 'Jack of all Trades'
//     : '')

// const isStalker = user => (user.following > user.followers * 2 ? 'Stalker' : '')

// const isMrPopular = user =>
//   (user.followers > user.following * 2 ? 'Mr. Popular' : '')

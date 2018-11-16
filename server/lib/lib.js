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
  }
  let favoriteLanguage = Object.entries(languages).reduce(
    (acc, language) => (acc[1] > language[1] ? acc : language),
    [null, 0]
  )[0]
  return favoriteLanguage
}

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
// const generateFavLanguage = (repos, l) => {
//     let mostInstances = repos[0]
//     let previousCount = 0
//     for(let repo of repos){
//       let count = 0
//       for(l of repos){
//         if(l.language===repos.language){
//           count++
//         }
//       }
//       if(count > previousCount){
//         favoriteLanguage = language
//         previousCount = count
//       }
//     }
//     return favoriteLanguage
//    }

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

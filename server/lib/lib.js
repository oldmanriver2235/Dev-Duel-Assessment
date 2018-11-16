export const getProfile = (obj, repos) => {
  return {
    username: obj.login,
    name: obj.name,
    location: obj.location,
    email: obj.email,
    bio: obj.bio,
    avatar_url: obj.avatar_url,
    titles: generateTitles(
      generateForkedRepos(repos),
      obj.public_repos,
      // generateLanguages(repos),
      obj.followers,
      obj.following
    ),
    favoriteLanguage: generateFavLanguage(repos),
    publicRepos: obj.public_repos,
    totalStars: generateTotalStars(repos),
    highestStarred: generateHighestStarred(repos),
    perfectRepos: generatePerfectRepos(repos),
    followers: obj.followers,
    following: obj.following
  }
}

let generateTitles = (
  forkedRepos,
  publicRepos,
  // languages,
  followers,
  following
) => {
  let titles = []

  if (forkedRepos > publicRepos / 2) {
    titles.push('Forker')
    // // }
    // if (containsOnlyOne(generateLanguages(repos))) {
    //   titles.push('One Trick Pony')
    // }
    // if (languages.length >= 10) {
    //   titles.push('Jack of all Trades')
  }
  if (following > 0 && following >= followers * 2) {
    titles.push('Stalker')
  }
  if (followers > 0 && followers >= following * 2) {
    titles.push('Mr. Popular')
  }
  if (followers <= 2 && following >= 10) {
    titles.push('Pied piper')
  }
  console.log(titles)
  return titles
}

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
  console.log(favoriteLanguage)
  return favoriteLanguage
}

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
//       } else {

//       }
//     }
//   }
//   return languages
// }
// const generatelanguages = repos => {
//   let languages = {}
//   for (let repo of repos) {
//     if (repo.language !== null) {
//       languages.push(repo.language)
//     }
//   }
//   console.log(languages)
//   return languages
// }

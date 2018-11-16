// /* eslint-disable no-undef */
// /*
//   TODO
//   Fetch 2 user's github data and display their profiles side by side
//   If there is an error in finding user or both users, display appropriate error
//   message stating which user(s) doesn't exist

//   It is up to the student to choose how to determine a 'winner'
//   and displaying their profile/stats comparison in a way that signifies who won.
//  */
// $('form').submit(() => {
//   const username = $('form input').val()
//   console.log(`examining ${username}`)

//   fetch(`${USER_URL}/${username}`)
//     .then(response => response.json()) // Returns parsed json data from response body as promise
//     .then(data => {
//       console.log(`Got data for ${username}`)
//       console.log(data)

//       $('.username').text(data.username)
//       $('.full-name').text(data.name)
//       $('.location').text(data.location)
//       $('.email').text(data.email)
//       $('.bio').text(data.bio)
//       $('.titles.value').text(data.titles)
//       $('.total-stars.value').text(data.totalStars)
//       $('.favorite-language.value').text(data.favoriteLanguage)
//       $('.most-starred.value').text(data.highestStarred)
//       $('.public-repos.value').text(data.publicRepos)
//       $('.perfect-repos.value').text(data.perfectRepos)
//       $('.followers.value').text(data.followers)
//       $('.following.value').text(data.following)

//       $('.user-results').removeClass('hide')
//     })
//     .catch(err => {
//       console.log(`Error getting data for ${username}`)
//       console.log(err)
//     })

//   return false
// })
import { userHtml } from './template.js'

$('form').submit(() => {
  const leftUsername = $('#username-left').val()
  const rightUsername = $('#username-right').val()

  fetch(`${USERS_URL}?username=${leftUsername}&username=${rightUsername}`)
    .then(response => response.json())
    .then(users => {
      if (!users.message) {
        const usersHtml = users.map(user => userHtml(user))
        $('.user-results.left').html(usersHtml[0])
        $('.user-results.right').html(usersHtml[1])
        $('.duel-container').removeClass('hide')
      }
    })
    .catch(err => {
      $('.error').html(err)
      $('.dual-error').removeClass('hide')
    })
  return false
})

// if (${leftUsername}.perfectRepos > ${rightUsername}.perfectRepos) {
//   return '${leftUsername} is the victor!'
// }else {
//   return '${rightUsername} is the victor!'
// }

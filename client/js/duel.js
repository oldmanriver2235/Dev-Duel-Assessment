$('form').submit(() => {
  const leftUsername = $('#username-left').val()
  const rightUsername = $('#username-right').val()

  fetch(`${USERS_URL}?username=${leftUsername}&username=${rightUsername}`)
    .then(response => response.json())
    .then(users => {
      if (!users.message) {
        $('.user-results.left .username').text(users[0].username)
        $('.user-results.left .full-name').text(users[0].name)
        $('.user-results.left .location').text(users[0].location)
        $('.user-results.left .avatar').attr('src', users[0].avatar_url)
        $('.user-results.left .email').text(users[0].email)
        $('.user-results.left .bio').text(users[0].bio)
        $('.user-results.left .titles.value').text(users[0].titles)
        $('.user-results.left .total-stars.value').text(users[0].totalStars)
        $('.user-results.left .favorite-language.value').text(
          users[0].favoriteLanguage
        )
        $('.user-results.left .most-starred.value').text(
          users[0].highestStarred
        )
        $('.user-results.left .public-repos.value').text(users[0].publicRepos)
        $('.user-results.left .perfect-repos.value').text(users[0].perfectRepos)
        $('.user-results.left .followers.value').text(users[0].followers)
        $('.user-results.left .following.value').text(users[0].following)
        $('.user-results.right .username').text(users[1].username)
        $('.user-results.right .full-name').text(users[1].name)
        $('.user-results.right .location').text(users[1].location)
        $('.user-results.right .avatar').attr('src', users[1].avatar_url)
        $('.user-results.right .email').text(users[1].email)
        $('.user-results.right .bio').text(users[1].bio)
        $('.user-results.right .titles.value').text(users[1].titles)
        $('.user-results.right .total-stars.value').text(users[1].totalStars)
        $('.user-results.right .favorite-language.value').text(
          users[1].favoriteLanguage
        )
        $('.user-results.right .most-starred.value').text(
          users[1].highestStarred
        )
        $('.user-results.right .public-repos.value').text(users[1].publicRepos)
        $('.user-results.right .perfect-repos.value').text(
          users[1].perfectRepos
        )
        $('.user-results.right .followers.value').text(users[1].followers)
        $('.user-results.right .following.value').text(users[1].following)
        $('.duel-container').removeClass('hide')
      }
    })
    .catch(err => {
      $('.error').html(err)
      $('.dual-error').removeClass('hide')
    })
  return false
})

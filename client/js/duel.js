const isDefined = value => value || ''

const userHtml = user =>
  `
<div class="user-info">
  <span class="username">${user.username}</span>
  <span class="full-name">${isDefined(user.name)}</span>
  <span class="location">${isDefined(user.location)}</span>
  <span class="email">${isDefined(user.email)}</span>
  <span class="bio">${isDefined(user.bio)}</span>
</div>
<img class="avatar" src="${user['avatar_url']}" alt="avatar picture">
<div class="stats">
  <div class="stat">
      <span class="label">Titles:&nbsp;</span>
      <span class="titles value">${user.titles}</span>
  </div>
  <div class="stat">
      <span class="label">Favorite Language:&nbsp;</span>
      <span class="favorite-language value">${user['favorite-language'] === null ? 'none' : user['favorite-language']}</span>
  </div>
  <div class="stat">
      <span class="label">Total Stars:&nbsp;</span>
      <span class="total-stars value">${user['total-stars']}</span>
  </div>
  <div class="stat">
      <span class="label">Highest Star Count:&nbsp;</span>
      <span class="most-starred value">${user['highest-starred']}</span>
  </div>
  <div class="stat">
      <span class="label">Public Repos:&nbsp;</span>
      <span class="public-repos value">${user['public-repos']}</span>
  </div>
  <div class="stat">
      <span class="label">Perfect Repos:&nbsp;</span>
      <span class="perfect-repos value">${user['perfect-repos']}</span>
  </div>
  <div class="stat">
      <span class="label">Followers:&nbsp;</span>
      <span class="followers value">${user.followers}</span>
  </div>
  <div class="stat">
      <span class="label">Following:&nbsp;</span>
      <span class="followers value">${user.following}</span>
  </div>
</div>`

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

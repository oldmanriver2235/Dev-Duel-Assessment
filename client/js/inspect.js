/* eslint-disable no-undef */
$('form').submit(() => {
  const username = $('form input').val()
  console.log(`examining ${username}`)

  // Fetch data for given user
  // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  fetch(`${USER_URL}/${username}`)
    .then(response => response.json()) // Returns parsed json data from response body as promise
    .then(data => {
      console.log(`Got data for ${username}`)
      console.log(data)
      /*
        TODO
        Attach the data returned to the DOM
        The data currently hard-coded into the DOM is placeholder data
       */
      $('.username').text(data.username)
      $('.full-name').text(data.name)
      $('.location').text(data.location)
      $('.avatar').attr('src', data.avatar_url)
      $('.email').text(data.email)
      $('.bio').text(data.bio)
      $('.titles.value').text(data.titles)
      $('.total-stars.value').text(data.totalStars)
      $('.favorite-language.value').text(data.favoriteLanguage)
      $('.most-starred.value').text(data.highestStarred)
      $('.public-repos.value').text(data.publicRepos)
      $('.perfect-repos.value').text(data.perfectRepos)
      $('.followers.value').text(data.followers)
      $('.following.value').text(data.following)

      $('.user-results').removeClass('hide') // Display '.user-results' element
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
      /*
        TODO
        If there is an error finding the user, instead toggle the display of the '.user-error' element
        and populate it's inner span '.error' element with an appropriate error message
      */
    })

  return false // return false to prevent default form submission
})

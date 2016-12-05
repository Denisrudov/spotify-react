import fetch from 'isomorphic-fetch'
const searchUrl = 'https://api.spotify.com/v1/search'

export function searchArtist(artist){
  return `${searchUrl}?type=artist&q=${encodeURIComponent(artist)}`
}

export function searchAlbum(album) {
  return `${searchUrl}?type=album&q=${encodeURIComponent(album)}`
}

export function makeCall(url){
  return fetch(url,{ mode: 'cors'})
    .then(_toJson)
}



function _toJson(response){
  return response.json()
}
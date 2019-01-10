export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  let song=state.playlist[state.currentIndex];
  return song || {}
}

export const songs = state => state.songs

export const disc = state => state.disc

export const album = state => state.album

export const searchHistory = state => state.searchHistory

export const loginStatus = state => state.loginStatus


export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList



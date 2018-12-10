export default class Song {
  constructor({id, mid, singer, name, album, dt, image, url,mv,alias}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.dt = dt
    this.image = image
    this.url = url
    this.mv = mv
    this.alias = alias
  }

}

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.artists),
    name: musicData.name,
    album: musicData.album.name,
    dt: musicData.duration,
    image: musicData.album.picUrl,
    imagev1:musicData.album.img1v1Url,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
    mv:musicData.mvid,
    alias:musicData.alias
  })
}
export function createSongBySinger(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    dt: musicData.dt,
    image: musicData.al.picUrl,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
    mv:musicData.mv,
    alias:musicData.alia
  })
}



function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

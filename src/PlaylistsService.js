import { Pool } from 'pg';

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT s.*
      FROM songs s
      JOIN playlist_songs ps ON ps.song_id = s.rec_id
      JOIN playlists p ON p.rec_id = ps.playlist_id
      WHERE p.public_id = $1
      `,
      values: [playlistId],
    };

    const { rows } = await this._pool.query(query);

    return rows;
  }
}

export default PlaylistsService;

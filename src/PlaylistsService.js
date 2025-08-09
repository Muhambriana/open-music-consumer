import { Pool } from 'pg';

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: 'SELECT public_id as id, name FROM playlists WHERE public_id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new Error('Playlist Not Found');
    }

    return result.rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT s.public_id AS id, s.title, s.performer
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

class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._playlistsService.getPlaylistById(playlistId);
      const playlistSongs = await this._playlistsService.getPlaylistSongs(playlistId);
      const finalData = {
        playlist: {
          ...playlist,
          songs: playlistSongs,
        },
      };
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(finalData));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Listener;

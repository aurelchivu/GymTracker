import React from "react";
import axios from "axios"

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const YOUTUBE_API_KEY="AIzaSyB6lOjj9XCkTwsotkClF5FuXtMUNmx2oxM"

export default async function getServerSideProps() {
  const { data } = await axios.get(`${YOUTUBE_PLAYLIST_ITEMS_API}?key=${YOUTUBE_API_KEY}`);
  return {
    props: {
      data
    }
  }
}
import axios from 'axios';
import { parseVideoDuration } from './parseVideoDuration';
import { convertRawtoString } from './convertRawtoString';
import { timeSince } from './timeSince';
import { YOUTUBE_API_URL } from './constants';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const parseData = async (items = []) => {
  if (!items || !items.length) return [];

  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach((item) => {
      const vId = typeof item.id === 'object' ? item.id?.videoId : item.id;
      if (vId) videoIds.push(vId);

      const cId = item.snippet?.channelId;
      if (cId && !channelIds.includes(cId)) channelIds.push(cId);
    });

    if (!videoIds.length) return [];

    // Parallel requests for channel avatars and video durations/metrics
    const [channelsResponse, videosResponse] = await Promise.all([
      channelIds.length
        ? axios.get(`${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${channelIds.join(',')}&key=${API_KEY}`).catch(() => ({ data: { items: [] } }))
        : Promise.resolve({ data: { items: [] } }),
      axios.get(`${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(',')}&key=${API_KEY}`).catch(() => ({ data: { items: [] } }))
    ]);

    const channelsData = channelsResponse.data?.items || [];
    const videosData = videosResponse.data?.items || [];

    // Map by ID for safe O(1) lookups instead of fragile index assumptions
    const channelMap = new Map();
    channelsData.forEach((channel) => {
      channelMap.set(channel.id, {
        image: channel.snippet?.thumbnails?.default?.url || channel.snippet?.thumbnails?.medium?.url || '',
        subscribers: convertRawtoString(channel.statistics?.subscriberCount, true)
      });
    });

    const videoMap = new Map();
    videosData.forEach((video) => {
      videoMap.set(video.id, {
        duration: parseVideoDuration(video.contentDetails?.duration),
        views: convertRawtoString(video.statistics?.viewCount),
        likes: convertRawtoString(video.statistics?.likeCount)
      });
    });

    const parsedResults = [];

    items.forEach((item) => {
      const vId = typeof item.id === 'object' ? item.id?.videoId : item.id;
      if (!vId) return;

      const snippet = item.snippet || {};
      const channelInfo = channelMap.get(snippet.channelId) || { image: '', subscribers: '0' };
      const videoMetrics = videoMap.get(vId) || { duration: '0:00', views: '0', likes: '0' };

      const thumbnail =
        snippet.thumbnails?.maxres?.url ||
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url ||
        `https://i.ytimg.com/vi/${vId}/hqdefault.jpg`;

      parsedResults.push({
        videoId: vId,
        videoTitle: snippet.title || 'Untitled Video',
        videoDescription: snippet.description || '',
        videoThumbnail: thumbnail,
        videoLink: `/watch/${vId}`,
        videoDuration: videoMetrics.duration,
        videoViews: videoMetrics.views,
        videoLikes: videoMetrics.likes,
        videoAge: timeSince(snippet.publishedAt),
        channelInfo: {
          id: snippet.channelId || '',
          image: channelInfo.image,
          name: snippet.channelTitle || 'Unknown Creator',
          subscribers: channelInfo.subscribers
        }
      });
    });

    return parsedResults;
  } catch (err) {
    console.error('Error in parseData:', err.message);
    return [];
  }
};


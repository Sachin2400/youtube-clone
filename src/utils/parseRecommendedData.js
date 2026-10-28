import { parseData } from './parseData';

export const parseRecommendedData = async (items = [], currentVideoId = '') => {
  if (!items || !items.length) return [];

  // Filter out the current playing video so it does not recommend itself
  const filteredItems = items.filter((item) => {
    const vId = typeof item.id === 'object' ? item.id?.videoId : item.id;
    return vId && vId !== currentVideoId;
  });

  return parseData(filteredItems);
};


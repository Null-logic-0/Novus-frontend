export const formatFollowers = (count) => {
  if (count === 1) return `${count} Follower`;
  if (count < 1000) return `${count} Followers`;
  if (count >= 1000 && count < 1000000) {
    return `${(count / 1000).toFixed(1)}k Followers`;
  }
  return `${(count / 1000000).toFixed(1)}M Followers`;
};

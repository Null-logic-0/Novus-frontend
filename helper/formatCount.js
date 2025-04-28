export const formatCount = (count, type) => {
  if (count === 1) return `1 ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  if (count < 1000)
    return `${count} ${type.charAt(0).toUpperCase() + type.slice(1)}s`;

  if (count >= 1000 && count < 1000000) {
    return `${(count / 1000).toFixed(1)}k ${
      type.charAt(0).toUpperCase() + type.slice(1)
    }s`;
  }

  if (count >= 1000000 && count < 1000000000) {
    return `${(count / 1000000).toFixed(1)}M ${
      type.charAt(0).toUpperCase() + type.slice(1)
    }s`;
  }

  return `${(count / 1000000000).toFixed(1)}B ${
    type.charAt(0).toUpperCase() + type.slice(1)
  }s`;
};

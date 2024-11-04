enum Service {
  YouTube = 'YOUTUBE',
  Vimeo = 'VIMEO',
  Google = 'GOOGLE',
}

const patterns = {
  [Service.YouTube]:
    /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|.+\?v=|)([^&?\s]{11})/,
  [Service.Vimeo]:
    /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:.*\/)?([0-9]{1,})\b/,
  [Service.Google]:
    /(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|uc\?id=|uc\?export=download&id=|)([a-zA-Z0-9_-]+))/,
};

const getEmbedUrl = {
  [Service.YouTube]: (id: string) => `https://www.youtube.com/embed/${id}`,
  [Service.Vimeo]: (id: string) => `https://player.vimeo.com/video/${id}`,
  [Service.Google]: (id: string) =>
    `https://drive.google.com/file/d/${id}/preview`,
};

const getServiceId = (url: string, service: Service) => {
  const match = url.match(patterns[service]);
  return match && { id: match[1], service };
};

export const parseUrl = (url: string) => {
  const match =
    getServiceId(url, Service.YouTube) ||
    getServiceId(url, Service.Vimeo) ||
    getServiceId(url, Service.Google);
  return match && getEmbedUrl[match.service](match.id);
};

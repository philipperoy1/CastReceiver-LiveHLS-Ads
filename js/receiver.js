const context = cast.framework.CastReceiverContext.getInstance();

const playerManager = context.getPlayerManager();

const mediaData = {
  contentType: "application/x-mpegurl",
  streamType: "LIVE",
  contentUrl:
    "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
  adTagUrl:
    "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=" +
    Math.floor(Math.random() * 10000),
};

playerManager.setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD,
  (request) => {
    return new Promise((resolve, reject) => {
      // Stream
      request.media.contentUrl = mediaData.contentUrl;
      request.media.contentType = mediaData.contentType;
      request.media.streamType = mediaData.streamType;

      // ADS
      let vastTemplate = new cast.framework.messages.VastAdsRequest();
      vastTemplate.adTagUrl = mediaData.adTagUrl;
      request.media.vmapAdsRequest = vastTemplate;

      // METADATA
      let metadata = new cast.framework.messages.GenericMediaMetadata();
      metadata.title = "Title";
      metadata.subtitle = "Author";
      request.media.metadata = metadata;

      console.log("request = ", request);
      resolve(request);
    });
  }
);

context.start();

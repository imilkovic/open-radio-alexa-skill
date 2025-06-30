const streamUrls = {
  "chill": "https://stream.otvoreni.hr/chill",
  "hot": "https://stream.otvoreni.hr/hot",
  "love": "https://stream.otvoreni.hr/love",
  "fitness": "https://stream.otvoreni.hr/fitness",
  "ho-ho": "https://stream.otvoreni.hr/ho-ho",
  "default": "https://stream.otvoreni.hr/otvoreni"
};

exports.handler = async (event) => {
  const intent = event.request.intent;
  const streamName = intent && intent.slots && intent.slots.StreamName && intent.slots.StreamName.value
    ? intent.slots.StreamName.value.toLowerCase()
    : "default";

  const streamUrl = streamUrls[streamName] || streamUrls["default"];

  return {
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: "Playing Open Radio " + (streamName === "default" ? "" : streamName)
      },
      directives: [
        {
          type: "AudioPlayer.Play",
          playBehavior: "REPLACE_ALL",
          audioItem: {
            stream: {
              token: "stream",
              url: streamUrl,
              offsetInMilliseconds: 0
            }
          }
        }
      ],
      shouldEndSession: true
    }
  };
};

class Transceiver {
  #config = {};
  #connection = undefined;
  #sendChannel = undefined;

  constructor(config) {
    this.#config = config;
  }

  #handleIceCandidate = (candidate) => {
    candidate && this.#connection.addIceCandidate(candidate);
  };

  offer = async () => {
    this.#connection = new RTCPeerConnection(this.#config);
    this.#connection.remoteDescription &&
      (this.#connection.onicecandidate = (e) =>
        this.#handleIceCandidate(e.candidate));

    this.#sendChannel = this.#connection.createDataChannel("sendChannel");
    this.#sendChannel.onopen = async () => {
      console.log("send channel opened");
    };
    this.#sendChannel.onclose = async () => {
      console.log("send channel closed");
    };

    const offer = await this.#connection.createOffer();
    this.#connection.setLocalDescription(offer);

    return offer;
  };

  answer = async (offer) => {
    this.#connection = new RTCPeerConnection(this.#config);
    this.#connection.onicecandidate = (e) =>
      this.#handleIceCandidate(e.candidate);

    this.#connection.setRemoteDescription(offer);
    this.#connection.ondatachannel = async () => {
      console.log("received data channel");
    };

    const answer = await this.#connection.createAnswer();
    this.#connection.setLocalDescription(answer);

    return answer;
  };

  connect = async (answer) => {
    this.#connection.setRemoteDescription(answer);
  };
}

const config = {
  iceServers: [
    {
      url: "stun:global.stun.twilio.com:3478?transport=udp",
      urls: "stun:global.stun.twilio.com:3478?transport=udp",
    },
    {
      url: "turn:global.turn.twilio.com:3478?transport=udp",
      username:
        "cd4dfc8127082a04b865f5607c031410726df919c4ced0f93619be0ed2b811b3",
      urls: "turn:global.turn.twilio.com:3478?transport=udp",
      credential: "h/sD5UftD1H2Tjlux/u6kqdqsIleXtEEZthVgY/BciA=",
    },
    {
      url: "turn:global.turn.twilio.com:3478?transport=tcp",
      username:
        "cd4dfc8127082a04b865f5607c031410726df919c4ced0f93619be0ed2b811b3",
      urls: "turn:global.turn.twilio.com:3478?transport=tcp",
      credential: "h/sD5UftD1H2Tjlux/u6kqdqsIleXtEEZthVgY/BciA=",
    },
    {
      url: "turn:global.turn.twilio.com:443?transport=tcp",
      username:
        "cd4dfc8127082a04b865f5607c031410726df919c4ced0f93619be0ed2b811b3",
      urls: "turn:global.turn.twilio.com:443?transport=tcp",
      credential: "h/sD5UftD1H2Tjlux/u6kqdqsIleXtEEZthVgY/BciA=",
    },
  ],
};

const sender = new Transceiver(config);

document.getElementById("sender__generate-offer").onclick = async () => {
  console.log("generating offer");

  const offer = await sender.offer();

  document.getElementById("sender__offer").value = offer.sdp;
};

document.getElementById("sender__connect").onclick = async () => {
  console.log("connecting");

  await sender.connect(
    new RTCSessionDescription({
      type: "answer",
      sdp: document.getElementById("sender__answer").value,
    })
  );
};

const receiver = new Transceiver(config);

document.getElementById("receiver__generate-answer").onclick = async () => {
  console.log("generating answer");

  const answer = await receiver.answer(
    new RTCSessionDescription({
      type: "offer",
      sdp: document.getElementById("receiver__offer").value,
    })
  );

  document.getElementById("receiver__answer").value = answer.sdp;
};

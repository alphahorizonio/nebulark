import React from "react";
import styled from "styled-components";
import IPFS from "ipfs";
import WebTorrent from 'webtorrent';

const Button = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 2px;
  height: 30px;
  width: 80px;
  margin-left: 346px;
  margin-top: 12px;
  

  @media (max-width: 360px) {
    
  }
`;

const TextArea = styled.textarea`
  width: 420px;
  height: 200px;
  margin-left: 0px;
  resize: none;
  
  @media (max-width: 360px) {
    width: 360px;
  }
`;

const InputFile = styled.input`
  margin: -100px;
  margin-left: 0px;
`;

const InputJSON = styled.input`
  margin-left: 0px;
  margin-bottom: 30px;
`;

const H1 = styled.h1`
  margin-left: 0px;
  margin-bottom: 30px;
  font-size: 26px;
`;

const Wrapper = styled.div`

  @media (max-width: 768px) {
    

  }
`;

function SparkDashboard({ ...otherProps }) {

  // this is the json
  const [string, setString] = React.useState("");

  // this is the binary
  const [readerResult, setReaderResult] = React.useState();

  //var fileHash = null;
  //var fileHashJSON = null;

  var torrentId = null;
  var torrentId6 = null;
  // create webtorrent here!
  async function handleExecute() {
    //const node = await IPFS.create();
    var client = new WebTorrent();
    var client6 = new WebTorrent();
    // Upload readeresult here
    // const file = await node.add({
    //   path: "hello.txt",
    //   content: new Uint8Array(readerResult),
    // });
    

    var buf = new Buffer(readerResult)
    buf.name = 'Nebulark'
    client.seed(buf, function(torrent) {
      console.log('Client is seeding: ', torrent.magnetURI)
      torrentId = torrent.magnetURI
    })


    var buf6 = new Buffer(string)
    buf6.name = 'Nebulark'
    client6.seed(buf6, function(torrent6) {
      console.log('Client is seeding: ', torrent6.magnetURI)
      torrentId6 = torrent6.magnetURI 
    })    

    //console.log(WebTorrent.WEBRTC_SUPPORT)
  
    // client.add(torrentId, function(torrent) {
    //   var file = torrent.files.find(function (file) { 
    //     return file.name.endsWith('')
    //   })
    // })

    // filehash in create function above
    //fileHash = file.cid.toString();

    // add second file
    //const fileJSON = await node.add({
    //  path: "hello.txt",
    //  content: new Uint8Array(new TextEncoder().encode(string)),
    //});

    // get id again
    //fileHashJSON = fileJSON.cid.toString();

    //log both filehashes
    console.log(torrentId);
    console.log(torrentId6);
  }

  async function captureFile(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      setReaderResult(reader.result);
    };
  }

  function captureFileJSON(event) {
    event.preventDefault();

    const fileJSON = event.target.files[0];
    const readerJSON = new window.FileReader();

    readerJSON.readAsArrayBuffer(fileJSON);
    readerJSON.onloadend = () => {
      setString(new TextDecoder().decode(new Uint8Array(readerJSON.result)));
    };
  }

  return (
    <>
      <div {...otherProps}>
        <Wrapper>
          <H1>Upload Binary</H1>
          <InputFile
            type="file"
            onChange={(event) => captureFile(event)}
          ></InputFile>
          <br />
          <H1>Upload JSON or enter below</H1>
          <InputJSON
            type="file"
            onChange={(event) => captureFileJSON(event)}
          ></InputJSON>
          <br />
          <TextArea
            type="text"
            value={string}
            onChange={(event) => setString(event.target.value)}
          ></TextArea>
          <br />
          <Button onClick={handleExecute}>Execute</Button>
        </Wrapper>
      </div>
    </>
  );
}

export default SparkDashboard;

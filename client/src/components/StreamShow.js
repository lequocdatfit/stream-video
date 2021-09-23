import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../actions';
import flv from 'flv.js';

function StreamShow(props) {
  const videoRef = useRef(null);
  const flvPlayer = useRef(null);

  useEffect(() => {
    const streamId = props.match.params.id;  
    props.fetchStream(streamId);

    
  }, []);

  useEffect(() => {
    buildPlayer();

    return () => {
      if(flvPlayer.current) {
        flvPlayer.current.destroy();
        flvPlayer.current = null;
        console.log("Destroy");
      }
    }
  }, [props.stream]);

  function buildPlayer() {
    if(flvPlayer.current || !props.stream) {
      return;
    }
    const streamId = props.match.params.id;    
    flvPlayer.current = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${streamId}.flv`
    });
    
    flvPlayer.current.attachMediaElement(videoRef.current);
    flvPlayer.current.load();
    
  }

  if(!props.stream) 
    return <div>Loading...</div>

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls/>
      <h1>{props.stream.title}</h1>
      <h5>{props.stream.description}</h5>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);
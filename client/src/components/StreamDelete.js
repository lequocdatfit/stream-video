import React, { useEffect } from 'react';
import Modal from './Modal';
import { connect } from 'react-redux';
import history from '../history';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../actions';


function StreamDelete(props) {
  const streamId = props.match.params.id;
  useEffect(() => {
    
    props.fetchStream(streamId);
  }, []);

  const onDismiss = () => {
    history.push('/');
  }

  const actions = <>
    <button className="ui button negative" onClick={() => props.deleteStream(streamId)}>Delete</button>
    <Link to="/" className="ui button">
      Cancel
    </Link>
  </>

  if(!props.stream) {
    return <div className="">Loading</div>
  }

  return (
    <div>
      <Modal 
        title="Delete Stream"
        content={`Are you want to delete this stream: ${props.stream.title}?`}
        actions={actions}
        onDismiss={onDismiss}
        />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)
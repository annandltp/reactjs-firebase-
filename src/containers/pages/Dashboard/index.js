import React, {Component, Fragment} from 'react';
import { addDataToApi, getDataFromApi, updateDataFromApi, deleteDataFromApi } from '../../../config/redux/action';
import { connect } from 'react-redux';
import './dashboard.scss';

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid)
    }

    handleSaveNotes = () => {
        const {title, content, textButton, noteId} = this.state;
        const {saveNotes, updateNotes, deleteNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if(textButton === 'SIMPAN'){
            saveNotes(data)
        }else{
            data.noteId = noteId
            updateNotes(data)
        }
        // console.log(data)
    }

    onInputChange = (e, type) => {
        this.setState({
            [type] : e.target.value
        })
    }

    updateNotes = (note) => {
        console.log(note)
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }
    
    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'SIMPAN'
        })
    }

    deleteNotes = (e, note) => {
        e.stopPropagation();
        const { deleteNotes } = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        deleteNotes(data)
    }

    render(){
        const {title, content, textButton} = this.state
        const { notes } = this.props
        const { updateNotes, cancelUpdate, deleteNotes } = this
        console.log('notes', notes)
        return(
            <div>
                <p>Dashboard Page</p>
                <div>
                    <input placeholder="title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea placeholder="content" value={content} onChange={(e) => this.onInputChange(e, 'content')}>

                    </textarea>
                    <button onClick={this.handleSaveNotes}>{textButton}</button>
                    {
                        textButton === 'UPDATE' ? (
                            <button onClick={cancelUpdate}>CANCEL</button>
                        ) : null
                    }
                </div>
                <hr/>
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note =>  {
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => updateNotes(note)}>
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div onClick={(e) => deleteNotes(e, note)}>x</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes : (data) => dispatch(addDataToApi(data)),
    getNotes: (data) => dispatch(getDataFromApi(data)),
    updateNotes: (data) => dispatch(updateDataFromApi(data)),
    deleteNotes: (data) => dispatch(deleteDataFromApi(data))
}) 

export default connect(reduxState, reduxDispatch)(Dashboard);
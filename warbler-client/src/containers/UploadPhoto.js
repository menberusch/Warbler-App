import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tooltip, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import AvatarEditor from 'react-avatar-editor';
import {uploadProfileImg, updateUser} from '../store/actions/users';

class UploadPhoto extends Component {
  constructor(props){
    super(props);
    const imgName = this.getImageName(props.user.profileImgUrl);
    this.state = {
      editProfileImgModal: false,
      editProfileImgTooltipOpen: false,
      clearImgTooltipOpen: false,
      errorMsg: '',
      imgURL: props.user.profileImgUrl,
      imgName,
      imageIsChanged: false,
      scale: 1
    };
  }

  // Toggle Tooltips and Modal
  toggleEditImgModal = () => {
    this.setState({
      editProfileImgModal: !this.state.editProfileImgModal,
      errorMsg: ''
    });
  }
  toggleEditImgTooltip = () => {
    this.setState({
      editProfileImgTooltipOpen: !this.state.editProfileImgTooltipOpen
    });
  }
  toggleClearImgTooltip = () => {
    this.setState({
      clearImgTooltipOpen: !this.state.clearImgTooltipOpen
    });
  }

  // Image actions
  handleResize = e => {
    this.setState({
      scale: parseFloat(e.target.value)
    });
    if(!this.state.imageIsChanged) this.changeImageForSave();
  }
  changeImageForSave = () => {
    this.setState({
      imageIsChanged: !this.state.imageIsChanged
    });
  }
  savePhotoChanges = () => {
    const {user, uploadProfileImg, updateUser} = this.props;
    let imgName, editedImg = null;
    
    if(this.editor) {
      const editorCanvas = this.editor.getImageScaledToCanvas();
      editedImg = editorCanvas.toDataURL();
      imgName = new Date().getTime() + this.state.imgName;
    }

    uploadProfileImg(user.profileImgUrl, editedImg, imgName, user.id)
      .then(imagePath => updateUser(user.id, {profileImgUrl: imagePath}));
  }
  clearImg = () => {
    this.setState({
      imgURL: '',
      imgName: '',
      scale: 1,
      imageIsChanged: true,
      clearImgTooltipOpen: false
    });
  }
  getImageName = profileImgUrl => (
    profileImgUrl ? profileImgUrl.slice(profileImgUrl.lastIndexOf('/') + 1, profileImgUrl.length) : ''
  )
  cancelPhotoChanges = () => {
    const {user} = this.props;
    this.setState({
      imgURL: user.profileImgUrl,
      imgName: this.getImageName(user.profileImgUrl),
      imageIsChanged: false,
      scale: 1
    });
    this.toggleEditImgModal();
  }
  checkFileProperties = file => {
    if(file.type !== 'image/png' && file.type !== 'image/jpeg') {
      this.setState({
        errorMsg: 'File type should be png or jpg/jpeg format.'
      });
      return false;
    }

    if(file.size > 1000000) {
      this.setState({
        errorMsg: 'File is too large, cannot be more than 1Mb.'
      });
      return false;
    }

    this.setState({
      errorMsg: ''
    });

    return true;
  }
  handleUploadedFile(file) {
    let reader = new FileReader();
    let imgName = file.name.replace(/\s\//g, '');
    reader.onload = e => {
      this.setState({
        imgURL: e.target.result,
        imageIsChanged: true,
        imgName
      });
    }
    reader.readAsDataURL(file);
  }
  onDropUploadImg = e => {
    e.preventDefault();
    if(e.dataTransfer.files.length > 1) {
      this.setState({
        errorMsg: 'Drag only one file...'
      });
      return false;
    }

    let file = e.dataTransfer.files[0];
    if(file && this.checkFileProperties(file)){
      this.handleUploadedFile(file);
    }
  }
  onChangeUploadImg = e => {
    let file = e.target.files[0];
    if(file && this.checkFileProperties(file)){
      this.handleUploadedFile(file);
    }
  }
  setEditorRef = editor => this.editor = editor;

  render() {
    const {
      editProfileImgModal,
      editProfileImgTooltipOpen,
      clearImgTooltipOpen,
      errorMsg,
      imgURL,
      imgName,
      scale,
      imageIsChanged
    } = this.state;

    return(
        <span 
          className="edit-profile-img" 
          id="edit_profile_img" 
        >
          <span className="icon-image" onClick={this.toggleEditImgModal}></span>
          <Tooltip 
            placement="bottom"
            isOpen={editProfileImgTooltipOpen}
            target="edit_profile_img"
            toggle={this.toggleEditImgTooltip}>
            Change your profile photo
          </Tooltip>
          <Modal isOpen={editProfileImgModal} toggle={this.toggleEditImgModal} backdrop="static">
            <ModalHeader>Change your profile photo</ModalHeader>
            <ModalBody>
              <div className={`lead upload-image-container ${ imgURL ? 'preview-photo' : ''}`}>
                <span>Click here to upload or <b>drag-n-drop</b> an image...</span>
                {imgURL && 
                  <div className="upload-image-container__image-editor">
                    <AvatarEditor
                      ref={this.setEditorRef}
                      image={imgURL}
                      width={250}
                      borderRadius={150}
                      height={250}
                      color={[255, 255, 255, 0.85]}
                      scale={scale}
                    />
                  </div>
                }
                <div id="clearImg" onClick={this.clearImg} className="clear-img text-danger icon-delete"></div>
                <Tooltip 
                  placement="bottom"
                  isOpen={clearImgTooltipOpen}
                  target="clearImg"
                  toggle={this.toggleClearImgTooltip}>
                  Clear image
                </Tooltip>
                <label 
                  htmlFor="upload_image_file"
                  onChange={this.onChangeUploadImg}
                  onDrop={this.onDropUploadImg}
                  onDragOver={e => e.preventDefault()}
                >
                  <input key={imgName} type="file" id="upload_image_file" accept="image/png, image/jpeg"/>
                </label>
              </div>
              <p className={`alert w-100 alert-danger ${errorMsg ? '' : 'd-none'}`}>{errorMsg}</p>
              <div className={`resize-img-slider px-2 ${imgURL ? '' : 'd-none'}`}>
                <span className="icon-zoom-out-outline"></span>
                <input onChange={this.handleResize} type="range" step="0.01" min="1" max="2" name="scale" value={scale}/>
                <span className="icon-zoom-in-outline"></span>
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-secondary" onClick={this.cancelPhotoChanges}>Cancel</button>
              <button 
                className="btn btn-primary"
                disabled={imageIsChanged ? false : true}
                onClick={this.savePhotoChanges}
              >Save</button>
            </ModalFooter> 
          </Modal>
        </span>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.currentUser.user
  };
}

export default connect(mapStateToProps, {uploadProfileImg, updateUser})(UploadPhoto);
import React, {Component} from 'react';
import {Tooltip, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

class UploadPhoto extends Component {
  constructor(props){
    super(props);
    this.state = {
      editProfileImgModal: false,
      editProfileImgTooltipOpen: false,
      errorMsg: '',
      imgURL: ''
    };
  }

  toggleEditImgModal = () => {
    this.setState({
      editProfileImgModal: !this.state.editProfileImgModal
    });
  }

  toggleEditImgTooltip = () => {
    this.setState({
      editProfileImgTooltipOpen: !this.state.editProfileImgTooltipOpen,
      errorMsg: ''
    });
  }

  savePhotoChanges = e => {
    e.preventDefault();
    this.toggleEditImgModal();
  }

  cancelPhotoChanges = () => {
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
    reader.onload = e => (this.setState({
      imgURL: e.target.result
    }));
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
    e.target.files[0] = file;

    if(this.checkFileProperties(file, e.target)){
      this.handleUploadedFile(file);
    }
  }

  onChangeUploadImg = e => {
    let file = e.target.files[0];

    if(this.checkFileProperties(file, e.target)){
      this.handleUploadedFile(file);
    }
  }

  render() {
    const {editProfileImgModal, editProfileImgTooltipOpen, errorMsg, imgURL} = this.state;
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
          <Modal isOpen={editProfileImgModal} toggle={this.toggleEditImgModal}>
            <ModalHeader>Change your profile photo</ModalHeader>
            <ModalBody>
              <form className="upload-image-form">
                <label 
                  htmlFor="upload_image_file" 
                  className="lead upload-image-container"
                  onChange={this.onChangeUploadImg}
                  onDrop={this.onDropUploadImg}
                  onDragOver={e => e.preventDefault()}
                >
                  <span>Click here to upload or <b>drag-n-drop</b> an image...</span>
                  <img
                    src={imgURL} 
                    id="upload_img_preview"
                    className={`upload-image-container--img-preview ${imgURL ? '' : 'd-none'}`}
                  />
                  <input type="file" id="upload_image_file" accept="image/png, image/jpeg"/>
                </label>
                <p className={`alert w-100 alert-danger ${errorMsg ? '' : 'd-none'}`}>{errorMsg}</p>
                <span className="clear-img"></span>
                <div className="form-group">
                  <label htmlFor="upload_image_url">Or provide url to your photo</label>
                  <input 
                    className="form-control" 
                    type="text" 
                    id="upload_image_url" 
                    placeholder="Image url"
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-secondary" onClick={this.cancelPhotoChanges}>Cancel</button>
              <button className="btn btn-primary" onClick={this.savePhotoChanges}>Save</button>
            </ModalFooter> 
          </Modal>
        </span>
    )
  }
}

export default UploadPhoto;
import React, {Component} from 'react';
import {Tooltip, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

class UploadPhoto extends Component {
  constructor(props){
    super(props);
    this.state = {
      editProfileImgModal: false,
      editProfileImgTooltipOpen: false
    };
  }

  toggleEditImgModal = () => {
    this.setState({
      editProfileImgModal: !this.state.editProfileImgModal
    });
  }

  toggleEditImgTooltip = () => {
    this.setState({
      editProfileImgTooltipOpen: !this.state.editProfileImgTooltipOpen
    });
  }

  savePhotoChanges = () => {
    this.toggleEditImgModal();
  }

  render() {
    return(
        <span 
          className="edit-profile-img" 
          id="edit_profile_img" 
        >
          <span className="icon-image" onClick={this.toggleEditImgModal}></span>
          <Tooltip 
            placement="bottom"
            isOpen={this.state.editProfileImgTooltipOpen}
            target="edit_profile_img"
            toggle={this.toggleEditImgTooltip}>
            Change your profile photo
          </Tooltip>
          <Modal isOpen={this.state.editProfileImgModal} toggle={this.toggleEditImgModal}>
            <ModalHeader>Change your profile photo</ModalHeader>
            <ModalBody>
              <form id="upload_image_form">
                <label htmlFor="upload_image_file">
                  <input type="file" id="upload_image_file" accept="image/png, image/jpeg"/>
                  Click here to upload or <b>drag-n-drop</b> an image...
                </label>
                <p className="error-msg d-none"></p>
                <span className="clear-img"></span>
                <div className="form-group">
                  <label htmlFor="upload_image_url">Or provide url to your photo</label>
                  <input className="form-control" type="text" id="upload_image_url" placeholder="Image url"/>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={this.save}>Save</button>
              <button className="btn btn-secondary" onClick={this.toggleEditImgModal}>Cancel</button>
            </ModalFooter> 
          </Modal>
        </span>
    )
  }
}

export default UploadPhoto;
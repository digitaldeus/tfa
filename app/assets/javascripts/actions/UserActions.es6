var UserActions = {

  getUserProfile: function(userProfileId){
    UserProfileAPI.get(userProfileId);
  },

  requestUserProfileUpdate: function(userProfile) {
    const body = {
      user_profile: {...userProfile}
    }

    dispatch({
      type: 'REQUEST_USER_UPDATE'
    });

    UserProfileAPI.get(userProfile.id, body, 'PATCH');
  },

  setUserProfile: function(user_profile) {
    dispatch({
      type: 'SET_USER_PROFILE',
      user_profile
    });
  },

  addPhoto: function(userProfileId, url) {
    const body = {
      photo_url: url
    }

    dispatch({
      type: 'ADD_UPLOADER',
    });

    UserProfileAPI.get(userProfileId, body, 'POST', 'add_photo');
  },

  deletePhoto: function(userProfileId ,photoId) {
    const body = {
      photo_id: photoId
    };

    UserProfileAPI.get(userProfileId, body, 'DELETE', 'destroy_photo');
  },

  createProfileImage: function(userProfileId, url) {
    const body = {
      profile_image_url: url
    };

    UserProfileAPI.get(userProfileId, body, 'POST', 'create_profile_image');
  },

  createBannerImage: function(userProfileId, url) {
    const body = {
      banner_image_url: url
    };

    UserProfileAPI.get(userProfileId, body, 'POST', 'create_banner_image');
  },
}
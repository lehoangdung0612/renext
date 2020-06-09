export default {
  global: {
    locationPermissionBlock:
      'The location permission is currently disabled, you can enable it later.',
    locationPermissionUnavailable:
      'The location servive is disabled, you can enable it in your device settings.',
    emailMobilePlaceHolder: 'email@example.com/mobile',
    storagePermissionBlock:
      'You need to allow storage permission to upload image attachments',
    storagePermissionUnavailable:
      'Your device cannot upload image attachment this application has not been granted permission to access your device storage',
    photoPermissionBlock:
      'You need to grant permission for the application to access the Image Gallery to upload an image attachment',
    photoPermissionUnavailable:
      'Your device cannot upload image attachment this application has not been granted permission to access your device Image Gallery',
    cameraPermissionBlock:
      'You need to grant permission for the application to access the Camera to take a photo shoot or video',
    cameraPermissionUnavailable:
      'Your device cannot upload image attachment this application has not been granted permission to access your device Camera',
    bluetoothPermissionBlock:
      'You need to allow bluetooth permission to run this action',
    bluetoothPermissionUnavailable:
      'The bluetooth service is disabled, you can enable it in your device settings.',
    bluetoothIsPoweredOff:
      'The bluetooth is currently disabled, please enable it and try again.',
    bluetoothIsOn: 'The bluetooth has been turned on.',
    locationIsOff:
      'The location service currently is disabled, please enable it and try again.',
    locationIsOn: 'The location has been turned on.',
    noAppValid:
      'Your device does not have a default application to open this URL',
    emptyDefault: 'This Item is empty',
    emptyDescriptionDefault: 'Empty Content',
    tryAgain: 'Try again',
    openSetting: 'Open Settings',
    doublePressExit: 'Double press the back button to exit',
    search: 'Search...',
    version: 'Version',
    delete: 'Delete',
    cancel: 'Cancel',
    ok: 'OK',
    none: 'none',
    email: 'email',
    password: 'password',
    noFilter: 'No filter',
    lastModified: 'Last modified',
    emailPlaceHolder: 'Email',
    notTracked: 'Not tracked',
    notSet: '-----',
    na: 'N/A',
    noLocation: 'GPS Unavailable',
    unknownAttachmentType: 'Unknow Attachment',
    unknownAttachment: 'Unknow Attachment',
    month: 'month{{verbose}}',
    youTurnOffLocation: 'You might want to turn on the location service later.',
    shouldAllowLocationPermission:
      'This action needs location permission to run smoothly. You can turn it on later.',
    alertBluetoothPermission:
      'Allow this application to access your bluetooth permission?',
    alertLocationPermission:
      'Allow this application to access your location permission?',
    alertLocationServiceIOS:
      'You need to enable the Location Services in your devices Privacy setting',
    alertBluetoothTurnOn: 'This application is asking to turn on Bluetooth.',
    alertStoragePermission:
      'Allow this application to access photos, media, and files on your device?',
    alertCameraPermission:
      'Allow this application to access your camera permission?',
    release: ' Release ',
    gpsNA: 'GPS Unavailable',
  },
  errorMsg: {
    invalidUsername:
      'Username is required, must be 2-150 characters. Only letters, digits and @/./+/-/_ are accepted.',
    requiredURLtoCallAPI: 'Please provide a valid API URL.',
    failedConnectToAPI: 'We could not connect to the API server.',
    somethingWentWrong: 'Something went wrong.',
    invalidCredential: 'Your email or password is incorrect.',
    expiredSession: 'Your session has expired, please login again.',
    missingEmailPassword: 'Please provide a valid username and password.',
    invalidEmail: 'Please enter a valid email address.',
    invalidMacAddress: 'Please enter a valid MAC address.',
    notfoundMacAddress: 'Could not find this MAC address.',
    sameMacAddress: 'The address must not be the same as the current',
    beaconIsFLB: 'It is a FLB beacon which cannot be assigned to any asset.',
    emptyPassword: 'Your password cannot be empty',
    emptyNewPassword: 'Your new password cannot be empty',
    invalidPassword:
      'Your password must be at least 8 characters length, different from your personal information and cannot be entirely numberic',
    invalidOldPassword: 'Your old password is not correct.',
    invalidRePassword: 'Your retyped password does not match the password',
    invalidNewPassword: 'Your new password is not valid',
    invalidName: 'Please enter a valid name',
    invalidAcc: 'This account does not exist',
    invalidBirthDay: 'Please enter a valid birthday.',
    existedEmail: 'This email already exists.',
    existedAcc: 'This email has already been used',
    notExistEmail: 'This email does not exist in our system.',
    internetIsDisconnected: 'Please check your Internet connection!',
    noInternetDetected: 'No internet connection detected.',
    connectToInternet:
      'Please connect your device to the internet and try again.',
    invalidResetPasswordToken:
      'Reset password token is invalid or has expired.',
    invalidUrl: 'This page does not exist. Please try again.',
    unAuthorized: 'Please sign in to proceed.',
    noAppValid: 'You do not have a suitable application to open this link.',
    failedConnection: 'Oops, we cannot connect to server!',
    failedConnectionAdvice:
      'Please check your connection, advanced options and try again.',
    invalidProfile:
      'First name and Last name cannot be empty, phone numbers must contain only number',
    gotProblemWithPurchase:
      'There was a problem processing your purchase. Please try again',
    updatePasswordFail:
      'Failed to update your password using the provided information',
    updateUserSettingsFail: 'Failed to update your settings, please try again!',
    internalServerError:
      'We are maintaining our server. Please try again later',
    postChatNotifyFail: 'Missing required content from body request',
    notFoundAsset: 'Asset not found',
    deleteAttachmentFail: 'Deleting the attachment failed',
    updateAssetFailed: 'Failed to update the asset',
    beaconMustBeUnique:
      'This beacon has been assigned to another asset. Please try a new one!',
    invalidFirstname: 'Please enter first name',
    invalidLastname: 'Please enter last name',
    invalidContactExtension: 'Contact Extension must contain only numbers',
    invalidContactLandline: 'Contact Phone number must contain only numbers',
    invalidContactPhone: 'Mobile Phone must contain only numbers',
    assetNotFound: 'Asset not found',
    attachmentNotFound: 'Asset not found',
    cannotViewAttachment: 'This attachment is broken!',
    notFoundServiceRecord: 'Service record not found',
    updateServiceRecordFailed: 'Update service record failed',
    closeServiceRecordFailed: 'Close service record failed',
    notFoundServiceRecordTask: 'Service record task not found',
    notFoundServiceRecordAttachment: 'Service record attachment not found',
    notFoundFlb: 'FLB not found',
    updateFlbFailed: 'Update FLB fail',
    servicePpmNeedPpmsi: 'PPM service record need asset to set PPMSI field',
    notPassInspection:
      'Service does not pass last inspection or does not have any inspection task',
    deleteFlbSucces: 'Delete FLB success',
    notFoundGateway: 'Gateway not found',
    gatewayScanTimeout: 'No response from gateway',
    updateFlbLocationFailed: "Update FLB's location fail",
    emailAlreadyExists: 'This email has already been used, please try another.',
    usernameAlreadyExists:
      'This username has already been used, please try another.',
    emailNotInDomain: 'This email is not accepted in {{tenant}} group.',
    verifyBeaconFail: 'Cannot verify beacon now',
    overMaxiumFileSize:
      'Your selected files are too large. Please select file smaller than {{size}}',
    deleteAttachmentTypePermission:
      "You don't have permission to delete this type of attachment",
    invalidUserToken: 'Invalid user or Change password email has been expired',
    superUserNotAllowed: 'You are not belonged to any tenant to continue',
  },
  warningMsg: {
    offline: 'Application is working offline',
    alreadyLoggedIn:
      'You are already logged in. Please logout and login again!',
    changedPassword: 'Your password has changed. Please login again!',
    pushNotificationNoPermission:
      'You need to allow notification permission to receive important message from this application',
  },
};

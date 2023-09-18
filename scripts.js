// make API request after click join session
// make inputs to set session name, session passcode, and username.

var UIToolKitConfig = {
    features: ['video', 'audio', 'settings', 'users', 'share', 'chat'],
    advancedTelemetry: true
}

function openPreview() {
    let PreviewKit = document.createElement('app-previewkit');
    
    document.getElementById('PreviewKit').append(PreviewKit);

    document.getElementById('join-flow').style.display = 'none'
}

function closePreview() {
    document.getElementsByTagName('app-previewkit')[0].remove()

    document.getElementById('join-flow').style.display = 'inline'
}

function getVideoSDKJWT() {
    
    UIToolKitConfig.userName = document.getElementById('yourName').value
    UIToolKitConfig.sessionName = document.getElementById('sessionName').value
    UIToolKitConfig.sessionPasscode = document.getElementById('sessionPasscode').value

    fetch('https://or116ttpz8.execute-api.us-west-1.amazonaws.com/default/videosdk', {
        method: 'POST',
        body: JSON.stringify({
            sessionName:  UIToolKitConfig.sessionName,
            role: 1,
            telemetryTrackingId: `tommy-ui-toolkit-${UIToolKitConfig.sessionName}-${UIToolKitConfig.userName}-${Date.now()}`
        })
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        UIToolKitConfig.videoSDKJWT = data.signature
        joinSession()
    }).catch((error) => {
        console.log(error)
    })
}

function joinSession() {

    let UIToolKit = document.createElement('app-uitoolkit');

    document.getElementById('UIToolkit').append(UIToolKit);

    console.log(window)

    window.ZoomUIToolKit.init(UIToolKitConfig);

    window.ZoomUIToolKit.join();

    document.getElementById('header').style.display = 'none'
    document.getElementById('join-flow').style.display = 'none'

    window.ZoomUIToolKit.subscribe("uitoolkit-destroy", () => {
        document.getElementById('header').style.display = 'block'
        document.getElementById('join-flow').style.display = 'block'
    })
}

function leaveSession() {
    window.ZoomUIToolKit.destroy();
    document.getElementById('header').style.display = 'block'
    document.getElementById('join-flow').style.display = 'block'
}
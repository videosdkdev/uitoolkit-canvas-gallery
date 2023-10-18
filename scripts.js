const urlParams = new URLSearchParams(window.location.search);
const preSetSession = urlParams.get('session');
const preSetpasscode = urlParams.get('passcode');

const sessionContainer = document.getElementById('UIToolkit')
var uitoolKit;

if(preSetSession) {
    // set session in inputs
    document.getElementById('sessionName').value = preSetSession
}

if(preSetpasscode) {
    // set passcode in inputs
    if(preSetpasscode.length > 10) {
        document.getElementById('passcodeLength').style.display = 'block'
    } else {
        document.getElementById('sessionPasscode').value = preSetpasscode
    }
}

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
    uitoolKit = document.createElement('app-uitoolkit')
    document.getElementById('nameRequired').style.display = 'none'
    document.getElementById('sessionNameRequired').style.display = 'none'
    document.getElementById('passcodeLength').style.display = 'none'
    document.getElementById('rating').style.display = 'none'
    
    UIToolKitConfig.userName = document.getElementById('yourName').value
    UIToolKitConfig.sessionName = document.getElementById('sessionName').value
    UIToolKitConfig.sessionPasscode = document.getElementById('sessionPasscode').value

    if(UIToolKitConfig.userName && UIToolKitConfig.sessionName) {
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
    } else {
        if(!UIToolKitConfig.userName) {
            document.getElementById('nameRequired').style.display = 'block'
        }

        if(!UIToolKitConfig.sessionName) {
            document.getElementById('sessionNameRequired').style.display = 'block'
        }
    }
}

var sessionClosed = (() => {
    console.log('session closed')
    uitoolKit.removeEventListener('sessionClosed', sessionClosed)
    sessionContainer.removeChild(uitoolKit)
    document.getElementById('header').style.display = 'block'
    document.getElementById('join-flow').style.display = 'block'
    document.getElementById('rating').style.display = 'block'
})

function joinSession() {

    uitoolKit.setAttribute("config", JSON.stringify(UIToolKitConfig))
    sessionContainer.append(uitoolKit)

    document.getElementById('header').style.display = 'none'
    document.getElementById('join-flow').style.display = 'none'

    // uitoolkit.onSessionClosed(sessionClosed)
    uitoolKit.addEventListener('sessionClosed', sessionClosed)
}

function leaveSession() {
    uitoolKit.removeEventListener('sessionClosed', sessionClosed)
    sessionContainer.removeChild(uitoolKit)
    document.getElementById('header').style.display = 'block'
    document.getElementById('join-flow').style.display = 'block'
    document.getElementById('rating').style.display = 'block'
}
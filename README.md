# Zoom Video SDK UI toolkit JavaScript sample

Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/video-sdk-terms/).

This repo is an HTML / CSS / JavaScript website that uses the [Zoom Video SDK UI toolkit](https://developers.zoom.us/docs/video-sdk/web/) to start and join Zoom meetings and webinars.

![Zoom Video SDK UI toolkit Client View](https://developers.zoom.us/img/nextImageExportOptimizer/uikit-web-opt-1920.WEBP)

## Installation

To get started, clone the repo:

`$ git clone https://github.com/zoom/videosdk-ui-toolkit-javascript-sample.git`

## Setup

1. Once cloned, navigate to the `videosdk-ui-toolkit-javascript-sample` directory:

   `$ cd videosdk-ui-toolkit-javascript-sample`

1. Open the `videosdk-ui-toolkit-javascript-sample` directory in your code editor.

1. Open the `index.js` file, and enter values for the variables:

   | Variable                   | Description |
   | -----------------------|-------------|
   | authEndpoint          | Required, your Video SDK UI toolkit auth endpoint that secuerly generates a Video SDK UI toolkit JWT. [Get a Video SDK UI toolkit auth endpoint here.](https://github.com/zoom/videosdk-sample-signature-node.js) |

   Example:

   ```js
   var authEndpoint = 'http://localhost:4000'
   ```

1. Save `index.js`.

## Usage

1. Navigate to index.html in your browser ([or serve over localhost](https://www.npmjs.com/package/http-server)), enter any session name, user name, and passcode, and click "Join".

   ![Zoom Video SDK UI toolkit Client View](https://developers.zoom.us/img/nextImageExportOptimizer/uikit-web-opt-1920.WEBP)

  Learn more about [Gallery View requirements](https://developers.zoom.us/docs/video-sdk/web/gallery-view/).

## Deployment

The JavaScript Sample App can be easily deployed to [GitHub Pages](#github-pages), or [another static web hosting service](#other-static-web-hosting), like an AWS S3 bucket.

### GitHub Pages

1. Create a repo on [GitHub](https://github.com).

1. Add the remote to your project:

   `$ git remote add origin GITHUB_URL/GITHUB_USERNAME/GITHUB_REPO_NAME.git`

1. Git add, commit, and push your project:

   `$ git add -A`

   `$ git commit -m "deploying to github"`

   `$ git push origin master`

1. On GitHub, in your repo, navigate to the "settings" page, scroll down to the "GitHub Pages" section, and choose the "master branch folder" for the source.

1. Now your project will be deployed to https://GITHUB_USERNAME.github.io/GITHUB_REPO_NAME.

### Other Static Web Hosting

1. Deploy the directory to a static web hosting service, like an AWS S3 bucket.


## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://explore.zoom.us/docs/en-us/developer-support-plans.html) plans.


// TODO: Make it so users can enter network speed approximate and use that value for our speed stuff as a global


function getNetworkSpeed() {
   const internetSpeed = navigator.connection.downlink;
   if (internetSpeed == 0) {
      return false;
   } else {
      return internetSpeed;
   }
}

// Will keep scrolling liked video list until array of children doesn't change anymore
// That will let us know that there will be no more elements, and wifi is not an issue
function scrollWindowToEnd(speedFactor) {
   // Locates our parent of list items
   const listPPChildren = Array.from(document.getElementsByTagName('ytd-playlist-video-list-renderer')[0].children);
   let listParent;
   listPPChildren.forEach(element => {
      if (element.getAttribute('id') == 'contents') {
         listParent = element;
         // break; // Find a way to break out of forEach. break here is illegal
      }
   })

   console.log(listParent)

   // Previous number of children. If this changes, we know more are loading
   let prevListSize = 0;
   let scrollsWithNoListChange = 0;
   let checksAllowed = 10;
   let interval;
   // We need to not return yet until setInterval finishes. This is because we don't want to move on until all videos have been loaded
   // Promise will not resolve and exit scrollWindowToEnd function until resolve() is called, which will only run once our list is done loading
   return new Promise(resolve => {

      window.scrollBy(0, window.innerHeight * 2)
      
      interval = setInterval(() => {

         if (scrollsWithNoListChange == checksAllowed) {
            // If no more videos loaded, then we have loaded them all. Clear interval and return as finished
            clearInterval(interval)
            resolve(true)
         }

         if (listParent.children.length == prevListSize) {
            scrollsWithNoListChange += 1;
            console.log('No more videos loaded, have checked', scrollsWithNoListChange);
         } else {
            console.log('More videos loaded');
            // More elements have loaded so reset the scrollsWithNoListChange as they are no longer accurate
            scrollsWithNoListChange = 0;
            // We will move onto next interation with new videos, so set the current number of videos as the prev for our check later.
            prevListSize = listParent.children.length;
         }

         // scroll last, wait the time for them to load. Scrolling to get to exactly bottom of list of current elements might be tricky
         window.scrollBy(0, window.innerHeight * 3)

         // Will wait 2.5 seconds minimum per load, and then additional time based on x/10 speed rating. 10 means no extra wait needed, but if .4 which is super slow, wait much extra time
      }, 1000) // Original time code: 2000 + (1000 * Math.abs(speedFactor - 10)) // Needs a rewrite, very slow still
   })
}

function quickImageLoad() {

   // Get the inner scrollable height of our list
   const scrollHeight = document.documentElement.scrollHeight;
   // The number of loops to do is how many to go up by 200 pixels each time to get to top
   const loopsToDo = scrollHeight / 500;
   let loops = 0;

   return new Promise(resolve => {

      let interval;

      interval = setInterval(() => {

         if (loops >= loopsToDo) {
            clearInterval(interval)
            console.log('Load finished');
            resolve();
         }
         window.scrollBy(0, -500)
         loops += 1;

      }, 100)
   })
}

function getVideoList() {

   // Get every element that matches that that class, and then create an array of actual video elements
   let primitiveList = Array.from(document.getElementsByClassName('style-scope ytd-playlist-video-list-renderer'))
   let arrOfVids = primitiveList.map(element => {
      if (element.tagName == 'ytd-playlist-video-renderer'.toUpperCase()) {
         return element;
      }
   })
   // Filter random undefineds from list
   arrOfVids = arrOfVids.filter(element => {
      if (element != undefined) {
         return element;
      }
   })

   console.log('Videos found: ', arrOfVids.length);
   console.log(arrOfVids)

   return arrOfVids;
}

function scrapeVideoData(vidArr) {

   console.log('scrape video data');

   let obj = {};

   // Just getting some data displayed on unded the list name, such as total videos ever added (including hidden/deleted ones) and total views

   let totalVidsEver = document.querySelector("#page-manager > ytd-browse > ytd-playlist-header-renderer > div > div.immersive-header-content.style-scope.ytd-playlist-header-renderer > div.thumbnail-and-metadata-wrapper.style-scope.ytd-playlist-header-renderer > div > div.metadata-action-bar.style-scope.ytd-playlist-header-renderer > div.metadata-text-wrapper.style-scope.ytd-playlist-header-renderer > ytd-playlist-byline-renderer > div > yt-formatted-string:nth-child(2) > span:nth-child(1)").innerText;

   // YouTube removes total views from its ui
   // let totalViews = document.querySelector("#stats > yt-formatted-string:nth-child(2)").innerText

   obj['$meta'] = {
      "alltimeVids": parseInt(totalVidsEver),
      "vidsFound": vidArr.length,
      // "views": (totalViews == 'No views' ? 0 : parseInt(totalViews)),
   }

   vidArr.forEach((element, index) => {
      try {
      
         // console.log('In foreach', element ? element : "dne", position ? position : "no pos");
         const vidTitle = element.querySelector("#content").querySelector("#meta > h3").querySelector("#video-title").innerText;


         const imgUrl = element.querySelector("#content").querySelector("#thumbnail > yt-image > img").src;

         // TODO when I get back: get remaining data, and add it to object under vidTitle as key.
         // I am using "thing" copy js path etc etc to find these
         const vidLinkPrecut = element.querySelector("#content").querySelector("#thumbnail").querySelector("#thumbnail").href;

         const vidAuthor = element.querySelector("#content").querySelector("#meta > ytd-video-meta-block").querySelector("#metadata").querySelector("#byline-container").querySelector("#text > a").innerText;

         const vidViews = element.querySelector("#content").querySelector("#meta > ytd-video-meta-block").querySelector("#metadata").querySelector("#byline-container").querySelector('#video-info').children[0].innerHTML

         console.log(vidTitle, imgUrl, vidLinkPrecut, vidAuthor, vidViews);

         // vidLinkPrecut link contains info on list number and position. We don't want/need that, so we cut it out of the string
         const vidLink = vidLinkPrecut.split('&')[0]

         // Now let's create the object for our json list
         obj[vidTitle] = {
            ['vidTitle']: vidTitle,
            ['imgUrl']: imgUrl,
            ['vidLink']: vidLink,
            ['vidAuthor']: vidAuthor,
            ['vidPos']: index,
            ['vidViews']: vidViews
         }

   } catch (error) {
      console.warn("Issue with ", element.querySelector("#content").querySelector("#meta > h3").querySelector("#video-title").innerText);
   }

      // console.log('taa', obj[vidTitle]);

   })

   console.log("AAAAAAAAAA");

   console.log("Is the obj");

   return obj;
}

// Similar to below but with syntax highlights. From same source but with modifications to not require an external CSS file
function syntaxHighlight(json) {
   json = JSON.stringify(json, null, 4)
   json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
   return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
         if (/:$/.test(match)) {
            cls = 'key';
         } else {
            cls = 'string';
         }
      } else if (/true|false/.test(match)) {
         cls = 'boolean';
      } else if (/null/.test(match)) {
         cls = 'null';
      }
      switch (cls) {
         case 'string':
            return '<span style=\"color: green\">' + match + '</span>';
         case 'number':
            return '<span style=\"color: darkorange\">' + match + '</span>';
         case 'boolean':
            return '<span style=\"color: blue\">' + match + '</span>';
         case 'null':
            return '<span style=\"color: magenta\">' + match + '</span>';
         case 'key':
            return '<span style=\"color: red\">' + match + '</span>';
      }

   });
}

// Opens in new tab for easy copy pasting, also includes format and syntax highlighting
// Thanks to 'https://ourcodeworld.com/articles/read/112/how-to-pretty-print-beautify-a-json-string'
function openJson(jsonList) {
   console.log("here")
   const newWindow = window.open('', '_blank')
   newWindow.document.body.appendChild(document.createElement('pre')).innerHTML = jsonList;
}

async function init() {
   const wantSyntaxHighlight = true;
   // Get time current for elapsed time later
   const timerName = 'timer';
   console.time(timerName)

   // Get network speed, will be used to adjust wait time for loading more liked videos
   const ntSpd = getNetworkSpeed()
   if (!ntSpd) {
      console.error('Your network appears to be offline, please reconnect or try later when your speeds are better. Aborting..')
      return 'Finished';
   }

   console.log(ntSpd);

   console.log('Loading all liked video elements')

   let finished = await scrollWindowToEnd(10) // let finished = await scrollWindowToEnd(ntSpd)

   console.log('Finished loading videos: ' + (finished).toString());

   await quickImageLoad() // Will go thru list super fast and make sure all image titles are present

   let foundVideos = getVideoList()

   const jsonList = scrapeVideoData(foundVideos)

   console.log('Finished scraping video data');

   // Will open the json list in new window with or without syntax highlights, depends on user preference
   wantSyntaxHighlight ? openJson(syntaxHighlight(jsonList)) : openJson(JSON.stringify(jsonList, null, 4));

   console.warn('Should be finished by now');
}

init()
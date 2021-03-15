const cache_name = "CV-site-v1"
const assets = ["/", "index.html", "skills.html", "design1.html", "design2.html", "ECMAScript.html", "qualifications.html", "css/style.css", "css/normalise.css", "css/design1.css", "css/design2.css", "js/main.js", "manifest.json", "images/aboutMeBig.webp", "images/aboutMeBig2x.webp", "images/aboutMeBig3x.webp", "images/aboutMeFallback.jpg", "images/aboutMeFallback2x.jpg", "images/aboutMeFallback3x.jpg", "images/aboutMeMedium.webp", "images/aboutMeMedium2x.webp", "images/aboutMeMedium3x.webp", "images/aboutMeSmall.webp", "images/aboutMeSmall2x.webp", "images/aboutMeSmall3x.webp", "images/coffeeBig.webp", "images/coffeeBig2x.webp", "images/coffeeBig3x.webp", "images/coffeeFallback.jpg", "images/coffeeFallback2x.jpg", "images/coffeeFallback3x.jpg", "images/coffeeMedium.webp", "images/coffeeMedium2x.webp", "images/coffeeMedium3x.webp", "images/coffeeSmall.webp", "images/coffeeSmall2x.webp", "images/coffeeSmall3x.webp", "images/CSBig.webp", "images/CSBig2x.webp", "images/CSBig3x.webp", "images/CSFallback.jpg", "images/CSFallback2x.jpg", "images/CSFallback3x.jpg", "images/CSMedium.webp", "images/CSMedium2x.webp", "images/CSMedium3x.webp", "images/CSSmall.webp", "images/CSSmall2x.webp", "images/CSSmall3x.webp", "images/dataScienceBig.webp", "images/dataScienceBig2x.webp", "images/dataScienceBig3x.webp", "images/dataScienceFallback.jpg", "images/dataScienceFallback2x.jpg", "images/dataScienceFallback3x.jpg", "images/dataScienceMedium.webp", "images/dataScienceMedium2x.webp", "images/dataScienceMedium3x.webp", "images/dataScienceSmall.webp", "images/dataScienceSmall2x.webp", "images/dataScienceSmall3x.webp",
  "images/design1Big.webp", "images/design1Big2x.webp", "images/design1Big3x.webp", "images/design1Fallback.png", "images/design1Fallback2x.png", "images/design1Fallback3x.png", "images/design1Medium.webp", "images/design1Medium2x.webp", "images/design1Medium3x.webp", "images/design1Small.webp", "images/design1Small2x.webp", "images/design1Small3x.webp", "images/design2Big.webp", "images/design2Big2x.webp", "images/design2Big3x.webp", "images/design2Fallback.png", "images/design2Fallback2x.png", "images/design2Fallback3x.png", "images/design2Medium.webp", "images/design2Medium2x.webp", "images/design2Medium3x.webp", "images/design2Small.webp", "images/design2Small2x.webp", "images/design2Small3x.webp", "images/goalsBig.webp", "images/goalsBig2x.webp", "images/goalsBig3x.webp", "images/goalsFallback.jpg", "images/goalsFallback2x.jpg", "images/goalsFallback3x.jpg", "images/goalsMedium.webp", "images/goalsMedium2x.webp", "images/goalsMedium3x.webp", "images/goalsSmall.webp", "images/goalsSmall2x.webp", "images/goalsSmall3x.webp", "images/interestsBig.webp", "images/interestsBig2x.webp", "images/interestsBig3x.webp", "images/interestsFallback.jpg", "images/interestsFallback2x.jpg", "images/interestsFallback3x.jpg", "images/interestsMedium.webp", "images/interestsMedium2x.webp", "images/interestsMedium3x.webp", "images/interestsSmall.webp", "images/interestsSmall2x.webp", "images/interestsSmall3x.webp", "images/japanBig.webp", "images/japanBig2x.webp", "images/japanBig3x.webp", "images/japanFallback.jpg", "images/japanFallback2x.jpg", "images/japanFallback3x.jpg", "images/japanMedium.webp", "images/japanMedium2x.webp", "images/japanMedium3x.webp", "images/japanSmall.webp", "images/japanSmall2x.webp", "images/japanSmall3x.webp", "images/MLBig.webp", "images/MLBig2x.webp", "images/MLBig3x.webp", "images/MLFallback.jpg", "images/MLFallback2x.jpg", "images/MLFallback3x.jpg", "images/MLMedium.webp", "images/MLMedium2x.webp", "images/MLMedium3x.webp", "images/MLSmall.webp", "images/MLSmall2x.webp", "images/MLSmall3x.webp", "images/SDBig.webp", "images/SDBig2x.webp", "images/SDBig3x.webp", "images/SDFallback.jpg", "images/SDFallback2x.jpg", "images/SDFallback3x.jpg", "images/SDMedium.webp", "images/SDMedium2x.webp", "images/SDMedium3x.webp", "images/SDSmall.webp", "images/SDSmall2x.webp", "images/SDSmall3x.webp", "images/icons/android-chrome-192x192.png", "images/icons/android-chrome-512x512.png", "images/icons/apple-touch-icon.png", "images/icons/browserconfig.xml", "images/icons/favicon.ico", "images/icons/favicon-16x16.png", "images/icons/favicon-32x32.png", "images/icons/mstile-150x150.png", "images/fonts/Aller.eot", "images/fonts/Aller.ttf", "images/fonts/Aller.woff", "images/fonts/Aller.woff2", "images/fonts/PlayfairDisplay-Regular.eot", "images/fonts/PlayfairDisplay-Regular.ttf", "images/fonts/PlayfairDisplay-Regular.woff", "images/fonts/PlayfairDisplay-Regular.woff2", "images/fonts/AbhayaLibre-Regular.eot", "images/fonts/AbhayaLibre-Regular.ttf", "images/fonts/AbhayaLibre-Regular.woff", "images/fonts/AbhayaLibre-Regular.woff2", "coffee.json"
];

//install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cache_name)
    .then(cache => {
      return cache.addAll(assets);
    })
  );
});

//activate
self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== cache_name).map(cacheName => caches.delete(cacheName))
      )
    })
  );
});

//fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
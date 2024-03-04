import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics'
// import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
// import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: process.env.APIKEY,
   authDomain: process.env.AUTHDOMAIN,
   projectId: process.env.PROJECTID,
   storageBucket: process.env.STORAGEBUCKET,
   messagingSenderId: process.env.MESSAGINGSENDERID,
   appId: process.env.APPID,
   measurementId: process.env.MEASUREMENTID,
};
const app = initializeApp(firebaseConfig);

// if (import.meta.env.MODE === 'development') {
//    type Self = typeof self;
//    type TSelf = Self & { FIREBASE_APPCHECK_DEBUG_TOKEN: string };
//    (self as TSelf).FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_APPCHECKDEBUGTOKEN;
// }
// initializeAppCheck(app, {
//    provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHASITEKEY),
//    isTokenAutoRefreshEnabled: true,
// });
export default app;
export const analytics = getAnalytics(app)
// export const auth = getAuth(app);
// export const firestore = getFirestore(app);
// export const firebaseRTDB = getDatabase(app);

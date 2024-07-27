import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from './ttrpg-5448f-firebase-adminsdk-upcd6-d06425f2c1.json'

const serviceAccountConfig: ServiceAccount = serviceAccount as ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountConfig),
})

export const db = admin.firestore()

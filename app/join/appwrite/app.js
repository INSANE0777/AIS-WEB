import { Client, Databases, ID , Account } from "appwrite";

const client = new Client()
.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);


const databases = new Databases(client);
const account = new Account(client);
export { ID, databases, account};


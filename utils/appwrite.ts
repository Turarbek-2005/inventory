import { APP_WRITE_ID } from "@/app.constants";
import { Client, Databases, Storage } from "appwrite";

export const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(APP_WRITE_ID);

export { ID } from "appwrite";
export const DB = new Databases(client);
export const storage = new Storage(client);

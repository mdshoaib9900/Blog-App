import conf from "../conf.js";
import { Client, Account, ID } from "appwrite";



export class AuthSerivce{
    client =new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({
        email,
        password,
        name
    }){
        try{
          const userAccount=  await this.account.create(ID.unique(),email,password,name);
          if(userAccount){
           //call another method
           return this.login({email,password});
          }else{
            return userAccount;
          }

        }catch(error){
            throw error;
        }
    }
    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            
        }
    }
    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ",error);   
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error ",error);   
            
        }
    }
}

const authService=new AuthSerivce();

export default authService;


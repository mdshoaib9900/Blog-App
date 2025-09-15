import conf from "../conf/conf.js";
import { Client, Account, ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.account=new Account(this.client);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    

    async createPost({title,slug,content,featuredImage,status,userName,userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    userName,
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }

    async updatePost(slug,{title,content,
        featuredImage,status,name
    }){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    name,
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAllPost(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

      // 🔹 Get posts of a specific user
  async getUserPosts (userId) {
    try {
      return await this.databases.listDocuments(conf.appWriteDatabaseId,conf.appWriteCollectionId, [
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt"),
      ]);
    } catch (error) {
      console.error("Appwrite getUserPosts Error:", error);
      return false;
    }
  }
    //file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    //delete file image
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                 fileId
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

     getFileView(fileId){
        // console.log("image file id",fileId);
        
        return  this.bucket.getFileView(
            conf.appWriteBucketId,
            fileId
        )
    }


}

const service=new Service()
export default service
import conf from "../conf/conf";
import { Client, Databases, ID,Storage,Query } from "appwrite";


export class Service{
     client=new Client();
     databases;
     bucket;


     constructor(){
        this.client
         .setEndpoint(conf.appwriteURL)
         .setProject(conf.appwriteProjectId)

          this.databases = new Databases(this.client)
          this.bucket=new Storage(this.client)
     }

     async createPost({title,slug,content,featuredimage,status,userId}){

        try{
                  return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                    {
                    title,content,featuredimage,status,userId
                  })

        }
        catch(error){
            console.log("Appwrite Services::createpost::error",error)
        }
 
   }

   async updatePost(slug,{title,content,featuredimage,status}){
    try{
      return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
        title,content,featuredimage,status
      })

    }
    catch(error){
        throw error;
    }
   }

   async deletePost(slug){
    try{
        await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug) 
        return true
    }
    catch(error){
        throw error
        return false
    }
   }

   async getPost(slug){
    try{
      return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)

    }
    catch(error){
        throw error
        return false
    }
   }

   async getPosts(){
     try{
       await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,
            [
                Query.equal('status',  'active'), 
            ]
        )
     }
     catch(error)
     {
        throw error
     }
   }



   // file upload services

   async uploadFile(file){
     try{

        return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)
     }
     catch(error){
        throw error
     }
  
   }

   async deleteFile(fileId){
    try{
        await this.bucket.deleteFile(conf.appwriteBucketId,fileId)
        return true
    }
    catch(error){
        throw error;
        return false
    }
   }

   getFilePreview(fileId){
    return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
   }
}


const service=new Service()
export default service;
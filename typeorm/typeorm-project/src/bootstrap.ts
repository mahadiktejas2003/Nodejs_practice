import { getRepository } from "typeorm"
import { User } from "./entity/User";
import { AppDataSource } from "./data-source";
import { Tweet } from "./entity/tweets";

export const Bootstrap= async ()=>{
    const userRepo = AppDataSource.getRepository(User);
    const user= userRepo.create({
        firstName: "Alex",
        lastName:"Brooks",
        age:22
    });
    await userRepo.save(user).catch((err)=>{
        console.log('Error', err);
    })

    console.log('New user saved:', user);
    console.log('New user Saved with id:', user.id);

    const tweetRepo= AppDataSource.getRepository(Tweet);
    const tweet = new Tweet();
    tweet.title = "I finally got the job!";
    tweet.content = "I am so excited to start my new job next week!";
    tweet.user= user;
    await tweetRepo.save(tweet).catch((err)=>{
        console.log('Error', err);
    });

} 

export const find = async ()=>{
    const userRepo = AppDataSource.getRepository(User);
    const user=await userRepo.findOne({where:{ firstName:"Alex"}}).catch( (err)=>{
        console.log('Error', err);
    } 
    );

    if(user){
        console.log("User: " ,user, "user tweets:" , user.tweets);
    }
}
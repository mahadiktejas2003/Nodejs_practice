console.log('before')

getUser(1, (user)=>{
    console.log('User', user);
    getRepos(user, (repos)=>{
        console.log('Repos', repos);
    })
});


console.log('after');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from the database...');
        callback({id: id, gitHubUsername: 'mosh'});
    }, 2000);
}

function getRepos({gitHubUsername}, cb){
    setTimeout(()=>{
        console.log('Calling the Github API for user', gitHubUsername);
        cb(['repo1', 'repo2', 'repo3']);
    },3000)
}
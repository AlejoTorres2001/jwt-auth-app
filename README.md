<div align="center">

# Backend Branch
  
</div>
  

<div align="center">

![](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)
  
**this is the master branch for the server-side code of this implementation of a *jwt auth strategy***

</div>

Both **Backend** and **Frontend** should be considered as separated projects each one with its dependencies. if you are about to contribute to this project or just to play around with the code I suggest cloning each master branch in different folders


## About The Project

and express app using and http server to handle the signing and verification of access and refresh tokens.Storing the refresh token of each device where an user legged in,using MongoDB. the tokens are rotated accordingly to minimize the damage of a possible token leak/hack

![image](https://user-images.githubusercontent.com/80418452/173628443-e0b4d49a-dba3-40aa-aa9f-1ecc2135d556.png)


this image explains dead simple how the jwt strategy works

## Stack used 
<img  alt="JavaScript"  src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img  alt="Node.js"  src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img alt="Express" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img  alt="MongoDB"  src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />

For handling **the authorization for each route** I'm using *middlewares* that check the authorization header in each request as well as the origin to handle CORS accordingly
## Contributing

<div align="center">

![Alt](https://repobeats.axiom.co/api/embed/68c9df6f2f0b7c10166683e056861dee0e4dacbe.svg "Repobeats analytics image")

</div>

If you have a suggestion that would make this better, please fork the repo and create a Pull Request. You can also simply [open an issue](https://github.com/AlejoTorres2001/jwt-auth-app/issues) with the tag *enhancement*.

Don't forget to **give the project a star ⭐!** 

1. Fork the project

2. Clone the repository

```bash
git clone -b master-backend https://github.com/AlejoTorres2001/jwt-auth-app.git
```

3. Create your Feature Branch

```bash
git checkout -b feature/AmazingFeature
```

4. Push to the Branch

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request


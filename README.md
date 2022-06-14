
<div align="center">
  
# Fontend Branch

  

</div>

<div align="center">

![](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)

  **this is the master branch for the client code of this implementation of a *jwt auth strategy***
  

</div>

Both **Backend** and **Frontend** should be considered as separated projects each one with its dependencies. if you are about to contribute to this project or just to play around with the code I suggest cloning each master branch in different folders

<div align="center">
<img width="767" alt="image" src="https://user-images.githubusercontent.com/80418452/173629119-f76247f3-ad4b-4f3e-810a-68162dfd6b10.png">
</div>


## About The Project

a simple react app with aregistration and login forms and various protected routes yhat checks for authentication and authorization/roles of the user logged in grantting (or not) access to them.
I would like to point out that the session of the user is handled inside the memory of the client (state) using the ContextAPI, only storing the refreshToken in a HTTPS-only cookie.
I'm using LocalStorage just to handle the check of a trust device.


## Stack used 
- <img  alt="JavaScript"  src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
- [<img  alt="React"  src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />](https://es.reactjs.org/)
- [<img  alt="React"  src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />](https://reactrouter.com/)

**Using *Axios* for handling HTTP requests to the server and ReactRouter v6 to handle the routes of the app.**


## Contributing

<div align="center">

![Alt](https://repobeats.axiom.co/api/embed/68c9df6f2f0b7c10166683e056861dee0e4dacbe.svg "Repobeats analytics image")

</div>

If you have a suggestion that would make this better, please fork the repo and create a Pull Request. You can also simply [open an issue](https://github.com/AlejoTorres2001/jwt-auth-app/issues) with the tag *enhancement*.

Don't forget to **give the project a star ⭐!** 

1. Fork the project

2. Clone the repository

```bash
git clone -b master-frontend https://github.com/AlejoTorres2001/jwt-auth-app/tree/master-frontend
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



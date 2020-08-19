<p align="center"> A simple library to control the SpyGhost wifi car
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Since the original IConSpy app hasn't been updated in a while, I decided to create a small library to enable controlling the SpyGhost wifi car.

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

This library uses nodejs and Typescript. To handle the data stream to and from the car, I'm using RxJs


### Installing

```
npm install spyghost
```

## 🎈 Usage <a name="usage"></a>

```
const ghost = new SpyGhost();
ghost.init(); // Establishes a connection. Ensure you're connected to the car's wifi
ghost.move( movement: Movement ); // Moves the car. 
ghost.close(); // Closes the connection
```
The Movement interface represents the movements (forward, backward, left, right) and velocity.
The direction of the movement is abstracted by the Axis interface

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/)

- [Typescript](https://www.typescriptlang.org/)

- [RxJS](https://rxjs-dev.firebaseapp.com/)

## ✍️ Authors <a name = "authors"></a>

- [@borgaster](https://github.com/borgaster) - Idea & Initial work


## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References

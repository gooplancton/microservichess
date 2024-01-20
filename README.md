# microservichess
### (Big thanks to ChatGPT for typing this all out)

Microservichess is a chess service that demonstrates the power of a microservices architecture, residing in a monorepo structured and built using turborepo. This project showcases end-to-end type safety across multiple services, each written in TypeScript and communicating with one another through gRPC. The frontend is built with React, communicating with an API Gateway via tRPC, emphasizing the seamless interaction between gRPC and tRPC.

# Repository Structure
## Apps
1. __api-gateway__
The API Gateway serves as the entry point for external requests, orchestrating communication between various microservices.

2. __game-svc__
The Game Service manages game-related logic and interactions, ensuring the integrity and consistency of chess games.

3. __invite-svc__
The Invite Service handles the invitation process, allowing users to challenge each other to a game.

4. __user-svc__
The User Service manages user-related operations, such as authentication, registration, and user profiles.

5. __web__
The Web application serves as the frontend, providing users with a dynamic and interactive chess-playing experience.

## Packages
1. __protobufs__
The Protobufs package contains the Protocol Buffers definitions for communication between microservices, ensuring a standardized contract.

2. __types__
The Types package holds shared type definitions and zod validators used across various microservices, maintaining consistency and type safety.

3. __typescript-config__
The TypeScript Config package provides a standardized TypeScript configuration for the entire monorepo, ensuring consistency in development practices.

# Tech stack
__TypeScript__: All microservices are written in TypeScript, enhancing code readability, maintainability, and type safety.

__gRPC__: Communication between microservices is facilitated through gRPC, ensuring efficient and language-agnostic interaction.

__tRPC__: The frontend communicates with the API Gateway using tRPC, showcasing the compatibility and versatility of different communication protocols.

__React__: The Web application is built with React, providing a modern and responsive user interface for an enhanced chess-playing experience.

__Turborepo__: TurboRepo is employed as the build tool, streamlining the development, testing, and deployment processes within the monorepo.

# Purpose
microservichess serves as a comprehensive example of how a monorepo with end-to-end type safety across multiple services, possibly written in different languages, can be achieved. Additionally, it acts as a demonstration of the seamless interaction between gRPC and tRPC, highlighting their interoperability in a real-world application.

# Getting Started
TODO

# Contributing
Contributions to microservichess are welcome! Feel free to open issues for bug reports, feature requests, or general improvements. If you're interested in contributing code, please follow the contribution guidelines outlined in the repository.

# License
This project is licensed under the MIT License, granting you the freedom to use and modify the code within the terms specified in the license.
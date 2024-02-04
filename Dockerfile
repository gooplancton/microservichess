FROM node:21-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
 
FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm turbo run build --filter=!web
RUN pnpm deploy --filter=user-svc --prod /prod/user-svc
RUN pnpm deploy --filter=invite-svc --prod /prod/invite-svc
RUN pnpm deploy --filter=game-svc --prod /prod/game-svc
RUN pnpm deploy --filter=api-gateway --prod /prod/api-gateway

FROM base AS user-svc
COPY --from=build /prod/user-svc /prod/app
WORKDIR /prod/app
EXPOSE 50050
CMD [ "pnpm", "dev" ]

FROM base AS invite-svc
COPY --from=build /prod/invite-svc /prod/app
WORKDIR /prod/app
EXPOSE 50051
CMD [ "pnpm", "dev" ]

FROM base AS game-svc
COPY --from=build /prod/game-svc /prod/app
WORKDIR /prod/app
EXPOSE 50052
CMD [ "pnpm", "dev" ]

FROM base AS api-gateway
COPY --from=build /prod/api-gateway /prod/app
WORKDIR /prod/app
EXPOSE 8080
CMD [ "pnpm", "dev" ]

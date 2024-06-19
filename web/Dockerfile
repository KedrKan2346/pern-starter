FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
# These args are required to build vite app in docker because defineConfig is used during build runtime.
ARG WEB_API_URL='WEB_API_URL'
ENV WEB_API_URL=$WEB_API_URL
ARG WEB_SERVER_PORT='WEB_SERVER_PORT'
ENV WEB_SERVER_PORT=$WEB_SERVER_PORT

# "--force" option fixes error:
# "Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828).
# Please try `npm i` again after removing both package-lock.json and node_modules directory."

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --force

FROM base
COPY --from=deps /app/node_modules /app/node_modules

RUN pnpm build

CMD [ "pnpm", "preview" ]
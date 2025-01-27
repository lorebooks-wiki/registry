import { Octokit } from "@octokit/rest"
import config from "./config.ts";

export const octokit = new Octokit({
    auth: config.gh.token,
    userAgent: `RecapTimeBot/2025.01.19 (${config.registryRepo})`
})
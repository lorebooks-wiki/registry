import { parse } from "@std/yaml";
import { octokit } from "./github.ts";
import config from "./config.ts";

async function getLocalYaml(domain: string, subname?: string) {
    const path = `../../data/${domain}/${subname ?? "_root"}.yml`
    try {
        const file = await Deno.readTextFile(path)
        return {
            data: parse(file),
            error: null
        }
    } catch (error) {
        console.error(error)
        return {
            data: null,
            error
        }
    }
}

async function getYamlFromGitHub(domain: string, subname?: string, branch?: string) {
    const path = `data/${domain}/${subname ?? "_root"}.yml`
    try {
        const apiResp = await octokit.repos.getContent({
            mediaType: {
              format: "raw"
            },
            owner: config.gh.owner_namespace,
            repo: config.gh.repo,
            path,
            ref: branch ?? "main"

        })
        return {
            data: parse(apiResp.data.toString())
        }
    } catch (error) {
        return {
            error,
            data: null
        }
    }
}

async function handleYamlParser(method: "local" | "github-api", domain: string, subname?: string, branch?: string) {
    let result;

    if (method == "local") {
        result = await getLocalYaml(domain, subname)
    } else if (method == "github-api") {
        result = await getYamlFromGitHub(domain, subname, branch)
    }

    if (result?.data) {
        return result.data
    } else {
       console.error(result?.error || "Something went wrong")
       return null
    }
}

export {
    handleYamlParser,
    getLocalYaml,
    getYamlFromGitHub
}
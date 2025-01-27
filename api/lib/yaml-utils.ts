import { parse } from "@std/yaml";
import { octokit } from "./github.ts";
import config from "./config.ts";

async function getLocalYaml(domain: string, subname?: string) {
  try {
    const path = `../data/${domain}/${subname ?? "_root"}.yml`
    const file = await Deno.readTextFile(path)
    console.log("File lookup: "+ file)
    return {
      data: parse(file),
      error: null
    }
  } catch (error) {
    console.error(error)
    return {
        error,
        data: null
    }
}
}

async function getYamlFromGitHub(domain: string, subname?: string) {
  try {
    const path = `data/${domain}/${subname ?? "_root"}.yml`
    const api = await octokit.repos.getContent({
      path,
      owner: config.gh.owner_namespace,
      repo: config.gh.repo
    })
    
    if (api.status == 200) {
      const rawYaml = !Array.isArray(api.data) && api.data.content ? atob(api.data.content) : ""
      const parsedData = parse(rawYaml)
      return {data: parsedData, error: null}
    } else {
      return {
        data: null,
        error: "API:Not found"
      }
    }
  } catch (error) {
      console.error(error)
      return {error, data: null}
  }
}

async function handleYamlParser(
    method: "local" | "github-api",
    domain: "lorebooks.wiki" | "stellapent.wiki",
    subname?: string,
) {
  let parsedSubname = subname;
  if (subname == "root" || subname == "home" || subname == "www") parsedSubname = "_root";

  try {
    let result: { data: any, error: any } | undefined;

    if (method == "local") {
      result = await getLocalYaml(domain, parsedSubname)
    } else if (method == "github-api") {
      result = await getYamlFromGitHub(domain, parsedSubname)
    }
    return result
  } catch (error) {
    throw error
  }
}

export {
    handleYamlParser,
    getLocalYaml,
    getYamlFromGitHub
}
const core = require("@actions/core")
const axios = require("axios")
const fs = require("fs")
const FormData = require("form-data")

const BASE_FAMOCO_URL = "https://my.famoco.com/api/organizations/"
const FAMOCO_API_TOKEN = process.env.FAMOCO_API_TOKEN
const FAMOCO_ORGANIZATION_ID = process.env.FAMOCO_ORGANIZATION_ID

try {
  const apk = core.getInput("apk", {
    required: true,
  })
  const form = new FormData()
  fs.access(apk, fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if (err) {
      core.setFailed(`${apk} ${err.code === "ENOENT" ? "does not exist" : "is read-only"}`)
    } else {
      form.append("apk", fs.createReadStream(apk))
      const formHeaders = form.getHeaders()

      axios
        .post(`${BASE_FAMOCO_URL}${FAMOCO_ORGANIZATION_ID}/applications/`, form, {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${FAMOCO_API_TOKEN}`,
            ...formHeaders,
          },
        })
        .then((resp) => {
          core.info(`*SUCCESS:* Version *${resp.data.package_version_name}* uploaded to MDM`)
        })
        .catch((error) => {
          if (error.response) {
            core.error("RESPONSE", error.response.data)
            core.error(error.response.status)
            core.error(error.response.headers)
          } else if (error.request) {
            core.error("REQUEST", error.request)
          } else {
            core.error("Error", error.message)
          }
          core.setFailed(error.config)
        })
    }
  })
} catch (error) {
  core.setFailed(error)
}

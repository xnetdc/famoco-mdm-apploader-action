const core = require('@actions/core')
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')

const BASE_FAMOCO_URL = "https://my.famoco.com/api/organizations/"
const FAMOCO_API_TOKEN = 'KMWK65c8W8Hq3XSndC6KNkxjKxi7u8' // process.node.FAMOCO_API_TOKEN
const FAMOCO_ORGANIZATION_ID = 2059 // process.node.FAMOCO_ORGANIZATION_ID

try {
    const name = core.getInput('apk', {
        required: true,
    })
    const form = new FormData()
    form.append('file', fs.createReadStream(apk))
    
    const formHeaders = form.getHeaders()

    axios.post(
        `${BASE_FAMOCO_URL}${FAMOCO_ORGANIZATION_ID}/applications/`,
        form,
        { headers: {
            "Authorization": `Bearer ${FAMOCO_API_TOKEN}`,
            ...formHeaders
            }
        }
    )
    .then(resp => {
        if (resp.statusText === 'OK') {
            core.info(`*SUCCESS:* Version *${resp.data.package_version_name}* uploaded to MDM`)
        } else {
            core.setFailed(`*FAILED:* Upload to MDM Failed: *${resp.data.errors.apk[0]}`)
        }
    })
    .catch(err => {
        core.setFailed(err)
    })
} catch (error) {
    core.setFailed(error)
}
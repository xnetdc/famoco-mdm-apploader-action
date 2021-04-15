const core = require('@actions/core')
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')

const BASE_FAMOCO_URL = "https://my.famoco.com/api/organizations/"
const FAMOCO_API_TOKEN = 'KMWK65c8W8Hq3XSndC6KNkxjKxi7u8' // process.node.FAMOCO_API_TOKEN
const FAMOCO_ORGANIZATION_ID = 2059 // process.node.FAMOCO_ORGANIZATION_ID

try {
    const name = core.getInput('name', {
        required: true,
    })
    const path = core.getInput('path', {
        required: true,
    })
    const form = new FormData()
    form.append('file', fs.createReadStream(`${path}/${name}`))
    
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
        console.log(resp)
    })
    .catch(err => err)
} catch (error) {
    core.setFailed(error)
}
# Famoco MDM Apploader docker action

This action uploads an apk to the Famoco MDM

## Environment vars

### FAMOCO_API_TOKEN

**required** The api token from famoco

### FAMOCO_ORGANIZATION_ID

**required** The organization id from famoco

## Inputs

### `name`

**Required** The name of the apk.

### `path`

**Required** The path to the apk.

## Outputs

### `time`

The time it was executed.

## Example usage

uses: actions/famoco-mdm-apploader-action@v1
env:
  FAMOCO_API_TOKEN=${{ secrets.FAMOCO_API_TOKEN }}
  FAMOCO_ORGANIZATION_ID=${{ secrets.FAMOCO_ORGANIZATION_ID }}
with:
  name: android.release.apk
  path: app/build/outputs/release/apk